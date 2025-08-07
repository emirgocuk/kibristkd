import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // YENİ EKLENECEK BÖLÜM BAŞLANGICI
  server: {
    proxy: {
      // '/api' ile başlayan tüm istekleri localhost:3001'e yönlendir
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // İsteğe bağlı: '/api' kısmını hedef URL'den kaldırabilirsiniz
        // Örneğin /api/login -> http://localhost:3001/login olur
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
  // YENİ EKLENECEK BÖLÜM SONU
})