import chalk from "chalk";
import pkg from "../../package.json" with { type: "json" };

export const startupBanner = () => {
    const banner = `
   ██████╗ ██╗  ██╗  ██╗███████╗███████╗██████╗     ██╗███████╗
  ██╔════╝ ██║  ██║  ██║██╔════╝██╔════╝██╔══██╗    ██║██╔════╝
  ███████╗ ██║  ██║  ██║█████╗  █████╗  ██████╔╝    ██║███████╗
  ╚════██║ ██║  ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝     ██║╚════██║
  ███████║ ╚██████████╔╝███████╗███████╗██║    ██╗  ██║███████║
  ╚══════╝  ╚═════██═╝ ╚══════╝╚══════╝╚═╝    ╚═╝  ██║╚══════╝
                                                  ╚██████╔╝   
                                                   ╚═════╝    `

    console.log(chalk.green(banner));

    console.log(
        chalk.bold("Welcome to ") +
        chalk.green.bold("sweep-js") +
        chalk.dim(` (v${pkg.version})`)
    );
    console.log(chalk.gray("\nClean up node_modules, build outputs, & cache in seconds.\n"));


    console.log(chalk.dim("  ──────────────────────────────────────────────────────────\n"));
};
