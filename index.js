#!/usr/bin/env node

import chalk from 'chalk';

// ASCII art pattern (similar to cursor-cli style)
const ASCII_ART = `
+!,:;;
[?+>l":::;;;;;
{[?_<i;";:::;;;;III
##~~~~~~~~~~~~~~~~~~~~~~~h
11{[]MMMM############*ppll
1{}[?_~aM##########oppqqII
{}[]_~<iI: "###bpqqqqqIIIl
}]?_~<ilIi++]qwwwwww;IIII
]?_+<>~[---_^wwwwww;;;III
-++]f}{}}[[[[Lmmmmm~~::;;I
j]]|((()))11ZmmZ1111{{[<-
///\\|||||(|ZZZZ||\\/tf>
tttttttoZff^^>
^^^0>>
t>
`.trim();

// ==========================================
// NEW SCREENSAVER ANIMATIONS
// ==========================================

// Matrix rain animation
class MatrixRain {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.drops = [];
    this.chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Initialize drops
    for (let i = 0; i < Math.floor(width / 2); i++) {
      this.drops.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        speed: Math.random() * 2 + 1,
        length: Math.floor(Math.random() * 15) + 10
      });
    }
  }
  
  render() {
    const screen = Array(this.height).fill('').map(() => Array(this.width).fill(' '));
    
    for (const drop of this.drops) {
      for (let i = 0; i < drop.length; i++) {
        const y = Math.floor(drop.y - i);
        if (y >= 0 && y < this.height && drop.x >= 0 && drop.x < this.width) {
          const char = this.chars[Math.floor(Math.random() * this.chars.length)];
          screen[y][drop.x] = { char, brightness: 1 - (i / drop.length) };
        }
      }
      
      drop.y += drop.speed;
      if (drop.y > this.height + drop.length) {
        drop.y = 0;
        drop.x = Math.floor(Math.random() * this.width);
        drop.speed = Math.random() * 2 + 1;
      }
    }
    
    clearScreen();
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = screen[y][x];
        if (typeof cell === 'object') {
          const brightness = cell.brightness;
          if (brightness > 0.7) line += chalk.white(cell.char);
          else if (brightness > 0.4) line += chalk.green(cell.char);
          else line += chalk.hex('#004400')(cell.char);
        } else {
          line += ' ';
        }
      }
      console.log(line);
    }
  }
}

// Starfield animation
class Starfield {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.stars = [];
    
    for (let i = 0; i < 150; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random() * 2
      });
    }
  }
  
  render() {
    const screen = Array(this.height).fill('').map(() => Array(this.width).fill(' '));
    
    for (const star of this.stars) {
      star.z -= 0.02;
      if (star.z <= 0) {
        star.x = (Math.random() - 0.5) * 2;
        star.y = (Math.random() - 0.5) * 2;
        star.z = 2;
      }
      
      const sx = Math.floor((star.x / star.z) * (this.width / 2) + this.width / 2);
      const sy = Math.floor((star.y / star.z) * (this.height / 2) + this.height / 2);
      
      if (sx >= 0 && sx < this.width && sy >= 0 && sy < this.height) {
        const brightness = 1 - star.z / 2;
        const chars = ['.', '·', '*', '★', '✦'];
        const charIndex = Math.min(Math.floor(brightness * chars.length), chars.length - 1);
        screen[sy][sx] = { char: chars[charIndex], brightness };
      }
    }
    
    clearScreen();
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = screen[y][x];
        if (typeof cell === 'object') {
          if (cell.brightness > 0.8) line += chalk.white(cell.char);
          else if (cell.brightness > 0.5) line += chalk.cyan(cell.char);
          else line += chalk.blue(cell.char);
        } else {
          line += ' ';
        }
      }
      console.log(line);
    }
  }
}

// Plasma wave effect
class PlasmaWave {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
  }
  
  render() {
    clearScreen();
    const chars = ' ·:░▒▓█';
    
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const value = Math.sin(x / 8 + this.time) * Math.cos(y / 8 + this.time) * 
                      Math.sin((x + y) / 16 + this.time * 2);
        const normalized = (value + 1) / 2;
        const charIndex = Math.floor(normalized * (chars.length - 1));
        const char = chars[charIndex];
        
        // Color based on value
        const hue = (normalized * 360 + this.time * 50) % 360;
        if (normalized > 0.7) line += chalk.hex('#FF00FF')(char);
        else if (normalized > 0.5) line += chalk.hex('#00FFFF')(char);
        else if (normalized > 0.3) line += chalk.hex('#0088FF')(char);
        else line += chalk.hex('#004488')(char);
      }
      console.log(line);
    }
    
    this.time += 0.1;
  }
}

