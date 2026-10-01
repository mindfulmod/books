import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/books/" : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { main: 'index.html', timelessSeeds: 'timeless-seeds.html' },
    },
  },
}));
