import type { RegistryStructure } from "../types/index.js";

export const registryStructure: RegistryStructure = {
  name: "",
  type: null,
  dependencies: new Set(),
  devDependencies: new Set(),
  registryDependencies: new Set(),
  files: [],
};
