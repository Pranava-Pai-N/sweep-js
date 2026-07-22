import fs from "fs/promises";
import path from "path";


export async function findTargetFolders(
    directory: string,
    targetNames: string[]
): Promise<string[]> {
    const matches: string[] = [];

    async function scan(currentDir: string) {
        let entries;
        try {
            entries = await fs.readdir(currentDir, { withFileTypes: true });
        } catch {
            return;  // Folders with no permissions
        }

        for (const entry of entries) {
            if (!entry.isDirectory())
                continue;

            const fullPath = path.join(currentDir, entry.name);

            if (targetNames.includes(entry.name)) {
                matches.push(fullPath);
            } else {
                if (entry.name !== ".git") {
                    await scan(fullPath);
                }
            }
        }
    }

    await scan(directory);
    return matches;
}