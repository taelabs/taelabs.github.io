import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
//
// `base` configuration for GitHub Pages:
// - User/Org page (https://taelabs.github.io)  -> base: '/'
// - Project page   (https://user.github.io/repo) -> base: '/repo/'
//
// This project is published at https://taelabs.github.io, so we use '/'.
// If you move it to a project repo, change `base` to '/<repo-name>/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
  },
})