// DNA Helix animation
class DNAHelix {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
  }
  
  render() {
    clearScreen();
    const centerX = Math.floor(this.width / 2);
    
    for (let y = 0; y < this.height; y++) {
      const line = Array(this.width).fill(' ');
      
      const angle1 = (y / 3 + this.time) * Math.PI / 4;
      const angle2 = angle1 + Math.PI;
      
      const x1 = Math.floor(centerX + Math.sin(angle1) * (this.width / 6));
      const x2 = Math.floor(centerX + Math.sin(angle2) * (this.width / 6));
      
      if (x1 >= 0 && x1 < this.width) line[x1] = '●';
      if (x2 >= 0 && x2 < this.width) line[x2] = '●';
      
      // Draw connecting lines every few rows
      if (y % 3 === 0) {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        for (let x = minX + 1; x < maxX; x++) {
          if (x >= 0 && x < this.width) line[x] = '─';
        }
      }
      
      let coloredLine = '';
      for (let x = 0; x < this.width; x++) {
        if (line[x] === '●') {
          if (x < centerX) coloredLine += chalk.cyan(line[x]);
          else coloredLine += chalk.magenta(line[x]);
        } else if (line[x] === '─') {
          coloredLine += chalk.gray(line[x]);
        } else {
          coloredLine += line[x];
        }
      }
      console.log(coloredLine);
    }
    
    this.time += 0.2;
  }
}

// Rotating Cube animation
class RotatingCube {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.angleX = 0;
    this.angleY = 0;
    this.angleZ = 0;
  }
  
  project(x, y, z) {
    // Rotation
    const cosX = Math.cos(this.angleX), sinX = Math.sin(this.angleX);
    const cosY = Math.cos(this.angleY), sinY = Math.sin(this.angleY);
    const cosZ = Math.cos(this.angleZ), sinZ = Math.sin(this.angleZ);
    
    // Rotate around X
    let tempY = y * cosX - z * sinX;
    let tempZ = y * sinX + z * cosX;
    y = tempY;
    z = tempZ;
    
    // Rotate around Y
    let tempX = x * cosY + z * sinY;
    tempZ = -x * sinY + z * cosY;
    x = tempX;
    z = tempZ;
    
    // Rotate around Z
    tempX = x * cosZ - y * sinZ;
    tempY = x * sinZ + y * cosZ;
    x = tempX;
    y = tempY;
    
    // Perspective projection
    const scale = 20 / (z + 30);
    return {
      x: Math.floor(x * scale + this.width / 2),
      y: Math.floor(y * scale + this.height / 2),
      z: z
    };
  }
  
  render() {
    const screen = Array(this.height).fill('').map(() => 
      Array(this.width).fill({ char: ' ', depth: -Infinity })
    );
    
    const size = 10;
    const vertices = [
      [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
      [-size, -size, size], [size, -size, size], [size, size, size], [-size, size, size]
    ];
    
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    
    // Draw edges
    for (const [start, end] of edges) {
      const p1 = this.project(...vertices[start]);
      const p2 = this.project(...vertices[end]);
      
      // Simple line drawing
      const steps = 50;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = Math.floor(p1.x + (p2.x - p1.x) * t);
        const y = Math.floor(p1.y + (p2.y - p1.y) * t);
        const z = p1.z + (p2.z - p1.z) * t;
        
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          if (z > screen[y][x].depth) {
            const chars = ['·', '∘', '○', '◉', '●'];
            const charIndex = Math.min(Math.floor((z + 20) / 10), chars.length - 1);
            screen[y][x] = { char: chars[Math.max(0, charIndex)], depth: z };
          }
        }
      }
    }
    
    clearScreen();
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = screen[y][x];
        if (cell.depth > -Infinity) {
          const normalized = (cell.depth + 20) / 40;
          if (normalized > 0.6) line += chalk.cyan(cell.char);
          else if (normalized > 0.3) line += chalk.blue(cell.char);
          else line += chalk.hex('#004488')(cell.char);
        } else {
          line += ' ';
        }
      }
      console.log(line);
    }
    
    this.angleX += 0.03;
    this.angleY += 0.02;
    this.angleZ += 0.01;
  }
}

