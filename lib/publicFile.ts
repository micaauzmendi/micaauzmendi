import fs from "fs";
import path from "path";

export function publicFileExists(relPath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relPath));
}
