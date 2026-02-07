import { Project } from "ts-morph";
import path from "path";
import fs from "fs";
import { detectRegistryType } from "./detect-registry-type.js";
import type {
  RegifyConfig,
  RegistryJson,
  RegistryStructure,
  WorkspaceInfo,
} from "../types/index.js";

/**
 * Robustly finds a configuration file by walking up the directory tree.
 */
function findConfigFile(startDir: string, filenames: string[]): string | null {
  let currentDir = path.resolve(startDir);
  while (true) {
    for (const filename of filenames) {
      const filePath = path.join(currentDir, filename);
      if (fs.existsSync(filePath)) return filePath;
    }
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }
  return null;
}

/**
 * Detects if the current project is a monorepo and returns workspace info.
 */
function getWorkspaceInfo(rootPath: string): WorkspaceInfo | null {
  const pkgJsonPath = path.join(rootPath, "package.json");
  if (!fs.existsSync(pkgJsonPath)) return null;

  try {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8")) as {
      workspaces?: string[] | { packages?: string[] };
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };

    // check workspace keyword in the dependency to identify, if it is a monorepo and help to detect the workspace components or code
    const dependencies = pkg.dependencies || {};
    const dependenciesKeys = Object.keys(dependencies);
    const workspaceDependencies = dependenciesKeys.filter((dependency) =>
      dependencies[dependency].includes("workspace"),
    );

    const isMonorepo = !!(
      workspaceDependencies.length > 0 ||
      pkg.workspaces ||
      fs.existsSync(path.join(rootPath, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(rootPath, "lerna.json"))
    );

    const dependenciesList = [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ].filter((dep) => {
      return !workspaceDependencies.includes(dep);
    });

    return {
      isMonorepo,
      workspaces: Array.isArray(pkg.workspaces)
        ? pkg.workspaces
        : pkg.workspaces?.packages || [],
      dependencies: new Set([...dependenciesList]),
      workspaceDependencies: new Set([...workspaceDependencies]),
    };
  } catch {
    return null;
  }
}

/**
 * Generates a registry JSON file for the given component or directory of components.
 * @param entryFilePath - Path to the component file or directory.
 * @param REGIFY_CONFIG - Configuration object for the registry.
 * @returns The generated registry JSON object.
 */