// Fire effect
class Fire {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.buffer = Array(height).fill(0).map(() => Array(width).fill(0));
  }
  
  render() {
    // Add fire at the bottom
    for (let x = 0; x < this.width; x++) {
      this.buffer[this.height - 1][x] = Math.random() > 0.3 ? 1 : 0;
    }
    
    // Propagate fire upwards
    for (let y = 0; y < this.height - 1; y++) {
      for (let x = 0; x < this.width; x++) {
        const left = x > 0 ? this.buffer[y + 1][x - 1] : 0;
        const center = this.buffer[y + 1][x];
        const right = x < this.width - 1 ? this.buffer[y + 1][x + 1] : 0;
        
        this.buffer[y][x] = ((left + center + right) / 3) * 0.95;
      }
    }
    
    clearScreen();
    const chars = ' .·:░▒▓█';
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const value = this.buffer[y][x];
        const charIndex = Math.floor(value * (chars.length - 1));
        const char = chars[Math.min(charIndex, chars.length - 1)];
        
        if (value > 0.8) line += chalk.white(char);
        else if (value > 0.6) line += chalk.yellow(char);
        else if (value > 0.3) line += chalk.hex('#FF6600')(char);
        else if (value > 0.1) line += chalk.red(char);
        else line += chalk.hex('#440000')(char);
      }
      console.log(line);
    }
  }
}

// Clear screen and set up
const clearScreen = () => {
  process.stdout.write('\x1b[2J\x1b[0f');
};

const hideCursor = () => {
  process.stdout.write('\x1b[?25l');
};

const showCursor = () => {
  process.stdout.write('\x1b[?25h');
};

// Get terminal dimensions
const getTerminalSize = () => {
  return {
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24
  };
};

// Remove ANSI codes for length calculation
const stripAnsi = (str) => {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
};

// Render the animation screen
const renderScreen = (blink = false, mode = 'login') => {
  clearScreen();
  const { width, height } = getTerminalSize();
  
  // Calculate positions
  const asciiLines = ASCII_ART.split('\n');
  const asciiWidth = Math.max(...asciiLines.map(line => line.length));
  const asciiHeight = asciiLines.length;
  
  const leftPadding = Math.max(2, Math.floor((width - asciiWidth - 30) / 2));
  const topPadding = Math.max(2, Math.floor((height - asciiHeight) / 2));
  
  // Top section
  const topLine = chalk.gray('~/Documents/LABS');
  console.log(topLine);
  console.log(chalk.white('🚀 ') + chalk.white('[REPLY] Cloud is there, Storm is coming!'));
  console.log();
  
  // Main content area
  for (let i = 0; i < topPadding; i++) {
    console.log();
  }
  
  // Render ASCII art on left, text on right
  let rightText;
  if (mode === 'screensaver') {
    rightText = [
      chalk.gray('... Cursor Agent'),
      blink ? chalk.green('Press any key to continue...') : chalk.green('Press any key to continue  ')
    ];
  } else {
    rightText = [
      chalk.gray('... Cursor Agent'),
      blink ? chalk.green('Press any key to sign in...') : chalk.green('Press any key to sign in  ')
    ];
  }
  
  for (let i = 0; i < asciiHeight; i++) {
    const line = asciiLines[i] || '';
    const padding = ' '.repeat(leftPadding);
    const asciiPart = chalk.gray(line);
    const rightPart = i < rightText.length ? rightText[i] : '';
    
    // Calculate spacing
    const asciiLen = line.length;
    const rightLen = stripAnsi(rightPart).length;
    const totalUsed = leftPadding + asciiLen + rightLen;
    const spacing = ' '.repeat(Math.max(5, width - totalUsed - 5));
    
    console.log(padding + asciiPart + spacing + rightPart);
  }
  
  // Bottom padding
  const remainingHeight = height - topPadding - asciiHeight - 5;
  for (let i = 0; i < remainingHeight; i++) {
    console.log();
  }
};

// Screensaver mode with new animations
const screensaverMode = (animationType = 'matrix') => {
  hideCursor();
  
  const { width, height } = getTerminalSize();
  let animation;
  
  // Select animation based on type
  switch(animationType) {
    case 'matrix':
      animation = new MatrixRain(width, height);
      break;
    case 'starfield':
    case 'stars':
      animation = new Starfield(width, height);
      break;
    case 'plasma':
    case 'wave':
      animation = new PlasmaWave(width, height);
      break;
    case 'dna':
    case 'helix':
      animation = new DNAHelix(width, height);
      break;
    case 'cube':
    case 'rotate':
      animation = new RotatingCube(width, height);
      break;
    case 'fire':
      animation = new Fire(width, height);
      break;
    default:
      animation = new MatrixRain(width, height);
  }
  
  // Animation loop
  const animationInterval = setInterval(() => {
    animation.render();
  }, 1000 / 30); // 30 FPS
  
  // Set up raw mode for keypress detection
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  // Handle keypress - exit cleanly
  const cleanup = () => {
    clearInterval(animationInterval);
    showCursor();
    clearScreen();
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    process.exit(0);
  };
  
  process.stdin.on('data', (key) => {
    // Handle Ctrl+C
    if (key === '\u0003') {
      cleanup();
    }
    // Handle any other key
    cleanup();
  });
  
  // Handle exit
  process.on('SIGINT', cleanup);
};

