// frontend/vite.config.js
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend portu
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
