import chalk from "chalk";
import type { Logger } from "../types/index.js";

const logger: Logger = {
  error: (msg: string): void =>
    console.log(`${chalk.red.bold("Error:")} ${chalk.red(msg)}`),
  success: (msg: string): void =>
    console.log(`${chalk.green.bold("Success:")} ${chalk.green(msg)}`),
  info: (msg: string): void =>
    console.log(`${chalk.blue.bold("Info:")} ${chalk.blue(msg)}`),
  warn: (msg: string): void =>
    console.log(`${chalk.yellow.bold("Warning:")} ${chalk.yellow(msg)}`),
};

export default logger;
