import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; 
import path from 'path';

export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
});