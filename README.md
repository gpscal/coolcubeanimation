# 🎨 Cool Terminal Animations

A collection of stunning terminal screensaver animations including Matrix rain, starfield, plasma waves, DNA helix, 3D rotating cube, fire effects, and the original Cursor-agent style login screen!

## ✨ Features

- **7 Mesmerizing Terminal Screensaver Animations**: Matrix, Starfield, Plasma, DNA Helix, 3D Cube, Fire, and Plane
- **✈️ Plane Screensaver**: Aerospace.png image converted to ASCII art with Matrix-style background, moving stars, and clouds
- **Cursor-Agent Style Login**: Original animated login screen
- **🎓 Interactive Tutorial**: Step-by-step guided coding lesson for learning how Matrix rain works!
- **📚 Detailed Documentation**: Kid-friendly tutorial explaining every concept
- **Full Color Support**: Rich terminal colors using chalk
- **Smooth 30 FPS**: Butter-smooth animations
- **Responsive**: Adapts to your terminal/browser size
- **Easy Exit**: Press any key to exit
- **Global CLI**: Install globally for quick access

## 🎓 Learn to Code Matrix Rain!

### Interactive Tutorial (Recommended for Beginners!)

Want to learn how the Matrix rain animation works? Try our interactive step-by-step tutorial! It's like having a personal coding tutor guide you through building the animation line by line.

```bash
npm run tutorial
# or
npm run learn
# or
node interactive_matrix_tutorial.js
```

The tutorial will:
- ✅ Guide you through each step with clear explanations
- ✅ Ask you to fill in code and check your understanding
- ✅ Show you how each part works
- ✅ Run your completed animation at the end!

### Written Tutorial

For a detailed written guide, check out [`MATRIX_RAIN_TUTORIAL.md`](./MATRIX_RAIN_TUTORIAL.md) - a comprehensive kid-friendly tutorial explaining every concept!

## 🚀 Installation

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

## 🎬 Available Animations

### 🟢 Matrix Rain
Classic Matrix-style falling characters with Japanese katakana and alphanumeric characters. Green cascading text creates that iconic hacker aesthetic!

```bash
npm run matrix
# or
node index.js matrix
# or (if installed globally)
coolanim matrix
```

### ⭐ Starfield
Fly through space at warp speed! Watch stars rush past you in this immersive 3D starfield effect with perspective projection.

```bash
npm run starfield
# or
node index.js starfield
```

### 🌊 Plasma Wave
Mesmerizing animated plasma waves with flowing colors. Hypnotic sine and cosine waves create beautiful interference patterns.

```bash
npm run plasma
# or
node index.js plasma
```

### 🧬 DNA Helix
Watch a rotating DNA double helix structure spin endlessly. Cyan and magenta strands connected by base pairs.

```bash
npm run dna
# or
node index.js dna
```

### 📦 3D Rotating Cube
A wireframe cube spinning gracefully in 3D space with proper perspective projection. Math made beautiful!

```bash
npm run cube
# or
node index.js cube
```

### 🔥 Fire Effect
Realistic fire simulation with heat propagation. Watch flames dance and flicker using cellular automata.

```bash
npm run fire
# or
node index.js fire
```

### 🚪 Cursor-Agent Login Screen
The original cursor-agent style login animation with ASCII art and blinking prompt.

```bash
npm run login
# or
node index.js login
```

### ✈️ Plane Screensaver (CLI)
A beautiful CLI screensaver featuring the Aerospace.png plane converted to ASCII art, flying in the center with a Matrix-style background, moving stars, and clouds. The plane image is automatically converted to ASCII and displayed with colors!

```bash
npm run screensaver
# or
npm run plane
# or
node index.js plane
```

The plane will appear in the center with subtle movement, surrounded by Matrix-style falling characters, stars, and clouds.

## 📖 Usage

### Quick Start

```bash
# Default animation (Matrix)
npm start

# Run any specific animation
node index.js [animation-name]

# Using npm scripts (easier!)
npm run [animation-name]

# Show help and list all animations
npm run help
node index.js help
```

