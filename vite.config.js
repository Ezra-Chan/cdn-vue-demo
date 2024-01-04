import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import vitePluginExternal from "vite-plugin-external";

// 全局对象
const externalGlobalsObj = {
  vue: "Vue",
  "element-plus": "ElementPlus",
  // vuex: "Vuex",
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(), // 将css打进js
    vitePluginExternal({
      externals: externalGlobalsObj,
      mode: false,
    }),
  ],
  build: {
    target: "es2015",
    rollupOptions: {
      // external: Object.keys(externalGlobalsObj),
      output: {
        entryFileNames: "assets/app.[hash].js",
        assetFileNames: "media/[name]-[hash].[ext]",
      },
    },
  },
});
