import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    fs: {
      allow: [
        // Allow serving files from the parent data directory
        path.resolve(__dirname, '..'),
      ],
    },
  },
})
