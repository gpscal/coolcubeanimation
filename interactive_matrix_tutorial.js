#!/usr/bin/env node

import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Store the code being built
let codeParts = {
  imports: '',
  classStart: '',
  constructor: '',
  renderStart: '',
  renderDrops: '',
  renderDisplay: '',
  animationLoop: '',
  complete: ''
};

let currentStep = 0;
let userCode = {
  width: '',
  height: '',
  chars: '',
  dropsLoop: '',
  screenCreation: '',
  dropDrawing: '',
  dropMovement: '',
  colorSelection: ''
};

const steps = [
  {
    title: "🎯 Welcome! Let's Build Matrix Rain Together!",
    explanation: `Hi there! I'm your coding tutor, and we're going to build an awesome Matrix rain animation step by step!\n\nThink of this like building with LEGO blocks - we'll add one piece at a time until we have something amazing!\n\nReady? Let's start!`,
    type: 'intro'
  },
  {
    title: "Step 1: Setting Up Our Tools",
    explanation: `First, we need to import some tools (called "modules") that help us:\n- chalk - for adding colors to our text\n- readline - for reading user input (we're using it now!)\n\nLet's start by creating the basic structure.`,
    codeHint: `import chalk from 'chalk';\nimport readline from 'readline';`,
    expected: 'import',
    type: 'code'
  },
  {
    title: "Step 2: Creating the Class Blueprint",
    explanation: `A "class" is like a blueprint or cookie cutter. We'll use it to create our Matrix rain animation.\n\nWe need to start our class definition.`,
    codeHint: `class MatrixRain {\n  constructor(width, height) {`,
    expected: 'class',
    type: 'code'
  },
  {
    title: "Step 3: Storing the Screen Size",
    explanation: `We need to remember how big our screen is so we know where to draw things!\n\nInside the constructor, we'll save the width and height.`,
    question: "What should we store the width in? (Hint: use 'this.width')",
    expected: 'this.width',
    codeHint: `    this.width = width;\n    this.height = height;`,
    type: 'fill'
  },
  {
    title: "Step 4: Creating Our Character Set",
    explanation: `We need a collection of characters to show in our rain! These can be letters, numbers, or special symbols.\n\nLet's create a string with all the characters we want to use.`,
    question: "What variable name should we use to store our characters? (Hint: 'chars')",
    expected: 'chars',
    codeHint: `    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';`,
    type: 'fill'
  },
  {
    title: "Step 5: Making a List for Rain Drops",
    explanation: `We need somewhere to store all our rain drops! An array (like a list) is perfect for this.\n\nLet's create an empty array called 'drops'.`,
    question: "How do we create an empty array? (Hint: use '[]')",
    expected: '[]',
    codeHint: `    this.drops = [];`,
    type: 'fill'
  },
  {
    title: "Step 6: Creating Multiple Rain Drops",
    explanation: `Now we'll create lots of rain drops! We'll use a loop to make many drops, each starting at a random position.\n\nA 'for' loop repeats code multiple times.`,
    question: "How many drops should we create? (Hint: about half the width)",
    expected: 'width / 2',
    codeHint: `    for (let i = 0; i < Math.floor(width / 2); i++) {`,
    type: 'fill'
  },
  {
    title: "Step 7: Giving Each Drop Properties",
    explanation: `Each rain drop needs:\n- x: horizontal position (left to right)\n- y: vertical position (top to bottom)\n- speed: how fast it falls\n- length: how many characters tall it is\n\nWe'll use random numbers to make each drop unique!`,
    question: "How do we get a random number between 0 and width? (Hint: Math.random() * width)",
    expected: 'Math.random()',
    codeHint: `      this.drops.push({\n        x: Math.floor(Math.random() * width),\n        y: Math.floor(Math.random() * height),\n        speed: Math.random() * 2 + 1,\n        length: Math.floor(Math.random() * 15) + 10\n      });`,
    type: 'fill'
  },
  {
    title: "Step 8: Creating the Render Method",
    explanation: `The 'render' method is like an artist drawing a picture. It draws one frame of our animation.\n\nLet's start the render method!`,
    codeHint: `  render() {`,
    expected: 'render',
    type: 'code'
  },
  {
    title: "Step 9: Creating an Empty Screen",
    explanation: `Before we draw, we need a blank canvas! We'll create a 2D array (like a grid) filled with empty spaces.\n\nThink of it like getting a fresh piece of graph paper.`,
    question: "How do we create an array with 'height' rows? (Hint: Array(height))",
    expected: 'Array',
    codeHint: `    const screen = Array(this.height).fill('').map(() => Array(this.width).fill(' '));`,
    type: 'fill'
  },
  {
    title: "Step 10: Drawing Each Rain Drop",
    explanation: `Now we'll go through each drop and draw it! Each drop is actually a column of characters.\n\nThe top character is bright, and they get darker as we go down.`,
    question: "How do we loop through each drop? (Hint: for...of)",
    expected: 'for',
    codeHint: `    for (const drop of this.drops) {`,
    type: 'fill'
  },
  {
    title: "Step 11: Drawing Characters in Each Drop",
    explanation: `Each drop has multiple characters stacked on top of each other. We need to draw each one!\n\nWe'll use a loop to draw from the top (bright) to the bottom (dark).`,
    question: "How do we loop from 0 to drop.length? (Hint: for loop with i)",
    expected: 'for',
    codeHint: `      for (let i = 0; i < drop.length; i++) {`,
    type: 'fill'
  },
  {
    title: "Step 12: Calculating Character Position",
    explanation: `We need to figure out where each character should be drawn on the screen.\n\nThe 'y' position goes up as 'i' increases (because we're drawing upward from the drop's position).`,
    question: "How do we calculate the y position? (Hint: drop.y - i)",
    expected: 'drop.y - i',
    codeHint: `        const y = Math.floor(drop.y - i);`,
    type: 'fill'
  },
  {
    title: "Step 13: Checking Bounds",
    explanation: `We need to make sure we're drawing on the screen, not outside it!\n\nThis is called "bounds checking" - like making sure you color inside the lines.`,
    question: "How do we check if y is between 0 and height? (Hint: y >= 0 && y < height)",
    expected: '>=',
    codeHint: `        if (y >= 0 && y < this.height && drop.x >= 0 && drop.x < this.width) {`,
    type: 'fill'
  },
  {
    title: "Step 14: Picking a Random Character",
    explanation: `For each position, we'll pick a random character from our character set!\n\nThis makes the rain look more interesting and varied.`,
    question: "How do we get a random character? (Hint: this.chars[random index])",
    expected: 'this.chars',
    codeHint: `          const char = this.chars[Math.floor(Math.random() * this.chars.length)];`,
    type: 'fill'
  },
  {
    title: "Step 15: Calculating Brightness",
    explanation: `We want the top of each drop to be bright (white) and the bottom to be dark (green).\n\nBrightness goes from 1.0 (brightest) to 0.0 (darkest).`,
    question: "How do we calculate brightness? (Hint: 1 - (i / drop.length))",
    expected: '1 -',
    codeHint: `          const brightness = 1 - (i / drop.length);`,
    type: 'fill'
  },
  {
    title: "Step 16: Storing the Character",
    explanation: `Now we'll save the character and its brightness in our screen grid.\n\nThis way we can draw it with the right color later!`,
    question: "How do we store it in the screen? (Hint: screen[y][drop.x] = ...)",
    expected: 'screen[y]',
    codeHint: `          screen[y][drop.x] = { char, brightness };`,
    type: 'fill'
  },
  {
    title: "Step 17: Moving the Drop Down",
    explanation: `After drawing the drop, we need to move it down so it looks like it's falling!\n\nWe add the speed to the y position.`,
    question: "How do we move the drop down? (Hint: drop.y += drop.speed)",
    expected: 'drop.y +=',
    codeHint: `      drop.y += drop.speed;`,
    type: 'fill'
  },
  {
    title: "Step 18: Resetting Drops That Fall Off",
    explanation: `When a drop falls off the bottom of the screen, we should move it back to the top!\n\nThis makes the rain continuous and never-ending.`,
    question: "How do we check if drop fell off? (Hint: drop.y > height + length)",
    expected: 'drop.y >',
    codeHint: `      if (drop.y > this.height + drop.length) {\n        drop.y = 0;\n        drop.x = Math.floor(Math.random() * this.width);\n        drop.speed = Math.random() * 2 + 1;\n      }`,
    type: 'fill'
  },
  {
    title: "Step 19: Clearing the Screen",
    explanation: `Before we draw the new frame, we need to erase the old one!\n\nOtherwise, we'd see all the old frames stacked on top of each other.`,
    question: "What function clears the screen? (Hint: clearScreen())",
    expected: 'clearScreen',
    codeHint: `    clearScreen();`,
    type: 'fill'
  },
  {
    title: "Step 20: Drawing Each Row",
    explanation: `Now we'll go through each row of our screen and draw it!\n\nWe'll build a line of text for each row.`,
    question: "How do we loop through rows? (Hint: for loop with y from 0 to height)",
    expected: 'for',
    codeHint: `    for (let y = 0; y < this.height; y++) {`,
    type: 'fill'
  },
  {
    title: "Step 21: Building Each Line",
    explanation: `For each row, we'll go through each column and add characters to build a line.\n\nWe start with an empty string and add characters one by one.`,
    question: "How do we start with an empty line? (Hint: let line = '')",
    expected: "let line = ''",
    codeHint: `      let line = '';`,
    type: 'fill'
  },
  {
    title: "Step 22: Going Through Each Column",
    explanation: `Now we'll look at each position in the row and decide what to draw there.\n\nWe'll check if there's a character or if it's empty.`,
    question: "How do we loop through columns? (Hint: for loop with x from 0 to width)",
    expected: 'for',
    codeHint: `      for (let x = 0; x < this.width; x++) {`,
    type: 'fill'
  },
  {
    title: "Step 23: Checking What's in Each Cell",
    explanation: `We need to check what's stored in each cell of our screen.\n\nIf it's an object, there's a character to draw. If it's a space, we draw nothing.`,
    question: "How do we check if it's an object? (Hint: typeof cell === 'object')",
    expected: 'typeof',
    codeHint: `        const cell = screen[y][x];\n        if (typeof cell === 'object') {`,
    type: 'fill'
  },
  {
    title: "Step 24: Choosing Colors Based on Brightness",
    explanation: `Now we'll color the character based on how bright it should be!\n\n- Very bright (> 0.7) = white\n- Medium bright (> 0.4) = green\n- Dark = dark green`,
    question: "How do we check if brightness > 0.7? (Hint: if (brightness > 0.7))",
    expected: 'brightness > 0.7',
    codeHint: `          const brightness = cell.brightness;\n          if (brightness > 0.7) {\n            line += chalk.white(cell.char);\n          } else if (brightness > 0.4) {\n            line += chalk.green(cell.char);\n          } else {\n            line += chalk.hex('#004400')(cell.char);\n          }`,
    type: 'fill'
  },
  {
    title: "Step 25: Displaying the Line",
    explanation: `After building the line with all its colored characters, we print it to the screen!\n\nconsole.log() displays text in the terminal.`,
    question: "How do we print the line? (Hint: console.log(line))",
    expected: 'console.log',
    codeHint: `        } else {\n          line += ' ';\n        }\n      }\n      console.log(line);\n    }\n  }\n}`,
    type: 'fill'
  },
  {
    title: "🎉 Congratulations! You Built It!",
    explanation: `Amazing work! You've built a complete Matrix rain animation!\n\nNow let's see it in action. The code will run and you'll see your beautiful Matrix rain falling!\n\nPress Ctrl+C to stop it when you're done watching.`,
    type: 'complete'
  }
];

