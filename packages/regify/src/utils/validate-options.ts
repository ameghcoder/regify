import z from "zod";
import generateSchema from "../schema/generate.js";
import { GenerateOptions, RawGenerateOptions } from "../types/index.js";
import logger from "./logger.js";

export const validateOptions = (
  options: RawGenerateOptions,
): GenerateOptions => {
  try {
    const parsedOptions = generateSchema.parse(options);
    return parsedOptions;
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error("Invalid options provided:");
      error.errors.forEach((err) => {
        logger.error(`- ${err.message}`);
      });
      process.exit(1);
    } else {
      logger.error("An unexpected error occurred:");
      process.exit(1);
    }
  }
};
