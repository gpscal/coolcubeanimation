#!/usr/bin/env node

import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const JimpModule = require('jimp');
// Jimp 1.x exports Jimp class as Jimp.Jimp
const Jimp = JimpModule.Jimp || JimpModule.default || JimpModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// Flying Plane with Space/Clouds Background
class FlyingPlane {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
    
    // Plane position and movement
    this.planeX = width / 2;
    this.planeY = height / 2;
    this.planeVelX = 0;
    this.planeVelY = 0;
    this.planeAngle = 0;
    
    // Smoke trail
    this.smokeTrail = [];
    this.maxSmokeParticles = 20;
    
    // Background layers for parallax
    this.stars = [];
    this.clouds = [];
    this.particles = [];
    
    // Initialize stars (far background)
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.2 + Math.random() * 0.3,
        char: Math.random() > 0.5 ? '·' : '*',
        brightness: Math.random()
      });
    }
    
    // Initialize clouds (middle layer)
    for (let i = 0; i < 15; i++) {
      this.clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 0.5,
        size: 3 + Math.floor(Math.random() * 5),
        density: Math.random(),
        chars: ['░', '▒', '▓']
      });
    }
    
    // Initialize particles (near layer)
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 1.5,
        char: ['◦', '○', '●', '◉'][Math.floor(Math.random() * 4)]
      });
    }
  }
  
  updatePlane() {
    // Smooth figure-8 movement pattern
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radiusX = this.width / 4;
    const radiusY = this.height / 6;
    
    // Figure-8 pattern
    this.planeX = centerX + Math.sin(this.time * 0.5) * radiusX;
    this.planeY = centerY + Math.sin(this.time * 1) * radiusY;
    
    // Calculate angle based on movement direction
    const prevX = centerX + Math.sin((this.time - 0.1) * 0.5) * radiusX;
    const prevY = centerY + Math.sin((this.time - 0.1) * 1) * radiusY;
    this.planeAngle = Math.atan2(this.planeY - prevY, this.planeX - prevX);
    
    // Add smoke particle
    if (this.smokeTrail.length < this.maxSmokeParticles) {
      this.smokeTrail.push({
        x: this.planeX - Math.cos(this.planeAngle) * 3,
        y: this.planeY - Math.sin(this.planeAngle) * 1,
        life: 1.0,
        size: 2
      });
    }
    
    // Update smoke trail
    this.smokeTrail = this.smokeTrail.filter(smoke => {
      smoke.life -= 0.05;
      smoke.y += 0.2; // Smoke rises slightly
      smoke.x += (Math.random() - 0.5) * 0.3; // Random drift
      smoke.size = Math.max(1, smoke.size - 0.05);
      return smoke.life > 0;
    });
  }
  
  updateBackground() {
    // Update stars
    this.stars.forEach(star => {
      star.x -= star.speed;
      if (star.x < 0) {
        star.x = this.width;
        star.y = Math.random() * this.height;
      }
      star.brightness = 0.3 + Math.sin(this.time * 2 + star.x) * 0.3;
    });
    
    // Update clouds
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed;
      if (cloud.x + cloud.size < 0) {
        cloud.x = this.width;
        cloud.y = Math.random() * this.height;
      }
    });
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x -= particle.speed;
      if (particle.x < 0) {
        particle.x = this.width;
        particle.y = Math.random() * this.height;
      }
    });
  }
  
  render() {
    const screen = Array(this.height).fill('').map(() => 
      Array(this.width).fill({ char: ' ', layer: 0, color: null })
    );
    
    // Draw stars (layer 1)
    this.stars.forEach(star => {
      const x = Math.floor(star.x);
      const y = Math.floor(star.y);
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        screen[y][x] = {
          char: star.char,
          layer: 1,
          color: star.brightness > 0.5 ? 'white' : 'gray'
        };
      }
    });
    
    // Draw clouds (layer 2)
    this.clouds.forEach(cloud => {
      const chars = cloud.chars;
      for (let i = 0; i < cloud.size; i++) {
        const x = Math.floor(cloud.x + i);
        const y = Math.floor(cloud.y);
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          const charIndex = Math.floor(cloud.density * chars.length);
          if (screen[y][x].layer <= 2) {
            screen[y][x] = {
              char: chars[Math.min(charIndex, chars.length - 1)],
              layer: 2,
              color: 'cloud'
            };
          }
        }
      }
    });
    
    // Draw particles (layer 3)
    this.particles.forEach(particle => {
      const x = Math.floor(particle.x);
      const y = Math.floor(particle.y);
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        if (screen[y][x].layer <= 3) {
          screen[y][x] = {
            char: particle.char,
            layer: 3,
            color: 'particle'
          };
        }
      }
    });
    
    // Draw smoke trail (layer 4)
    this.smokeTrail.forEach(smoke => {
      const x = Math.floor(smoke.x);
      const y = Math.floor(smoke.y);
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        const smokeChars = ['·', '∘', '○', '◦'];
        const charIndex = Math.floor((1 - smoke.life) * smokeChars.length);
        if (screen[y][x].layer <= 4) {
          screen[y][x] = {
            char: smokeChars[Math.min(charIndex, smokeChars.length - 1)],
            layer: 4,
            color: smoke.life > 0.5 ? 'white' : 'gray'
          };
        }
      }
    });
    
    // Draw airplane (layer 5) - ASCII representation
    const planeArt = [
      '    ▄█▄    ',
      '  ▄█████▄  ',
      '▀▀███████▀▀',
      '    ▀█▀    '
    ];
    
    // Simplified plane for center display
    const simplePlane = ['◢█◣', '◥▼◤'];
    const px = Math.floor(this.planeX);
    const py = Math.floor(this.planeY);
    
    // Draw simple plane
    for (let row = 0; row < simplePlane.length; row++) {
      const line = simplePlane[row];
      for (let col = 0; col < line.length; col++) {
        const x = px - Math.floor(line.length / 2) + col;
        const y = py - Math.floor(simplePlane.length / 2) + row;
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          if (line[col] !== ' ') {
            screen[y][x] = {
              char: line[col],
              layer: 5,
              color: 'plane'
            };
          }
        }
      }
    }
    
    // Update animation state
    this.updatePlane();
    this.updateBackground();
    this.time += 0.1;
    
    // Render to console
    clearScreen();
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = screen[y][x];
        const char = cell.char;
        
        // Apply colors based on layer and type
        switch(cell.color) {
          case 'plane':
            line += chalk.cyan.bold(char);
            break;
          case 'white':
            line += chalk.white(char);
            break;
          case 'gray':
            line += chalk.gray(char);
            break;
          case 'cloud':
            line += chalk.hex('#4a5568')(char);
            break;
          case 'particle':
            line += chalk.hex('#00ff00')(char);
            break;
          default:
            line += char;
        }
      }
      console.log(line);
    }
  }
}

