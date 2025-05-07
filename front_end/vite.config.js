import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/**/*.js"
  ],
  theme: {
    extend: {
      textColor: ['hover', 'focus', 'active'],
      backgroundColor: ['hover', 'active'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
