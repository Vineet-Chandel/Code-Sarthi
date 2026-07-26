export default {
  topics: [
    {
      id: "shortcuts",
      title: "Essential Shortcuts",
      sections: [
        {
          heading: "Command Palette & navigation",
          description: "The Command Palette (⌘⇧P) is the fastest way to trigger any VS Code action.",
          language: "bash",
          code: `# Command Palette
⌘⇧P (Mac) / Ctrl+Shift+P (Win)   — all commands

# File navigation
⌘P          — Quick Open (fuzzy file search)
⌘⇧O         — Go to symbol in file
⌘T           — Go to symbol in workspace
⌘G           — Go to line number
⌘⇧E         — Explorer panel
⌘⇧F         — Search panel

# Editor navigation
⌘←  / ⌘→   — start / end of line
⌥←  / ⌥→   — word left / right
⌘↑  / ⌘↓   — top / bottom of file
⌃-           — go back to previous location`,
        },
        {
          heading: "Editing",
          description: "Multi-cursor editing and code actions reduce repetitive edits.",
          language: "bash",
          code: `# Multi-cursor
⌥ + click           — add cursor at click position
⌘⌥↓ / ⌘⌥↑         — add cursor below / above
⌘D                  — select next match of selection
⌘⇧L                — select all matches

# Line operations
⌥↑ / ⌥↓            — move line up / down
⇧⌥↑ / ⇧⌥↓         — copy line up / down
⌘⇧K                — delete line
⌘⏎                 — insert line below
⌘X (no selection)  — cut entire line

# Code
⌘/       — toggle comment
⇧⌥F     — format document
F12      — go to definition
⌥F12    — peek definition
⌘.       — quick fix / code actions
F2       — rename symbol`,
        },
        {
          heading: "Terminal & panel",
          description: "Control the integrated terminal and side panels without leaving the keyboard.",
          language: "bash",
          code: `# Terminal
⌃\`        — toggle integrated terminal
⌃⇧\`       — new terminal
⌘⇧C       — open external terminal

# Panels
⌘B        — toggle sidebar
⌘⇧U      — output panel
⌘⇧M      — problems panel
⌘J        — toggle bottom panel

# Splits
⌘\         — split editor right
⌘1 / ⌘2  — focus editor group 1 / 2

# Zen mode
⌘KZ       — distraction-free mode`,
        },
      ],
    },
    {
      id: "settings",
      title: "Settings & Config",
      sections: [
        {
          heading: "Essential settings.json",
          description: "Open settings.json with ⌘⇧P → 'Open User Settings (JSON)'.",
          language: "json",
          code: `{
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.fontFamily": "'JetBrains Mono', Menlo, monospace",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.wordWrap": "off",
  "editor.tabSize": 2,
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": true,
  "editor.bracketPairColorization.enabled": true,
  "files.autoSave": "onFocusChange",
  "terminal.integrated.fontFamily": "'JetBrains Mono'",
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme"
}`,
        },
        {
          heading: "Workspace settings",
          description: "Per-project settings live in .vscode/settings.json and override user settings.",
          language: "json",
          code: `// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnSave": true
  },
  "typescript.preferences.importModuleSpecifier": "shortest",
  "eslint.workingDirectories": ["./frontend", "./api"],
  "search.exclude": {
    "node_modules": true,
    "dist": true,
    ".next": true
  }
}`,
        },
      ],
    },
    {
      id: "debug",
      title: "Debugging",
      sections: [
        {
          heading: "launch.json — debug configs",
          description: "Create .vscode/launch.json to define debugger configurations for your project.",
          language: "json",
          code: `// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Node",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/src/index.ts",
      "runtimeArgs": ["--loader", "ts-node/esm"],
      "console": "integratedTerminal"
    },
    {
      "name": "Attach to Chrome",
      "type": "chrome",
      "request": "attach",
      "port": 9222,
      "webRoot": "\${workspaceFolder}/src"
    }
  ]
}`,
        },
        {
          heading: "Debugging shortcuts",
          description: "Learn the debug keyboard shortcuts to step through code without reaching for the mouse.",
          language: "bash",
          code: `F5          — start / continue debugging
⇧F5         — stop debugger
F9          — toggle breakpoint
F10         — step over (next line)
F11         — step into (enter function)
⇧F11        — step out (leave function)

# While paused in debugger:
# - Hover over variables to see values
# - Use Debug Console to evaluate expressions
# - Use Watch panel to track specific variables
# - Use Call Stack to see how you got here`,
        },
      ],
    },
  ],
};
