import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        invitation: resolve(import.meta.dirname, 'index.html'),
        tables: resolve(import.meta.dirname, 'tables.html'),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
