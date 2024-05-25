import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dts: "./auto-imports.d.ts",
      dirs: ["src", "src/pages", "src/components"],
      eslintrc: {
        enabled: true,
      },
      defaultExportByFilename: true,
    }),
  ],
});