// Login mode - original behavior with sign-in simulation
const loginMode = () => {
  hideCursor();
  
  // Initial render
  renderScreen(false, 'login');
  
  // Blink animation for "Press any key to sign in..."
  let blinkState = false;
  const blinkInterval = setInterval(() => {
    blinkState = !blinkState;
    renderScreen(blinkState, 'login');
  }, 500);
  
  // Set up raw mode for keypress detection
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  // Handle keypress
  const handleKeypress = () => {
    clearInterval(blinkInterval);
    showCursor();
    clearScreen();
    
    // Simulate login process
    console.log(chalk.green('✓ Signing in...'));
    console.log();
    
    setTimeout(() => {
      console.log(chalk.green('✓ Successfully signed in!'));
      console.log(chalk.gray('Welcome to Cursor Agent'));
      console.log();
      
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.exit(0);
    }, 1000);
  };
  
  process.stdin.on('data', (key) => {
    // Handle Ctrl+C
    if (key === '\u0003') {
      clearInterval(blinkInterval);
      showCursor();
      clearScreen();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
      process.exit(0);
    }
    // Handle any other key
    handleKeypress();
  });
  
  // Handle exit
  process.on('SIGINT', () => {
    clearInterval(blinkInterval);
    showCursor();
    clearScreen();
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    process.exit(0);
  });
};

// Main function - check command line arguments
const main = () => {
  const args = process.argv.slice(2);
  const mode = args[0] || 'login';
  const animationType = args[1] || 'matrix';
  
  // Animation types
  const validAnimations = ['matrix', 'starfield', 'stars', 'plasma', 'wave', 'dna', 'helix', 'cube', 'rotate', 'fire'];
  
  if (mode === 'login') {
    loginMode();
  } else if (validAnimations.includes(mode)) {
    // Direct animation mode (e.g., "node index.js matrix")
    screensaverMode(mode);
  } else if (mode === 'help' || mode === '--help' || mode === '-h') {
    console.log(chalk.cyan.bold('╔════════════════════════════════════════════════════════════╗'));
    console.log(chalk.cyan.bold('║') + chalk.white.bold('          🎨 Cool Terminal Animations 🎨                  ') + chalk.cyan.bold('║'));
    console.log(chalk.cyan.bold('╚════════════════════════════════════════════════════════════╝'));
    console.log('');
    console.log(chalk.yellow('Usage:'));
    console.log('  node index.js [animation]');
    console.log('');
    console.log(chalk.yellow('Available Animations:'));
    console.log('  ' + chalk.green('matrix     ') + ' - Matrix-style falling characters (green rain)');
    console.log('  ' + chalk.cyan('starfield  ') + ' - Flying through space at warp speed');
    console.log('  ' + chalk.magenta('plasma     ') + ' - Mesmerizing plasma wave effects');
    console.log('  ' + chalk.blue('dna        ') + ' - Rotating DNA double helix');
    console.log('  ' + chalk.cyan('cube       ') + ' - 3D rotating wireframe cube');
    console.log('  ' + chalk.red('fire       ') + ' - Realistic fire effect');
    console.log('  ' + chalk.gray('login      ') + ' - Cursor-agent style login screen');
    console.log('');
    console.log(chalk.yellow('Examples:'));
    console.log('  node index.js matrix       ' + chalk.gray('# Run Matrix rain animation'));
    console.log('  node index.js starfield    ' + chalk.gray('# Run starfield animation'));
    console.log('  node index.js fire         ' + chalk.gray('# Run fire animation'));
    console.log('');
    console.log(chalk.gray('Press any key to exit any animation'));
    console.log('');
  } else {
    console.log(chalk.red('Unknown animation: ') + mode);
    console.log(chalk.yellow('Run ') + chalk.white('node index.js help') + chalk.yellow(' to see available animations'));
    process.exit(1);
  }
};

// Run the animation
main();

