import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: "assets/images/*",
    //       dest: "assets/images",
    //     },
    //   ],
    // }),
    // createSvgIconsPlugin({
    //   // Opcje wtyczki, np. ścieżka do folderu z ikonami
    //   iconDirs: [path.resolve(process.cwd(), "src/assets/images")],
    //   // Możesz ustawić inne opcje, jeśli potrzebujesz
    //   symbolId: "icon-[name]", // Symbol ID, który będzie użyty w HTML
    // }),
  ],
  base: "/product-list-with-cart-main2/", // Dostosuj, jeśli to konieczne
});
