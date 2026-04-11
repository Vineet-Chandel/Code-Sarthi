import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      "www.codesarthi.in",
      "codesarthi.in",
      "https://codesarthi.in",
      "https://www.codesarthi.in"
    ]
  }
})
