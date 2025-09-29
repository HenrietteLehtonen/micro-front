import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/~hussaink/video_player/" : "/",
  plugins: [
    react(),
    federation({
      name: "video_player",
      filename: "remoteEntry.js",
      exposes: {
        "./VideoPlayer": "./src/components/VideoPlayer",
        "./VideoButtons": "./src/components/VideoButtons",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3003, // Set the desired port here
  },
  preview: {
    port: 3003, // Set the desired port here
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
