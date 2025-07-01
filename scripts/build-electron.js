import { build } from 'vite';
import { rmSync } from 'fs';

// Clean dist folders
try {
  rmSync('dist', { recursive: true, force: true });
  rmSync('dist-electron', { recursive: true, force: true });
} catch (e) {
  console.log('Clean completed');
}

// Build React app
console.log('Building React app...');
await build();

// Build Electron main and preload
console.log('Building Electron...');
await build({ 
  configFile: 'vite.electron.config.js'
});

console.log('Build completed!');