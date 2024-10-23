/*
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-22
 * @description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from "vite-plugin-static-copy"
import { resolve } from "path"
import minimist from 'minimist';
import fs from 'fs'

// 需要调整为本地的配置
const PLUGIN_NAME = "siyuan-Mtask"
const SIYUAN_WORKSPACE = "E:/siyuan"
const DEV_DIST_FILENAME = "dist-dev"
const BASRE_URL = "http://127.0.0.1:6806/"


const args = minimist(process.argv.slice(2))
const isDev = args.d || false
const isLink = args.l || false
const distDir = isDev ? DEV_DIST_FILENAME : "dist"

if (isLink) {
  // 获取当前文件目录
  const currentPath = `${process.cwd()}/${DEV_DIST_FILENAME}`;
  // 目标插件目录
  const targetPath = `${SIYUAN_WORKSPACE}/data/plugins/${PLUGIN_NAME}`
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
    watch: {
      include: 'src/**', // 监控 src 目录下的文件变化
      exclude: ['node_modules/**', 'dist/**'], // 排除 node_modules 目录
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
      plugins: [
        {
          name: 'code-watch',
          buildStart() {
            console.log('Watching for file changes...');
          },
          async writeBundle() {
            console.log('Files have been updated.');
            // 刷新文档树
            await fetch(BASRE_URL + 'api/filetree/refreshFiletree', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "notebook": "root",
                "path": "/"
              }),
            });
            console.log('Refresh file tree completed.');
          },
        },
      ],
    }
  },
})