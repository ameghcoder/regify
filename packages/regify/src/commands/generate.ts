import { RawGenerateOptions, RegistryJson } from "../types/index.js";
import logger from "../utils/logger.js";
import { readConfig } from "../utils/read-config.js";
import { validateOptions } from "../utils/validate-options.js";
import { generateRegistry } from "../utils/generate-registry.js";
import { saveFile } from "../utils/save-file.js";
import path from "path";
import fs from "fs";
import { globSync } from "glob";
import ora from "ora";

// Supported extensions for the file path
const SUPPORTED_EXTENSIONS: string[] = [".jsx", ".tsx", ".ts", ".js"];

// This function is used for both function CLI and API
interface Options {
  name?: string;
  input: string;
  rawjson?: boolean;
  output?: string;
  onFileProcessed?: (path: string) => void;
}
async function starter(options: Options): Promise<{
  status: boolean;
  message: string;
  data?: string;
  dataCount: number;
}> {
  try {
    // get config data (if available)
    const CONFIG = await readConfig();

    // get output directory from config or options
    options.output = options.output || CONFIG.outputDir;

    // resolve input
    const resolvedInputPath = path.resolve(options.input);

    // check if input is directory or file
    const isDirectory = fs.statSync(resolvedInputPath).isDirectory();

    if (isDirectory) {
      const resolvedOutputPath = options.output
        ? path.resolve(options.output)
        : path.resolve(resolvedInputPath, "registry");

      const filesSearchPattern = `*{${SUPPORTED_EXTENSIONS.join(",")}}`;

      const files = globSync(filesSearchPattern, {
        cwd: resolvedInputPath,
        nodir: true,
        absolute: true,
      });

      const outputResults: RegistryJson[] = [];
      const savedPaths: string[] = [];

      files.forEach((file) => {
        const registry = generateRegistry(file, CONFIG);
        if (options.rawjson) {
          outputResults.push(registry);
        } else {
          const savedPath = saveFile(
            registry,
            resolvedOutputPath,
            `${path.basename(file).split(".").shift()}.json`,
          );
          savedPaths.push(savedPath);
          if (options.onFileProcessed) options.onFileProcessed(savedPath);
        }
      });

      return {
        status: true,
        message: "Registry generated successfully.",
        data: options.rawjson
          ? JSON.stringify(outputResults, null, 2)
          : JSON.stringify(savedPaths),
        dataCount: savedPaths.length,
      };
    } else {
      const resolvedOutputPath = options.output
        ? path.resolve(options.output)
        : path.dirname(resolvedInputPath);

      const registry = generateRegistry(resolvedInputPath, CONFIG);

      if (options.rawjson) {
        return {
          status: true,
          message: "Registry generated successfully.",
          data: JSON.stringify(registry, null, 2),
          dataCount: 1,
        };
      } else {
        const finalFileName =
          (options.name || path.basename(resolvedInputPath))
            .split(".")
            .shift() + ".json";
        const savedPath = saveFile(registry, resolvedOutputPath, finalFileName);
        if (options.onFileProcessed) options.onFileProcessed(savedPath);
        return {
          status: true,
          message: "Registry generated successfully.",
          data: JSON.stringify([savedPath]),
          dataCount: 1,
        };
      }
    }
  } catch (err) {
    return {
      status: false,
      message: (err as Error).message || (err as string),
      dataCount: 0,
    };
  }
}

async function usingCLI(options: RawGenerateOptions): Promise<void> {
  try {
    const parsedOptions = validateOptions(options);

    // Extract
    const { name, input, rawjson, output } = parsedOptions;

    const spinner = !rawjson
      ? ora("Initializing registry generation...").start()
      : null;

    const response = await starter({
      name,
      input,
      rawjson,
      output,
      onFileProcessed: (p) => {
        if (spinner) {
          spinner.text = `Processing: ${p}`;
          // To keep a persistent log of saved files above the spinner
          ora().succeed(`Saved to - ${p}`);
        }
      },
    });

    if (response.status) {
      if (rawjson && response.data) {
        console.log(response.data);
      } else if (spinner) {
        spinner.succeed(
          response.dataCount > 1
            ? `All registries generated successfully! (${response.dataCount})`
            : `Registry generated successfully!`,
        );
      }
    } else {
      if (spinner) spinner.fail("Generation failed");
      logger.error(response.message);
      process.exit(1);
    }
  } catch (err) {
    logger.error((err as Error).message || (err as string));
    process.exit(1);
  }
}

/**
 * This function is used when you want to use regify as a library in your project.
 * @param options - The options to use for generating the registry.
 * @returns A promise that resolves to an object with the status, message, and data (optional).
 */

async function usingAPI(options: RawGenerateOptions): Promise<{
  status: boolean;
  message: string;
  data?: string;
}> {
  try {
    return await starter(options as Options);
  } catch (err) {
    return {
      status: false,
      message: (err as Error).message || (err as string),
    };
  }
}

export { usingCLI, usingAPI };
