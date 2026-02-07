import fs from "fs";
import path from "path";
import chalk from "chalk";
import logger from "../utils/logger.js";
import type { RegifyConfig } from "../types/index.js";
import { CURRENT_VERSION } from "../constant/current-version.js";

export async function initAction(): Promise<void> {
  const configPath = path.resolve(process.cwd(), "regify.json");

  if (fs.existsSync(configPath)) {
    logger.warn("regify.json already exists in the current directory.");
    return;
  }

  const defaultConfig: RegifyConfig = {
    name: "regify",
    version: CURRENT_VERSION,
    registryDependencies: {},
    outputDir: "./registry",
    basePath: "src/components",
  };

  try {
    fs.writeFileSync(
      configPath,
      JSON.stringify(defaultConfig, null, 2),
      "utf-8",
    );
    logger.success("✅ Created regify.json with default configuration.");
    logger.info(
      `Now you can edit your ${chalk.cyan("regify.json")} config file.`,
    );
  } catch (error) {
    logger.error(`Failed to create regify.json: ${(error as Error).message}`);
    process.exit(1);
  }
}