### All Commands

| Command | Description |
|---------|-------------|
| `npm run matrix` | Matrix rain animation |
| `npm run starfield` | Starfield warp speed |
| `npm run plasma` | Plasma wave effect |
| `npm run dna` | DNA helix rotation |
| `npm run cube` | 3D rotating cube |
| `npm run fire` | Fire simulation |
| `npm run login` | Cursor-agent login screen |
| `npm run screensaver` | CLI plane screensaver (Aerospace.png + Matrix + Space + Clouds) |
| `npm run plane` | Same as screensaver |
| `npm run help` | Show all available options |

## 🎮 Controls

- **Any Key**: Exit animation
- **Ctrl+C**: Force quit

## 🛠️ Technical Details

- Built with Node.js ES modules (requires Node 18+)
- Uses chalk 5.x for terminal colors
- 30 FPS animation loop with setInterval
- Responsive to terminal size via `process.stdout.columns/rows`
- Clean exit handling with proper cursor restoration
- Raw mode terminal input for instant keypress detection

### Animation Algorithms

- **Matrix**: Random character drops with variable speeds and brightness falloff
- **Starfield**: 3D point projection with Z-depth and perspective scaling
- **Plasma**: Multi-layered sine/cosine waves with time animation
- **DNA**: Parametric helix equations with phase offset
- **Cube**: 3D rotation matrices (X, Y, Z) with perspective projection
- **Fire**: Cellular automata with heat diffusion and decay

## 🌟 Quick Access Aliases

After installing globally, create shell aliases for even quicker access:

### Bash/Zsh (`~/.bashrc` or `~/.zshrc`)
```bash
alias matrix='coolanim matrix'
alias starfield='coolanim starfield'
alias plasma='coolanim plasma'
alias fire='coolanim fire'
alias ss='coolanim matrix'  # screensaver
```

### PowerShell (`$PROFILE`)
```powershell
function Start-Matrix { coolanim matrix }
function Start-Starfield { coolanim starfield }
function Start-Plasma { coolanim plasma }
function Start-Fire { coolanim fire }

Set-Alias -Name matrix -Value Start-Matrix
Set-Alias -Name starfield -Value Start-Starfield
Set-Alias -Name plasma -Value Start-Plasma
Set-Alias -Name fire -Value Start-Fire
```

## 🎨 Customization

Each animation class can be easily modified in `index.js`:

- **Colors**: Edit the chalk color calls in each render method
- **Speed**: Adjust FPS in the animation loop (currently 30 FPS)
- **Characters**: Modify character sets (e.g., `chars` in MatrixRain)
- **Size**: Adjust size parameters in each animation constructor
- **Effects**: Tweak mathematical formulas for different visual effects

## 📋 Requirements

- Node.js 18+ (for ES modules support)
- A terminal that supports ANSI color codes and UTF-8
- chalk 5.3.0 (installed via npm)

## 🐛 Troubleshooting

**Animation looks weird or has artifacts?**
- Try resizing your terminal
- Ensure your terminal supports 256 colors
- Some terminals may not support all Unicode characters

**Animation is too slow?**
- Reduce FPS by changing the interval in screensaverMode
- Try a simpler animation like DNA or Matrix

**Can't exit with a key?**
- Try Ctrl+C as a fallback
- Ensure your terminal is in focus

## 📝 Examples

```bash
# Quick matrix screensaver
npm start

# Try them all!
npm run matrix
npm run starfield
npm run plasma
npm run dna
npm run cube
npm run fire

# Classic login screen
npm run login

# See what's available
npm run help
```

## 🤝 Contributing

Feel free to add your own animations! Each animation is a class with:
- `constructor(width, height)`: Initialize the animation
- `render()`: Render one frame to the terminal

## 📄 License

MIT

---

Enjoy your terminal screensavers! 🎉✨

Press any key to exit. Have fun! 🚀
