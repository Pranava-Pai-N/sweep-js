# Sweep-js

```bash
 ██████╗ ██╗  ██╗  ██╗███████╗███████╗██████╗     ██╗███████╗
  ██╔════╝ ██║  ██║  ██║██╔════╝██╔════╝██╔══██╗    ██║██╔════╝
  ███████╗ ██║  ██║  ██║█████╗  █████╗  ██████╔╝    ██║███████╗
  ╚════██║ ██║  ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝     ██║╚════██║
  ███████║ ╚██████████╔╝███████╗███████╗██║    ██╗  ██║███████║
  ╚══════╝  ╚═════██═╝ ╚══════╝╚══════╝╚═╝    ╚═╝  ██║╚══════╝
                                                  ╚██████╔╝   
                                                   ╚═════╝    
```

A lightweight CLI for cleaning up common build and cache folders in a project tree.

If your workspace has grown large from repeated installs, builds, and local experiments, `sweep-js` helps you reclaim disk space quickly without manually hunting down folders one by one.

## Why this tool?

Large projects often accumulate folders that are safe to remove after they are no longer needed, including:

- `node_modules`
- `.next`
- `dist`
- `build`
- `__pycache__`

`Note`: Added support for removing redundancy or cache from `10+` Languages starting from `version-0.0.4`

`sweep-js` recursively scans a directory and removes matching folders that you choose to target.

Note:
- Add custom folders to remove via command:
```bash
    npx sweep-js sweep -t folder_name
```

## Features

- Recursively searches a target directory
- Removes custom folder names you specify
- Uses a sensible default set of common generated folders
- Reports how many folders were removed and how much space was freed
- Includes safety checks to avoid deleting the system root or the current working directory

## Installation

Install globally:

```bash
npm install -g sweep-js
```

Or use it directly with `npx`:

```bash
npx sweep-js sweep .
```

## Documentation

View usage and documentation at 
[Official Documentation](https://sweep.pranava-pai.live).


## Tech Stack

This package is built with a lightweight Node.js CLI stack:

- **Node.js** - runtime for the CLI
- **TypeScript** - source language for the package implementation + Type Safety
- **Commander** - command-line argument parsing
- **Chalk** - colored terminal output
- **tsx** - fast development execution for TypeScript files via tsx watch
- **npm** - package installation and script execution

## Usage

### Basic command

```bash
sweep-js sweep [dir]
```

### Arguments

- `dir` (optional): the directory to scan. Defaults to the current directory `.`.

### Options

#### `-t, --targets <folders...>`

Customize which folder names should be removed.

```bash
sweep-js sweep . -t node_modules .next dist build __pycache__
```

If you do not provide `--targets`, the tool uses the following defaults:

```text
node_modules .next dist build __pycache__
```

## Examples

### Clean the current project

```bash
sweep-js sweep
```

### Clean a specific folder

```bash
sweep-js sweep /path/to/project
```

### Remove only specific generated folders

```bash
sweep-js sweep -t .next dist build
```

### Remove Python cache folders only

```bash
sweep-js sweep -t __pycache__
```

## Use cases

- Free up space after dependency installs
- Remove build output from Node.js or Next.js projects
- Clean generated cache folders from Python-based workspaces
- Quickly tidy a repository before archiving or switching branches

## Development

If you are working on the package locally, the repository already includes the basic scripts you need:

```bash
npm install
npm run dev -- sweep .
npm run build
```

### Available scripts

- `npm run dev` starts the CLI in development mode using `tsx watch`
- `npm run build` compiles the TypeScript source to the distributable output - `/dist`folder

## Project structure

```bash
npm-package
├── LICENSE   # Project LICENSE
├── package-lock.json
├── package.json
├── README.md   # Project Readme
├── src
│   ├── cli.ts   # Main entrypoint
│   └── services
│       ├── cleanup.ts   # Clean-up Logic
│       └── finder.ts    # Logic to find    the paths in a recursive manner
└── tsconfig.json

```

## Contributing

Contributions are welcome. If you want to improve the package:

1. Fork or clone the repository, and install all the dependencies
```bash
git clone https://github.com/Pranava-Pai-N/sweep-js
```
2. Create a feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Make your changes
4. Run the build locally
5. Submit a pull request with a short explanation of the change


## License

This project is licensed under the [MIT](./LICENSE)License.


## Developer Info
Built and maintained by Pranava Pai N.

- GitHub: https://github.com/Pranava-Pai-N
- Portfolio : https://pranava-pai.live
