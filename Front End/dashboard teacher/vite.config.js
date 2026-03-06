import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ده الإعداد اللي هيخلي ملفات الـ .js تشتغل كأنها React
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, 
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})