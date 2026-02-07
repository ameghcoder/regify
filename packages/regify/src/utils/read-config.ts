import fs from "fs";
import path from "path";
import { RegifyConfig } from "../types/index.js";

export async function readConfig(): Promise<RegifyConfig> {
  const regifyConfigPath = path.resolve(process.cwd(), "regify.json");
  if (fs.existsSync(regifyConfigPath)) {
    return JSON.parse(
      fs.readFileSync(regifyConfigPath, "utf-8"),
    ) as RegifyConfig;
  }
  return {};
}
