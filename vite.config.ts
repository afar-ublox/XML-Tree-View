import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import tailwind from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwind()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
    },
  },
  optimizeDeps: {
    include: [path.resolve(__dirname, "tailwind.config.js")],
  },
});
