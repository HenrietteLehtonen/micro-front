import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/~hussaink/upload/" : "/",
  plugins: [
    react(),
    federation({
      name: "upload",
      filename: "remoteEntry.js",
      exposes: {
        "./MediaForm": "./src/views/MediaForm",
        "./Upload": "./src/views/Upload",
      },
      remotes: isProd
        ? {
          mediastore:
            "https://users.metropolia.fi/~hussaink/mediastore/assets/remoteEntry.js",
          front_and_sidebar:
            "https://users.metropolia.fi/~hussaink/front_and_sidebar/assets/remoteEntry.js",
        }
        : {
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
