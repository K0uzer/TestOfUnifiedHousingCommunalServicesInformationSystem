import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-svg-loader';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constans': path.resolve(__dirname, './src/constans'),
      '@store': path.resolve(__dirname, './src/store'),
      '@stypes': path.resolve(__dirname, './src/stypes'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },
  plugins: [react(), svgr()],
});
