import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginFaviconsInject('./src/assets/favicon.png')
    // vitePluginFaviconsInject('./src/assets/favicon.ico')
  ],

  // Had to add this bit to get HMR to work.
  server: {
    watch: {
      usePolling: true
    }
  }
})
