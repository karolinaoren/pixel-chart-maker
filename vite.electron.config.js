import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, 'electron/main.js'),
        preload: resolve(__dirname, 'electron/preload.js'),
      },
      formats: ['es'],
    },
    outDir: 'dist-electron',
    rollupOptions: {
      external: ['electron', 'url', 'path', 'fs', 'fs/promises'],
    },
    emptyOutDir: true,
  },
});