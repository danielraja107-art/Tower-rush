import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [react(), wasm()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier', '@dimforge/rapier3d'],
          ui: ['react', 'react-dom', 'zustand', 'gsap', '@gsap/react'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/rapier', '@dimforge/rapier3d'],
  },
  server: {
    port: 3000,
    open: true,
  },
})