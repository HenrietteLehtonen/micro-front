import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

const isProd = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  base: isProd ? "/~hussaink/mediastore/" : "/",
  plugins: [
    react(),

    // Federation configuration
    // name: mediastore
    // exposes: contextHooks, MediaContext, UserContext, apiHooks
    // shared: react, react-dom, react-router-dom
    federation({
      name: "mediastore",
      filename: "remoteEntry.js",
      exposes: {
        "./contextHooks": "./src/hooks/contextHooks.ts",
        "./apiHooks": "./src/hooks/apiHooks.ts",
        "./MediaContext": "./src/contexts/MediaContext.tsx",
        "./UserContext": "./src/contexts/UserContext.tsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  server: {
    port: 3001, // Set the desired port here
  },
  preview: {
    port: 3001, // Set the desired port here
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