export function generateRegistry(
  entryFilePath: string,
  REGIFY_CONFIG: RegifyConfig,
): RegistryJson {
  const absoluteEntryPath = path.resolve(entryFilePath);
  const configRegistryDependencies = REGIFY_CONFIG.registryDependencies || {};
  const basePath = (REGIFY_CONFIG.basePath || "") as string;

  if (!fs.existsSync(absoluteEntryPath)) {
    throw new Error(`Entry file not found: ${absoluteEntryPath}`);
  }

  const projectDir = path.dirname(absoluteEntryPath);
  const tsConfigPath = findConfigFile(projectDir, [
    "tsconfig.json",
    "jsconfig.json",
  ]);

  // Initialize ts-morph project
  const project = new Project({
    tsConfigFilePath: tsConfigPath || undefined,
    compilerOptions: !tsConfigPath
      ? {
          allowJs: true,
          moduleResolution: 2, // Node
          resolveJsonModule: true,
          jsx: 1, // Preserve
        }
      : undefined,
    skipAddingFilesFromTsConfig: true,
  });

  const rootPkgPath = findConfigFile(projectDir, ["package.json"]);
  const rootDir = rootPkgPath ? path.dirname(rootPkgPath) : process.cwd();
  const workspaceInfo = getWorkspaceInfo(rootDir);

  const visitedFiles = new Set<string>();
  const dependencyStack: string[] = [];

  // Initialize registry for each generation to avoid shared state mutations
  const registry: RegistryStructure = {
    name: path.basename(entryFilePath, path.extname(entryFilePath)),
    type: null,
    dependencies: new Set<string>(),
    devDependencies: new Set<string>(),
    registryDependencies: new Set<string>(),
    files: [],
  };

  // Add a validator for duplicate file processing
  const processedFiles = new Set<string>();

  function processFile(filePath: string): void {
    if (processedFiles.has(filePath)) return;
    processedFiles.add(filePath);

    const absolutePath = path.resolve(filePath);

    // Circular dependency check
    if (dependencyStack.includes(absolutePath)) {
      const chain = [...dependencyStack, absolutePath]
        .map((p) => path.relative(rootDir, p))
        .join(" -> ");
      throw new Error(`Circular dependency detected: ${chain}`);
    }

    if (visitedFiles.has(absolutePath)) return;

    visitedFiles.add(absolutePath);
    dependencyStack.push(absolutePath);

    const sourceFile = project.addSourceFileAtPath(absolutePath);
    const content = sourceFile.getFullText();

    // Detect the registry type for this file
    const fileType = detectRegistryType(absolutePath, rootDir, sourceFile);

    // Set the main registry type based on the entry file (first file processed)
    if (registry.type === null) {
      registry.type = fileType;
    }

    // Add file to registry
    registry.files.push({
      path: basePath
        ? path.join(basePath, path.basename(absolutePath)).replace(/\\/g, "/")
        : path.relative(rootDir, absolutePath).replace(/\\/g, "/"),
      content: content,
      type: fileType,
    });

    // Analyze imports
    const imports = sourceFile.getImportDeclarations();

    for (const importDecl of imports) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();

      // Try to resolve the module to a source file
      const resolvedSourceFile = importDecl.getModuleSpecifierSourceFile();

      if (resolvedSourceFile) {
        // It's a local file or a workspace package resolved by ts-morph
        const resolvedPath = resolvedSourceFile.getFilePath();

        const normalizedRootDir = rootDir.toLowerCase().replace(/\\/g, "/");
        const normalizedResolvedPath = resolvedPath
          .toLowerCase()
          .replace(/\\/g, "/");

        // If the resolved path is inside our project, it's a registry dependency (local file)
        if (
          normalizedResolvedPath.startsWith(normalizedRootDir) &&
          !normalizedResolvedPath.includes("node_modules")
        ) {
          const filename = path.basename(resolvedPath).split(".")[0];

          const registryDependencies = Object.keys(configRegistryDependencies);
          if (registryDependencies.includes(filename)) {
            registry.registryDependencies.add(
              configRegistryDependencies[filename],
            );
          } else {
            processFile(resolvedPath);
          }
        } else if (
          workspaceInfo?.isMonorepo &&
          !normalizedResolvedPath.includes("node_modules")
        ) {
          // It's outside project root so, its code will be added
          const isWorkspaceDependency = [
            ...workspaceInfo.workspaceDependencies,
          ].find((dep) => moduleSpecifier.includes(dep));
          if (!isWorkspaceDependency) {
            registry.dependencies.add(moduleSpecifier);
          }
        } else {
          // It's in node_modules, treat as NPM dependency
          registry.dependencies.add(moduleSpecifier);
        }
      } else {
        // Fallback resolution for common aliases if tsconfig didn't catch them
        if (
          moduleSpecifier.startsWith(".") ||
          moduleSpecifier.startsWith("@/")
        ) {
          throw new Error(
            `Could not resolve local import: "${moduleSpecifier}" in ${path.relative(rootDir, absolutePath)}. Ensure your tsconfig.json/jsconfig.json paths are correct.`,
          );
        }

        // Check if it's a known dependency in package.json
        if (workspaceInfo && workspaceInfo.dependencies.has(moduleSpecifier)) {
          registry.dependencies.add(moduleSpecifier);
        } else {
          // Probably an NPM package that isn't explicitly in the nearest package.json
          // or a scoped package, etc.
          registry.dependencies.add(moduleSpecifier);
        }
      }
    }

    dependencyStack.pop();
  }

  try {
    processFile(absoluteEntryPath);
  } catch (error) {
    throw new Error(
      `Failed to generate registry for ${entryFilePath}: ${(error as Error).message}`,
    );
  }

  // Convert Sets to Arrays for final output - mapping explicitly to avoid spread iterator errors
  const registryJson: RegistryJson = {
    name: registry.name,
    type: registry.type,
    dependencies: Array.from(registry.dependencies),
    devDependencies: Array.from(registry.devDependencies),
    registryDependencies: Array.from(registry.registryDependencies),
    files: registry.files,
  };

  return registryJson;
}
