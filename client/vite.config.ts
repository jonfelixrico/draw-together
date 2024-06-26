import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        // TODO use env variable for target
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
  },

  resolve: {
    alias: {
      '@manifest': path.resolve(__dirname, './package.json'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
