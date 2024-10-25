<!--
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-25
 * @description: 
-->
## 启动

执行 `vite build` 命令，打包项目

项目提供了两个参数 `--d` 和 `--l`

`--d` 指定打包环境为 `dev` 环境，输出目录为 `dist-dev`，同时关闭代码混淆

`--l` 创建与 `dist-dev` 关联的软连接，该需要与 `--d` 配合使用，同时需在 `vite.config.ts` 指定思源笔记的工作目录

#### 软链接策略
默认情况下，软链接会将当前文件夹下的 `dist-dev` 目录指向 `SIYUAN_WORKSPACE` 目录，当然，你需要在 `vite.config.ts` 中配置 `SIYUAN_WORKSPACE`

#### 热部署策略
支持热部署，但仅适用于 `src` 下的代码文件，修改配置文件需重启项目

#### 插件重新加载策略
在热部署生效前提下，监听器会回调 `siyuan` 服务的 `api/filetree/refreshFiletree` 接口刷新文件树，以确保插件被重新加载。

如果该功能不生效，请检查 `vite.config.ts` 中 `BASRE_URL` 是否配置正确