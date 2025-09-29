import federation from "@originjs/vite-plugin-federation";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  // When deployed under a subfolder on the user webspace the base must match
  // the actual upload path. The host dist was uploaded into /~hussaink/host/,
  // so use that as the production base. If you instead upload host dist to
  // the root /~hussaink/ then change this back to "/~hussaink/".
  base: isProd ? "/~hussaink/host/" : "/",
  plugins: [
    react(),
    // Federation host side
    federation({
      name: "host",
      remotes: isProd
        ? {
          TopBar: "https://users.metropolia.fi/~hussaink/topbar/assets/remoteEntry.js",
          mediastore:
            "https://users.metropolia.fi/~hussaink/mediastore/assets/remoteEntry.js",
          front_and_sidebar:
            "https://users.metropolia.fi/~hussaink/front_and_sidebar/assets/remoteEntry.js",
          video_player:
            "https://users.metropolia.fi/~hussaink/video_player/assets/remoteEntry.js",
          profile: "https://users.metropolia.fi/~hussaink/profile/assets/remoteEntry.js",
          upload: "https://users.metropolia.fi/~hussaink/upload/assets/remoteEntry.js",
        }
        : {
          TopBar: "http://localhost:3004/assets/remoteEntry.js",
          mediastore: "http://localhost:3001/assets/remoteEntry.js",
          // frontti ja sidebar me
          front_and_sidebar: "http://localhost:3002/assets/remoteEntry.js",
          // video player
          video_player: "http://localhost:3003/assets/remoteEntry.js",
          profile: "http://localhost:3005/assets/remoteEntry.js",
          upload: "http://localhost:3006/assets/remoteEntry.js",
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
