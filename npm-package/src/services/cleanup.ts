import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec)

export type unitsType = "Bytes" | "KB" | "MB" | "GB" | "TB"


const getDirectorySize = async (directoryPath: string): Promise<number> => {  // Recursive Function
    let totalSize = 0;

    try {
        const fileEntries = await fs.promises.readdir(directoryPath, { withFileTypes: true });

        for (const entry of fileEntries) {
            const fullPath = path.join(directoryPath, entry.name);

            if (entry.isDirectory()) {
                totalSize += await getDirectorySize(fullPath);
            }
            else if (entry.isFile()) {
                // It is a file
                const stats = await fs.promises.stat(fullPath);

                totalSize += stats.size;
            }
        }

    } catch (error: any) {
        console.log("No permissions to delete the file. Please try again later", error)
    }
    return totalSize;
}


export const formatBytes = (bytes: number): { value: number, units: unitsType } => {
    if (bytes == 0) {
        return { value: 0, units: "Bytes" };
    }

    const value = 1024;
    const formatSizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const index = Math.floor(Math.log(bytes) / Math.log(value)) as number;
    const numericValue = parseFloat((bytes / Math.pow(value, index)).toFixed(2));

    return {
        value: numericValue,
        units: formatSizes[index] as unitsType
    }
}



const handleCleanup = async (targetPath: string): Promise<{ success: boolean; freedSpace: number, units: unitsType }> => {
    const absolutePath = path.resolve(targetPath);

    if (absolutePath === path.resolve("/") || absolutePath === process.cwd()) {
        throw new Error(`Refusing to delete safe directory: ${absolutePath}`);
    }

    if (!fs.existsSync(absolutePath)) {
        console.log(`Path non-existent, skipping: ${absolutePath}`);
        return { success: true, freedSpace: 0, units: "Bytes" };
    }

    const bytesToFree = await getDirectorySize(absolutePath);
    const formattedSize = formatBytes(bytesToFree);

    console.log(`Cleaning ${absolutePath} (${formattedSize})...`);

    try {
        await fs.promises.rm(absolutePath, { recursive: true, force: true });
        return { success: true, freedSpace: formattedSize.value, units: formattedSize.units };
    } catch (err) {
        console.warn(`Native fs.rm failed for ${absolutePath}. Attempting OS shell fallback...`);
    }

    try {
        const isWindows = process.platform === "win32";

        const command = isWindows
            ? `rmdir /s /q "${absolutePath}"`
            : `rm -rf "${absolutePath}"`;

        await execAsync(command);

        return { success: true, freedSpace: formattedSize.value, units: formattedSize.units };
    } catch (execErr: any) {
        console.error(`Failed to delete ${absolutePath}:`, execErr.message);
        return { success: false, freedSpace: 0, units: "Bytes" };
    }
};


export default handleCleanup;