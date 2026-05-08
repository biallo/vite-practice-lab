import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : process.env.VITE_BASE_PATH || "/vite-practice-lab/",
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true
  },
  preview: {
    host: "127.0.0.1",
    port: 4174,
    strictPort: true
  }
}));
