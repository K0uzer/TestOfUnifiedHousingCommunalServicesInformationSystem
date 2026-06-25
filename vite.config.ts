import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@stypes/tokens/tokens" as *;\n@use "@stypes/mixins/rem" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@constans': path.resolve(__dirname, './src/Constans'),
      '@store': path.resolve(__dirname, './src/store'),
      '@stypes': path.resolve(__dirname, './src/stypes'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },
  plugins: [react()],
});
