import { usingAPI } from "../src/commands/generate.js";
import type { RawGenerateOptions } from "../src/types/index.js";
import { CURRENT_VERSION } from "../src/constant/current-version.js";

export { CURRENT_VERSION };

/**
 * Programmatically run the regify generation process.
 *
 * @param input - Path to the component file or directory
 * @param options - Additional generation options (flags)
 * @returns Promise that resolves to a status object
 *
 * @example
 * const result = await regify("./components/Button.tsx", { name: "MyButton" });
 * console.log(result.message);
 */
export async function regify(
  input: string,
  options: Omit<RawGenerateOptions, "input"> = {},
) {
  return await usingAPI({ ...options, input });
}

// Re-export types for programmatic users
export type {
  RawGenerateOptions,
  RegifyConfig,
  RegistryJson,
  RegistryFile,
  RegistryType,
} from "../src/types/index.js";
