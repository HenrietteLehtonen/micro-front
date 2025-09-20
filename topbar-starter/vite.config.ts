import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // Federation configuration
    // name: TopBar
    // exposes: TopBar
    // shared: react, react-dom, react-router-dom
    federation({
      name: "TopBar",
      filename: "remoteEntry.js",
      exposes: {
        "./TopBar": "./src/components/TopBar.tsx",
      },
      remotes: {
        mediastore: "http://localhost:3001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3004, // Set the desired port here
  },
  preview: {
    port: 3004, // Set the desired port here
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
  },
});
