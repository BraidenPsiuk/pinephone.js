import { readFile, writeFile, copyFile } from "node:fs/promises";
import * as path from "node:path";



console.log("Running postbuild...");
console.log("Generatig README.md for GitHub...");



const SRC_FILE_RELATIVE_PATH = path.normalize("./README.md");
const DEST_FILE_RELATIVE_PATH = path.normalize("./.github/README.md");
let fileContents = "";

try {
    await copyFile(SRC_FILE_RELATIVE_PATH, DEST_FILE_RELATIVE_PATH);
    console.log("Successfully copied file");
} catch { throw new Error("Failed to copy file") }

try {
    fileContents = await readFile(DEST_FILE_RELATIVE_PATH, "utf-8");
    fileContents = fileContents.toString();
    console.log("Successfully read file");
    fileContents = fileContents.replace("# pinephone.js (NPM)","# pinephone.js (GitHub)");
} catch { throw new Error("Failed to read file") }

try {
    await writeFile(DEST_FILE_RELATIVE_PATH, fileContents);
    console.log("Successfully wrote file");
} catch { throw new Error("Failed to copy file") }



console.log("Postbuild script complete");