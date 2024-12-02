import * as fs from "node:fs/promises";

export async function readInput(path) {
  const filePath = `${process.cwd()}/${path}`;
  const contents = fs.readFile(filePath, { encoding: "utf8" });

  return contents;
}