#!/usr/bin/env node
import { program } from "commander";
import { initAction } from "./src/commands/init.js";
import logger from "./src/utils/logger.js";
import chalk from "chalk";
import type { RawGenerateOptions } from "./src/types/index.js";
import { CURRENT_VERSION } from "./src/constant/current-version.js";
import { usingCLI } from "./src/commands/generate.js";

program
  .name("regify")
  .version(CURRENT_VERSION)
  .description(
    "Turn components into shareable registries that compatible with ShadCN CLI.",
  );

// Initialization command
program
  .command("init")
  .description("Initialize regify configuration file")
  .action(initAction);

// Generate command
program
  .command("generate")
  .description(
    "Generate a registry.json file for the given component or directory of components",
  )
  .option("--name <name>", "Name of the component")
  .option(
    "--input <input>",
    "Relative path to the component file or directory. For directory path --name flag will be ignored.",
  )
  .option(
    "--output [output]",
    "Output path for the generated JSON(s). Defaults to the current directory.",
  )
  .option(
    "--rawjson",
    "Output raw JSON to console. If true, the --output flag will be ignored.",
  )
  .action((options: RawGenerateOptions) => usingCLI(options))
  .configureOutput({
    writeErr: () => {},
  })
  .exitOverride((err) => {
    // it ignores the "Help" and "Version" calls (they aren't actual errors)
    if (
      err.code === "commander.helpDisplayed" ||
      err.code === "commander.version"
    ) {
      return;
    }

    // formatting the known commander errors
    // commander sometimes prepends "CommanderError:" and "error:" to the error message
    logger.error(
      chalk.red(
        err.message.replace("error: ", "").replace("CommanderError: ", "") +
          "\n",
      ),
    );
    process.exit(err.exitCode);
  });

try {
  await program.parseAsync(process.argv);
} catch (err) {
  // This catches unexpected "Unknown" errors from processes and other internal actions
  logger.error("An unexpected error occurred:");
  console.log(chalk.dim((err as Error).stack));
  process.exit(1);
}
