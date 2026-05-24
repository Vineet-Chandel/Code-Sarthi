import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "www.codesarthi.in",
      "codesarthi.in",
      "https://codesarthi.in",
      "https://www.codesarthi.in",
      "code-sarthi-main-backend.onrender.com",
      "https://code-sarthi-main-backend.onrender.com"
    ]
  },
  // Add this block to bypass the broken fsevents macOS binary
  server: {
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})