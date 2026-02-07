import { z } from "zod";
import fs from "fs";
import path from "path";

const generateSchema = z.object({
  name: z
    .string()
    .refine(
      (val): boolean => {
        if (!val) return true;
        const trimmed = val.trim();
        // Check if not empty and doesn't start with a number
        return trimmed.length > 0 && !/^\d/.test(trimmed);
      },
      {
        message: "Component name must not start with a number",
      },
    )
    .optional(),
  input: z
    .string({ required_error: "Component path is required" })
    .refine(
      (val): boolean => {
        const fullPath = path.resolve(val);
        // Check if path exists
        return fs.existsSync(fullPath);
      },
      {
        message: "Path must exist",
      },
    )
    .refine(
      (val): boolean => {
        const fullPath = path.resolve(val);
        const stats = fs.statSync(fullPath);

        // If it's a directory, it's valid
        if (stats.isDirectory()) return true;

        // If it's a file, check the extension
        const ext = path.extname(val);
        return [".jsx", ".tsx", ".ts", ".js"].includes(ext);
      },
      {
        message:
          "Path must be a directory or a file with extension .jsx, .tsx, .ts, or .js",
      },
    ),
  output: z.string().optional(),
  rawjson: z.boolean().optional(),
});

export default generateSchema;
