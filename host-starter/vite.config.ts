import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Federation host side
    federation({
      name: "host",
      remotes: {
        mediastore: "http://localhost:3001/assets/remoteEntry.js",
        // frontti ja sidebar me
        front_and_sidebar: "http://localhost:3002/assets/remoteEntry.js",
        // video player
        video_player: "http://localhost:3003/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
  },
});
