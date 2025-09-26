import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "upload",
      filename: "remoteEntry.js",
      exposes: {
        "./MediaForm": "./src/views/MediaForm",
        "./Upload": "./src/views/Upload",
      },
      remotes: {
        // profile depends on mediastore for user context
        mediastore: "http://localhost:3001/assets/remoteEntry.js",
        front_and_sidebar: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3006, // Set the desired port here
  },
  preview: {
    port: 3006, // Set the desired port here
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
