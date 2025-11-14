# Cool Animation CLI

A beautiful CLI animation similar to the cursor-cli login screen, featuring ASCII art and an interactive login prompt. Perfect as a screensaver or terminal clear command!

## Features

- 🎨 Beautiful ASCII art animation
- ✨ Blinking "Press any key..." prompt
- 🎯 Centered layout that adapts to terminal size
- 🌈 Colorful terminal output using Chalk
- ⌨️ Interactive keypress detection
- 💾 Screensaver mode - clears screen and shows animation
- 🚀 Installable as global CLI command

## Installation

```bash
npm install
```

### Install Globally (Optional)

To use from anywhere in your terminal:

```bash
npm install -g .
```

Or if published:

```bash
npm install -g cool-animation-cli
```

## Usage

### Login Mode (Default)
Shows animation with sign-in simulation:

```bash
npm start
# or
node index.js
# or (if installed globally)
coolanim
```

### Screensaver Mode
Clears screen and shows animation, exits on any keypress:

```bash
npm run screensaver
# or
npm run ss
# or
npm run clear
# or
node index.js screensaver
# or (if installed globally)
coolanim screensaver
# or
canim ss
```

## Modes

- **`login`** (default) - Shows animation with sign-in simulation
- **`screensaver`** / **`ss`** / **`clear`** - Screensaver mode, clears screen and exits on keypress

## How it works

1. The animation displays ASCII art on the left side of the terminal
2. A prompt appears on the right side
3. The "Press any key..." text blinks every 500ms
4. Press any key to continue (or trigger sign-in in login mode)

## Quick Access

After installing globally, you can create aliases in your shell:

**Bash/Zsh** (`~/.bashrc` or `~/.zshrc`):
```bash
alias clear='coolanim screensaver'
alias ss='coolanim screensaver'
```

**PowerShell** (`$PROFILE`):
```powershell
function Clear-Screen { coolanim screensaver }
Set-Alias -Name ss -Value Clear-Screen
```

## Customization

You can customize the ASCII art by modifying the `ASCII_ART` constant in `index.js`. You can also adjust colors, timing, and layout by editing the `renderScreen` function.

## Requirements

- Node.js 18+ (for ES modules support)
- A terminal that supports ANSI color codes

## License

MIT

