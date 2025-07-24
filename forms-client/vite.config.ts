import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    allowedHosts: ['localhost'],
    port: 5173,
    proxy: {
    '/api': {
    changeOrigin: true,
    secure: false,
    target: 'http://localhost:4000',
    },
    },
    strictPort: true,
  },
})
