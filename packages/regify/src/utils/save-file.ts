import fs from "fs";
import path from "path";
import type { RegistryJson } from "../types/index.js";

export function saveFile(
  data: RegistryJson,
  directoryPath: string,
  fileName: string,
): string {
  const componentName = fileName.split(".").shift() ?? "component";
  const resolvedDirPath = path.resolve(directoryPath);

  try {
    if (!fs.existsSync(resolvedDirPath)) {
      fs.mkdirSync(resolvedDirPath, { recursive: true });
    }

    const filePath = path.join(resolvedDirPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return path.relative(process.cwd(), filePath);
  } catch (error) {
    throw new Error(
      `Failed to save registry for ${componentName}: ${
        (error as Error).message || error
      }`,
    );
  }
}
