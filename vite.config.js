import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "'.concat(
          path.resolve(__dirname, "src/common/global.module.less"),
          '";',
        ),
        javascriptEnabled: true,
      },
    },
  },
  base: "./",
  server: {
    port: 3000,
    host: "0.0.0.0",
    https: true,
    cors: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  worker: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
