import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/~hussaink/profile/" : "/",
  plugins: [
    react(),

    // Federation configuration for profile micro-frontend
    federation({
      name: "profile",
      filename: "remoteEntry.js",
      exposes: {
        // expose the Profile component so host can import 'profile/Profile'
        "./Profile": "./src/components/ProfileView",
        // expose a thumbnail component
        "./ProfileThumbnail": "./src/components/ProfileThumbnail",
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
    port: 3005, // profile MFE runs on 3005
  },
  preview: {
    port: 3005,
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
