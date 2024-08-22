/*
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-08-22
 * @description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from "vite-plugin-static-copy"
import { resolve } from "path"
import minimist from 'minimist';
import fs from 'fs'

const args = minimist(process.argv.slice(2))
const SIYUAN_WORKSPACE = "E:/siyuan"
const isDev = args.d || false
const isLink = args.l || false
const distDir = isDev ? "dist-dev" : "dist"

if (isLink) {
  // 获取当前文件目录
  const currentPath = `${process.cwd()}/dist-dev`;
  // 目标插件目录
  const targetPath = `${SIYUAN_WORKSPACE}/data/plugins/siyuan-Mtask`
  if (!fs.existsSync(targetPath)) {
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath, { recursive: true });
    }
    console.log(`Creating symlink from ${currentPath} to ${targetPath}`);
    fs.symlinkSync(currentPath, targetPath, 'junction')
  }
}

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    }
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: "./README*.md",
          dest: "./",
        },
        {
          src: "./plugin.json",
          dest: "./",
        },
        {
          src: "./icon.png",
          dest: "./",
        }
      ],
    })
  ],
  build: {
    outDir: distDir,
    sourcemap: isDev ? 'inline' : false,
    minify: !isDev,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: () => 'index.js',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ["siyuan", "process"],
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "index.css"
          }
          return String(assetInfo.name)
        },
      },
    }
  },
})