import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { createStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStaticCopy({
      targets: [
        {
          src: "assets/images/*",
          dest: "assets/images", // gdzie kopiować w folderze dist
        },
      ],
    }),
  ],
  base: "/product-list-with-cart-main2/",
});