function clearScreen() {
  process.stdout.write('\x1b[2J\x1b[0f');
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showStep(stepIndex) {
  const step = steps[stepIndex];
  clearScreen();
  
  console.log(chalk.cyan.bold('\n╔' + '═'.repeat(70) + '╗'));
  console.log(chalk.cyan.bold('║') + chalk.white.bold(` ${step.title.padEnd(69)} `) + chalk.cyan.bold('║'));
  console.log(chalk.cyan.bold('╚' + '═'.repeat(70) + '╝\n'));
  
  console.log(chalk.yellow('📚 Explanation:'));
  console.log(chalk.white(step.explanation));
  console.log();
  
  if (step.type === 'intro') {
    console.log(chalk.green('Press Enter to continue...'));
    await question('');
    return true;
  }
  
  if (step.type === 'code') {
    console.log(chalk.cyan('💡 Here\'s what the code should look like:'));
    console.log(chalk.gray(step.codeHint));
    console.log();
    console.log(chalk.green('Press Enter when you understand this step...'));
    await question('');
    return true;
  }
  
  if (step.type === 'fill') {
    console.log(chalk.cyan('💡 Hint:'));
    console.log(chalk.gray(step.codeHint));
    console.log();
    
    if (step.question) {
      console.log(chalk.yellow(`❓ ${step.question}`));
      const answer = await question(chalk.green('Your answer: '));
      
      const normalizedAnswer = answer.trim().toLowerCase();
      const normalizedExpected = step.expected.toLowerCase();
      
      // Check if answer contains expected keywords
      let isCorrect = false;
      if (normalizedExpected.includes('math.random')) {
        isCorrect = normalizedAnswer.includes('random');
      } else if (normalizedExpected.includes('this.width')) {
        isCorrect = normalizedAnswer.includes('width') || normalizedAnswer.includes('this.width');
      } else if (normalizedExpected.includes('chars')) {
        isCorrect = normalizedAnswer.includes('char');
      } else if (normalizedExpected.includes('[]')) {
        isCorrect = normalizedAnswer.includes('[]') || normalizedAnswer.includes('array');
      } else if (normalizedExpected.includes('width / 2')) {
        isCorrect = normalizedAnswer.includes('width') && (normalizedAnswer.includes('2') || normalizedAnswer.includes('half'));
      } else if (normalizedExpected.includes('drop.y - i')) {
        isCorrect = normalizedAnswer.includes('drop.y') || normalizedAnswer.includes('y -');
      } else if (normalizedExpected.includes('>=')) {
        isCorrect = normalizedAnswer.includes('>=') || normalizedAnswer.includes('greater') || normalizedAnswer.includes('check');
      } else if (normalizedExpected.includes('this.chars')) {
        isCorrect = normalizedAnswer.includes('char');
      } else if (normalizedExpected.includes('1 -')) {
        isCorrect = normalizedAnswer.includes('1') && (normalizedAnswer.includes('-') || normalizedAnswer.includes('brightness'));
      } else if (normalizedExpected.includes('screen[y]')) {
        isCorrect = normalizedAnswer.includes('screen');
      } else if (normalizedExpected.includes('drop.y +=')) {
        isCorrect = normalizedAnswer.includes('drop.y') || normalizedAnswer.includes('speed');
      } else if (normalizedExpected.includes('drop.y >')) {
        isCorrect = normalizedAnswer.includes('drop.y') || normalizedAnswer.includes('height');
      } else if (normalizedExpected.includes('clearScreen')) {
        isCorrect = normalizedAnswer.includes('clear');
      } else if (normalizedExpected.includes('let line =')) {
        isCorrect = normalizedAnswer.includes('line') || normalizedAnswer.includes('string');
      } else if (normalizedExpected.includes('typeof')) {
        isCorrect = normalizedAnswer.includes('typeof') || normalizedAnswer.includes('object');
      } else if (normalizedExpected.includes('brightness > 0.7')) {
        isCorrect = normalizedAnswer.includes('brightness') || normalizedAnswer.includes('0.7');
      } else if (normalizedExpected.includes('console.log')) {
        isCorrect = normalizedAnswer.includes('console') || normalizedAnswer.includes('log') || normalizedAnswer.includes('print');
      } else {
        isCorrect = normalizedAnswer.includes(normalizedExpected);
      }
      
      if (isCorrect) {
        console.log(chalk.green('\n✅ Great job! You got it right!'));
        await sleep(1500);
      } else {
        console.log(chalk.yellow(`\n💡 Close! The answer involves: ${step.expected}`));
        console.log(chalk.gray('Don\'t worry, let\'s continue anyway!'));
        await sleep(2000);
      }
    }
    
    console.log();
    console.log(chalk.green('Press Enter to continue to the next step...'));
    await question('');
    return true;
  }
  
  if (step.type === 'complete') {
    console.log(chalk.green('Press Enter to see your animation in action!'));
    await question('');
    return false; // Don't continue, we'll run the animation
  }
  
  return true;
}

// Complete MatrixRain class for running
class MatrixRain {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.drops = [];
    this.chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
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

function getTerminalSize() {
  return {
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24
  };
}

async function runAnimation() {
  clearScreen();
  console.log(chalk.green.bold('\n🎬 Running your Matrix Rain Animation!\n'));
  console.log(chalk.yellow('Press Ctrl+C to stop\n'));
  await sleep(2000);
  
  const { width, height } = getTerminalSize();
  const animation = new MatrixRain(width, height);
  
  const animationInterval = setInterval(() => {
    animation.render();
  }, 1000 / 30);
  
  // Handle exit
  const cleanup = () => {
    clearInterval(animationInterval);
    clearScreen();
    console.log(chalk.green('\n✨ Great job completing the tutorial!\n'));
    console.log(chalk.cyan('You now know how to build a Matrix rain animation!'));
    console.log(chalk.yellow('\nTry modifying the code to make it your own!'));
    rl.close();
    process.exit(0);
  };
  
  process.on('SIGINT', cleanup);
  
  // Also allow Enter to exit
  rl.on('line', () => {
    cleanup();
  });
}

async function main() {
  console.log(chalk.cyan.bold('\n╔══════════════════════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan.bold('║') + chalk.white.bold('     🌧️  Interactive Matrix Rain Tutorial - Your Personal Coding Tutor!     ') + chalk.cyan.bold('║'));
  console.log(chalk.cyan.bold('╚══════════════════════════════════════════════════════════════════════════╝\n'));
  
  await sleep(1000);
  
  for (let i = 0; i < steps.length; i++) {
    const shouldContinue = await showStep(i);
    if (!shouldContinue) {
      break;
    }
  }
  
  await runAnimation();
}

main().catch(console.error);
