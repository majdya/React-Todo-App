import path from "path";
import tailwindcss from "@tailwindcss/vite";
// import react from "vite-plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
