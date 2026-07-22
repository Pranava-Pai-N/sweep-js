export const featureList = [
    {
        title: "Fast Recursive Sweep",
        body: "Scans deep directory trees in a single pass to pinpoint heavy build folders instantly.",
    },
    {
        title: "Custom Targets",
        body: "Specify exact folder names to target so you never risk deleting important files.",
    },
    {
        title: "Zero-Config Presets",
        body: "Ships ready to clean Node, Next.js, Python, and build outputs out of the box.",
    },
    {
        title: "Reclaimed Space Stats",
        body: "Provides a clear summary showing deleted folder counts and total freed storage.",
    },
];

export const defaultTargets = ["node_modules", ".next", "dist", "build", "__pycache__", "and many more ..."];

export const useCases = [
    "Free up disk space after testing heavy node dependencies",
    "Wipe build cache artifacts before pushing or archiving repositories",
    "Clean up Python compiled cache folders across local directories",
    "Tidy up your workspace without manual efforts",
];