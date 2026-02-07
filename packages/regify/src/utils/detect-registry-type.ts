import path from "path";
import type { SourceFile } from "ts-morph";
import type { RegistryType } from "../types/index.js";

/**
 * Registry type constants
 */
export const REGISTRY_TYPES = {
  UI: "registry:ui",
  HOOK: "registry:hook",
  LIB: "registry:lib",
  STYLE: "registry:style",
} as const;

/**
 * File extensions for different types
 */
const STYLE_EXTENSIONS: string[] = [".css", ".scss", ".sass", ".less"];
const CODE_EXTENSIONS: string[] = [".ts", ".tsx", ".js", ".jsx"];

/**
 * Path patterns for type detection
 */
const PATH_PATTERNS: Record<keyof typeof REGISTRY_TYPES, string[]> = {
  UI: ["/ui/", "\\ui\\", "/components/ui/", "\\components\\ui\\"],
  HOOK: ["/hooks/", "\\hooks\\"],
  LIB: ["/lib/", "\\lib\\", "/utils/", "\\utils\\"],
  STYLE: ["/styles/", "\\styles\\", "/css/", "\\css\\"],
};

/**
 * Detects if a file is a style file based on its extension
 */
function isStyleFile(fileExt: string): boolean {
  return STYLE_EXTENSIONS.includes(fileExt);
}

/**
 * Detects type based on file path patterns
 */
function detectTypeByPath(relativePath: string): RegistryType | null {
  for (const [type, patterns] of Object.entries(PATH_PATTERNS)) {
    if (patterns.some((pattern) => relativePath.includes(pattern))) {
      return REGISTRY_TYPES[type as keyof typeof REGISTRY_TYPES];
    }
  }
  return null;
}

/**
 * Detects if a file is a hook based on naming convention
 */
function isHookByNaming(fileName: string, fileExt: string): boolean {
  return fileName.startsWith("use") && CODE_EXTENSIONS.includes(fileExt);
}

/**
 * Analyzes the source file content to detect if it's a React hook
 */
function isHookByContent(sourceFile: SourceFile): boolean {
  try {
    // Check for exported functions starting with "use"
    const exportedFunctions = sourceFile
      .getFunctions()
      .filter((fn) => fn.isExported());
    return exportedFunctions.some((fn) => {
      const name = fn.getName();
      return name && name.startsWith("use");
    });
  } catch {
    return false;
  }
}

/**
 * Analyzes the source file content to detect if it's a React UI component
 */
function isUIComponent(sourceFile: SourceFile, fileExt: string): boolean {
  if (![".tsx", ".jsx"].includes(fileExt)) return false;

  try {
    const content = sourceFile.getFullText();

    // Check for JSX syntax (common indicators)
    const hasJSXReturn =
      content.includes("return (") || content.includes("return<");
    const hasJSXElements =
      /\<[A-Z]/.test(content) || /\<[a-z]+\s/.test(content);

    return hasJSXReturn && hasJSXElements;
  } catch {
    return false;
  }
}

/**
 * Main function to detect registry type based on file path, name, and content
 *
 * Detection priority:
 * 1. File extension (style files)
 * 2. Naming convention (e.g., use-* for hooks)
 * 3. Path-based detection (most reliable for organized projects)
 * 4. Content analysis (for ambiguous cases)
 * 5. Default fallback (lib)
 *
 * @param filePath - Absolute path to the file
 * @param rootDir - Root directory of the project
 * @param sourceFile - ts-morph SourceFile object (optional)
 * @returns Registry type (e.g., "registry:ui")
 */
export function detectRegistryType(
  filePath: string,
  rootDir: string,
  sourceFile: SourceFile | null = null,
): RegistryType {
  try {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath);
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");

    // 1. Check if it's a style file
    if (isStyleFile(fileExt)) {
      return REGISTRY_TYPES.STYLE;
    }

    // 2. Naming convention detection
    if (isHookByNaming(fileName, fileExt)) {
      return REGISTRY_TYPES.HOOK;
    }

    // 3. Path-based detection (highest priority for code files)
    const pathBasedType = detectTypeByPath(relativePath);
    if (pathBasedType) {
      return pathBasedType;
    }

    // 4. Content analysis (only for JS/TS files)
    if (sourceFile && CODE_EXTENSIONS.includes(fileExt)) {
      // Check for hooks first
      if (isHookByContent(sourceFile)) {
        return REGISTRY_TYPES.HOOK;
      }

      // Check for UI components
      if (isUIComponent(sourceFile, fileExt)) {
        return REGISTRY_TYPES.UI;
      }
    }

    // 5. Default fallback - assume it's a utility/library file
    return REGISTRY_TYPES.LIB;
  } catch (err) {
    throw new Error(
      `Failed to detect registry type for ${filePath}: ${(err as Error).message}`,
    );
  }
}
