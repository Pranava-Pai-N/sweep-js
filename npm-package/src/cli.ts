#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import handleCleanup from "./services/cleanup.js";
import { findTargetFolders } from "./services/finder.js";
import { formatBytes, type unitsType } from "./services/cleanup.js";
import pkg from "../package.json" with { type: "json"};
import { startupBanner } from "./services/startup.js";

const program = new Command();

startupBanner()

program
    .name("sweep-js")
    .description("A Simple CLI tool to sweep out unnecessary node_modules, .next folders, dist files and __pycache__ from projects")
    .version(chalk.green(`Currently using ${pkg.version} version of ${pkg.name}`), "-v,--version", "Fetches the recent version of the package");


program
    .command("sweep")
    .description("Takes the file location and folder types to free up space")
    .argument("[dir]", "Target directory or folder to clean", ".")
    .option(
        "-t, --targets <folders...>",
        "Folder names to target for cleanup",
        ["node_modules", ".next", "dist", "build", "__pycache__"]
    )
    .action(async (dirArg: string, options: { targets: string[] }) => {
        const rootDir = path.resolve(dirArg);

        if (!fs.existsSync(rootDir)) {
            console.log(chalk.red("\nPlease provide a valid target directory to sweep files.\n"));
            process.exit(1);
        }

        console.log(chalk.bold.cyan(`\nStarting Sweep in: ${rootDir}`));
        console.log(chalk.dim(`Searching for targets: ${options.targets.join(", ")}\n`));


        const matchingPaths = await findTargetFolders(rootDir, options.targets);

        if (matchingPaths.length === 0) {
            console.log(chalk.yellow("Everything looks clean! No matching target folders found."));
            return;
        }

        let deletedCount = 0;
        let freedSpaceBytes = 0;

        const unitMultipliers: Record<unitsType, number> = {
            Bytes: 1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
            TB: 1024 * 1024 * 1024 * 1024,
        };

        for (const fullPath of matchingPaths) {
            const relativePath = path.relative(rootDir, fullPath);

            const result = await handleCleanup(fullPath);

            if (result.success) {
                console.log(
                    `${chalk.green("Successfully removed")} ${chalk.bold(relativePath)} ${chalk.dim(`(${result.freedSpace} ${result.units})`)}`
                );
                deletedCount++;

                const multiplier = unitMultipliers[result.units] || 1;
                freedSpaceBytes += result.freedSpace * multiplier;
            } else {
                console.log(`${chalk.red("Failed to clean")} ${chalk.bold(relativePath)}`);
            }
        }

        const formattedTotal = formatBytes(freedSpaceBytes);
        console.log(
            "\n" +
            chalk.bold.green(
                `Clean finished! Removed ${deletedCount} ${deletedCount === 1 ? "item" : "items"}. Freed up ${formattedTotal.value} ${formattedTotal.units} of unwanted space `
            )
        );

        console.log(chalk.bold.green("\n\nThank you for using sweep-js. Hope you had a great time using the service. Hope to see you back again!!\n"))
    });

program.parse(process.argv);