import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    fs: {
      // Allow serving files from the parent data directory
      allow: ['.', path.resolve(__dirname, '../data')]
    }
  }
})
