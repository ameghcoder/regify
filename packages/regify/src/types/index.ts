import type { z } from "zod";
import type generateSchema from "../schema/generate.js";

/**
 * Registry types for component classification
 */
export type RegistryType =
  | "registry:ui"
  | "registry:hook"
  | "registry:lib"
  | "registry:style";

/**
 * File entry in the registry
 */
export interface RegistryFile {
  path: string;
  content: string;
  type: RegistryType;
}

/**
 * Registry structure (internal - with Sets)
 */
export interface RegistryStructure {
  name: string;
  type: RegistryType | null;
  dependencies: Set<string>;
  devDependencies: Set<string>;
  registryDependencies: Set<string>;
  files: RegistryFile[];
}

/**
 * Registry JSON output (external - with arrays)
 */
export interface RegistryJson {
  name: string;
  type: RegistryType | null;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

/**
 * Generate command options (parsed)
 */
export type GenerateOptions = z.infer<typeof generateSchema>;

/**
 * Command options from commander (raw)
 */
export interface RawGenerateOptions {
  name?: string;
  input?: string;
  output?: string;
  rawjson?: boolean;
}

/**
 * Regify configuration file structure
 */
export interface RegifyConfig {
  name?: string;
  version?: string;
  outputDir?: string;
  registryDependencies?: Record<string, string>;
  basePath?: string;
  [key: string]: unknown;
}

/**
 * Workspace information for monorepo detection
 */
export interface WorkspaceInfo {
  isMonorepo: boolean;
  workspaces: string[];
  dependencies: Set<string>;
  workspaceDependencies: Set<string>;
}

/**
 * Logger interface
 */
export interface Logger {
  error: (msg: string) => void;
  success: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
}
