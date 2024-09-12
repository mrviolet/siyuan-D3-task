/*
 * @Author: yl_li
 * @Date: 2024-09-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-11
 * @description: 根据 suyuan-api 封装好的, 适配插件的 api
 */
import { fetchSyncPost } from "siyuan";


/**
 * 获取打开的笔记本列表
 * 
 * @returns 返回笔记本列表，若空返回空数组
 */
export async function getOpenNotebookList() {
  const notebooksRes = await fetchSyncPost("/api/notebook/lsNotebooks");
  if (notebooksRes.data.notebooks) {
    return notebooksRes.data.notebooks.filter((notebook: { closed: boolean }) => !notebook.closed)
  }
  return [];
}

/**
 * 获取文件树结构
 * 
 * 此函数用于根据给定的笔记本名称和路径获取文件树结构中的文件列表
 * 
 * @param param.notebook 笔记本名称，用于定位文件树中的特定部分
 * @param param.path 文件路径，用于进一步细化要获取的文件列表
 * @returns 返回获取到的文件列表，如果没有文件，返回空数组
 */
export async function getFileTree(param: { notebook: string, path: string }) {
  const fileListRes = await fetchSyncPost("/api/filetree/listDocsByPath", param);
  if (fileListRes.data.files) {
    return fileListRes.data.files;
  }
  return [];
}