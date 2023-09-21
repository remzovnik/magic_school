import { fileURLToPath, URL } from 'node:url'
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[name]",
      customDomId: "__svg__icons__dom__",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/_variables";
          @import "./src/assets/styles/_typography";
          @import "./src/assets/styles/_mixins";
        `,
      },
    },
  },
  base: './'
})
