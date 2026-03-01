import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// GitHub Pages serves project sites from /<repo>/, so we must set base.
// This prevents blank pages caused by missing JS/CSS asset paths.
export default defineConfig({
  base: '/IThealth/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
