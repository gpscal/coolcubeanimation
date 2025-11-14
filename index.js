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

// Screensaver mode - just shows animation and exits on keypress
const screensaverMode = () => {
  hideCursor();
  
  // Initial render
  renderScreen(false, 'screensaver');
  
  // Blink animation
  let blinkState = false;
  const blinkInterval = setInterval(() => {
    blinkState = !blinkState;
    renderScreen(blinkState, 'screensaver');
  }, 500);
  
  // Set up raw mode for keypress detection
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  
  // Handle keypress - just exit cleanly
  const handleKeypress = () => {
    clearInterval(blinkInterval);
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
  
  if (mode === 'screensaver' || mode === 'ss' || mode === 'clear') {
    screensaverMode();
  } else if (mode === 'login') {
    loginMode();
  } else {
    console.log(chalk.yellow('Usage:'));
    console.log('  node index.js [mode]');
    console.log('');
    console.log('Modes:');
    console.log('  login       - Login mode with sign-in simulation (default)');
    console.log('  screensaver - Screensaver mode, exits on any keypress');
    console.log('  ss          - Short alias for screensaver');
    console.log('  clear       - Short alias for screensaver');
    process.exit(0);
  }
};

// Run the animation
main();

