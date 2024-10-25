import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/product-list-with-cart-main2/", // Dostosuj, jeśli to konieczne
});
