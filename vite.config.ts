import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 3127, host: true },
  preview: { port: 3127, host: true, strictPort: true },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
  },
})
