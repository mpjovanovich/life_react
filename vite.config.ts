import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Had to add this bit to get HMR to work.
  server: {
    watch: {
      usePolling: true,
    },
  },
});
