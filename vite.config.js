import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://careerly-1.onrender.com", // hosted backend
        changeOrigin: true,
        secure: true, // since it's HTTPS
      },
    },
    // Optional: remove host config to fix HMR issues
    // hmr: { host: "localhost" },
  },
  build: {
    outDir: "dist", // default output folder
  },
  base: "/", // ensures proper routing for React Router
});