// Plane Screensaver with Aerospace.png image
class PlaneScreensaver {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.time = 0;
    this.planeAscii = null;
    this.planeWidth = 0;
    this.planeHeight = 0;
    this.planeLoaded = false;
    
    // Plane position (centered with subtle movement)
    this.planeX = width / 2;
    this.planeY = height / 2;
    this.offsetX = 0;
    this.offsetY = 0;
    
    // Matrix rain
    this.matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    this.matrixDrops = [];
    const fontSize = 1; // Character-based, so 1 char = 1 position
    const columns = width;
    
    for (let i = 0; i < Math.floor(columns / 2); i++) {
      this.matrixDrops.push({
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * -height),
        speed: Math.random() * 0.5 + 0.3,
        length: Math.floor(Math.random() * 15) + 10
      });
    }
    
    // Stars for space background
    this.stars = [];
    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        speed: Math.random() * 0.3 + 0.1,
        brightness: Math.random()
      });
    }
    
    // Clouds
    this.clouds = [];
    for (let i = 0; i < 10; i++) {
      this.clouds.push({
        x: Math.random() * width,
        y: Math.random() * height,
        width: Math.floor(Math.random() * 15) + 5,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    // Load plane image
    this.loadPlaneImage();
  }
  
  async loadPlaneImage() {
    try {
      const imagePath = join(__dirname, 'Aerospace.png');
      // Use file path directly (works with jimp 1.x)
      const image = await Jimp.read(imagePath);
      
      // Resize to fit terminal (max 40 chars wide)
      const maxWidth = Math.min(40, Math.floor(this.width * 0.3));
      const aspectRatio = image.bitmap.height / image.bitmap.width;
      const maxHeight = Math.floor(maxWidth * aspectRatio);
      
      // Manual resize by sampling pixels (avoid jimp resize API issues)
      if (image.bitmap.width > maxWidth) {
        const scale = maxWidth / image.bitmap.width;
        const newWidth = maxWidth;
        const newHeight = Math.floor(image.bitmap.height * scale);
        
        // Create new image data by sampling
        const originalData = image.bitmap.data;
        const newData = Buffer.alloc(newWidth * newHeight * 4);
        
        for (let y = 0; y < newHeight; y++) {
          for (let x = 0; x < newWidth; x++) {
            const origX = Math.floor(x / scale);
            const origY = Math.floor(y / scale);
            const origIdx = (origY * image.bitmap.width + origX) * 4;
            const newIdx = (y * newWidth + x) * 4;
            
            if (origIdx < originalData.length && newIdx < newData.length) {
              newData[newIdx] = originalData[origIdx];
              newData[newIdx + 1] = originalData[origIdx + 1];
              newData[newIdx + 2] = originalData[origIdx + 2];
              newData[newIdx + 3] = originalData[origIdx + 3];
            }
          }
        }
        
        image.bitmap.width = newWidth;
        image.bitmap.height = newHeight;
        image.bitmap.data = newData;
      }
      
      // Convert to ASCII
      const asciiChars = ' .:░▒▓█';
      this.planeAscii = [];
      this.planeWidth = image.bitmap.width;
      this.planeHeight = image.bitmap.height;
      
      for (let y = 0; y < image.bitmap.height; y++) {
        let line = '';
        for (let x = 0; x < image.bitmap.width; x++) {
          const idx = (y * image.bitmap.width + x) * 4;
          const r = image.bitmap.data[idx];
          const g = image.bitmap.data[idx + 1];
          const b = image.bitmap.data[idx + 2];
          const a = image.bitmap.data[idx + 3];
          
          // Calculate brightness
          const brightness = (r + g + b) / 3 / 255;
          const charIndex = Math.floor(brightness * (asciiChars.length - 1));
          const char = asciiChars[charIndex];
          
          // Store color info
          this.planeAscii.push({
            char,
            r, g, b, a,
            brightness
          });
        }
      }
      
      this.planeLoaded = true;
    } catch (error) {
      console.error('Error loading plane image:', error.message);
      // Fallback to simple ASCII plane
      this.planeAscii = [
        { char: '◢', r: 0, g: 200, b: 255, brightness: 0.8 },
        { char: '█', r: 0, g: 200, b: 255, brightness: 0.9 },
        { char: '◣', r: 0, g: 200, b: 255, brightness: 0.8 }
      ];
      this.planeWidth = 3;
      this.planeHeight = 1;
      this.planeLoaded = true;
    }
  }
  
  updatePlane() {
    // Subtle figure-8 movement
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radiusX = 5;
    const radiusY = 3;
    
    this.offsetX = Math.sin(this.time * 0.5) * radiusX;
    this.offsetY = Math.sin(this.time * 1) * radiusY;
    this.planeX = centerX + this.offsetX;
    this.planeY = centerY + this.offsetY;
  }
  
  updateBackground() {
    // Update Matrix drops
    this.matrixDrops.forEach(drop => {
      drop.y += drop.speed;
      if (drop.y > this.height + drop.length) {
        drop.y = Math.random() * -this.height;
        drop.x = Math.floor(Math.random() * this.width);
        drop.speed = Math.random() * 0.5 + 0.3;
      }
    });
    
    // Update stars
    this.stars.forEach(star => {
      star.z -= star.speed;
      if (star.z <= 0) {
        star.z = 1000;
        star.x = Math.random() * this.width;
        star.y = Math.random() * this.height;
      }
      star.brightness = 0.3 + Math.sin(this.time * 2 + star.x) * 0.3;
    });
    
    // Update clouds
    this.clouds.forEach(cloud => {
      cloud.x -= cloud.speed;
      if (cloud.x + cloud.width < 0) {
        cloud.x = this.width;
        cloud.y = Math.random() * this.height;
      }
    });
  }
  
  render() {
    if (!this.planeLoaded) {
      // Show loading message
      clearScreen();
      console.log(chalk.green('Loading plane image...'));
      return;
    }
    
    const screen = Array(this.height).fill('').map(() => 
      Array(this.width).fill({ char: ' ', layer: 0, color: null, r: 0, g: 0, b: 0 })
    );
    
    // Draw stars (layer 1)
    this.stars.forEach(star => {
      const sx = Math.floor((star.x - this.width / 2) / star.z * 100 + this.width / 2);
      const sy = Math.floor((star.y - this.height / 2) / star.z * 100 + this.height / 2);
      
      if (sx >= 0 && sx < this.width && sy >= 0 && sy < this.height) {
        const brightness = 1 - star.z / 1000;
        const chars = ['.', '·', '*', '★'];
        const charIndex = Math.min(Math.floor(brightness * chars.length), chars.length - 1);
        
        if (screen[sy][sx].layer <= 1) {
          screen[sy][sx] = {
            char: chars[charIndex],
            layer: 1,
            color: brightness > 0.5 ? 'white' : 'gray',
            r: 255, g: 255, b: 255
          };
        }
      }
    });
    
    // Draw clouds (layer 2)
    this.clouds.forEach(cloud => {
      for (let i = 0; i < cloud.width; i++) {
        const x = Math.floor(cloud.x + i);
        const y = Math.floor(cloud.y);
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          if (screen[y][x].layer <= 2) {
            screen[y][x] = {
              char: ['░', '▒', '▓'][Math.floor(Math.random() * 3)],
              layer: 2,
              color: 'cloud',
              r: 74, g: 85, b: 104
            };
          }
        }
      }
    });
    
    // Draw Matrix rain (layer 3) - skip center area
    this.matrixDrops.forEach(drop => {
      const centerX = this.width / 2;
      const skipRadius = Math.max(this.planeWidth, 20);
      
      // Skip columns near center
      if (Math.abs(drop.x - centerX) < skipRadius) {
        return;
      }
      
      for (let i = 0; i < drop.length; i++) {
        const y = Math.floor(drop.y - i);
        if (y >= 0 && y < this.height && drop.x >= 0 && drop.x < this.width) {
          const brightness = 1 - (i / drop.length);
          const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
          
          if (screen[y][drop.x].layer <= 3) {
            screen[y][drop.x] = {
              char,
              layer: 3,
              color: brightness > 0.7 ? 'matrix-bright' : brightness > 0.4 ? 'matrix-med' : 'matrix-dim',
              r: 0, g: Math.floor(255 * brightness), b: 0
            };
          }
        }
      }
    });
    
    // Draw plane (layer 4) - centered
    const planeStartX = Math.floor(this.planeX - this.planeWidth / 2);
    const planeStartY = Math.floor(this.planeY - this.planeHeight / 2);
    
    for (let y = 0; y < this.planeHeight; y++) {
      for (let x = 0; x < this.planeWidth; x++) {
        const screenX = planeStartX + x;
        const screenY = planeStartY + y;
        
        if (screenX >= 0 && screenX < this.width && screenY >= 0 && screenY < this.height) {
          const idx = y * this.planeWidth + x;
          if (idx < this.planeAscii.length) {
            const pixel = this.planeAscii[idx];
            if (pixel.char !== ' ') {
              screen[screenY][screenX] = {
                char: pixel.char,
                layer: 4,
                color: 'plane',
                r: pixel.r,
                g: pixel.g,
                b: pixel.b,
                brightness: pixel.brightness
              };
            }
          }
        }
      }
    }
    
    // Update animation state
    this.updatePlane();
    this.updateBackground();
    this.time += 0.1;
    
    // Render to console
    clearScreen();
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const cell = screen[y][x];
        const char = cell.char;
        
        // Apply colors
        switch(cell.color) {
          case 'plane':
            // Use original image colors with cyan tint
            const r = Math.min(255, cell.r + 50);
            const g = Math.min(255, cell.g + 100);
            const b = Math.min(255, cell.b + 150);
            line += chalk.rgb(r, g, b)(char);
            break;
          case 'matrix-bright':
            line += chalk.greenBright(char);
            break;
          case 'matrix-med':
            line += chalk.green(char);
            break;
          case 'matrix-dim':
            line += chalk.hex('#004400')(char);
            break;
          case 'white':
            line += chalk.white(char);
            break;
          case 'gray':
            line += chalk.gray(char);
            break;
          case 'cloud':
            line += chalk.hex('#4a5568')(char);
            break;
          default:
            line += char;
        }
      }
      console.log(line);
    }
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
    case 'plane':
    case 'airplane':
    case 'fly':
      animation = new PlaneScreensaver(width, height);
      break;
    case 'plane-old':
      animation = new FlyingPlane(width, height);
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
  const validAnimations = ['matrix', 'starfield', 'stars', 'plasma', 'wave', 'dna', 'helix', 'cube', 'rotate', 'fire', 'plane', 'airplane', 'fly'];
  
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
    console.log('  ' + chalk.cyan.bold('plane      ') + ' - ✈️  Airplane (Aerospace.png) with Matrix background');
    console.log('  ' + chalk.gray('login      ') + ' - Cursor-agent style login screen');
    console.log('');
    console.log(chalk.yellow('Examples:'));
    console.log('  node index.js matrix       ' + chalk.gray('# Run Matrix rain animation'));
    console.log('  node index.js starfield    ' + chalk.gray('# Run starfield animation'));
    console.log('  node index.js plane        ' + chalk.gray('# Run airplane flying animation'));
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