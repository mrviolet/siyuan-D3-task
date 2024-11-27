/*
 * @Author: yl_li
 * @Date: 2024-09-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-26
 * @description: 根据 suyuan-api 封装好的, 适配插件的 api
 */
import { send } from "./SiyuanApi";


/**
 * 获取打开的笔记本列表
 * 
 * @returns 返回笔记本列表，若空返回空数组
 */
export async function getOpenNotebookList() {
  const notebooksRes = await send('lsNotebooks');
  if (notebooksRes.data.notebooks) {
    return notebooksRes.data.notebooks.filter((notebook: { closed: boolean }) => !notebook.closed)
  }
  return [];
}


/**
 * 获取文件树结构
 * 此函数用于根据给定的笔记本名称和路径获取文件树结构中的文件列表
 * 
 * @param param.notebook 笔记本id
 * @param param.path 文件路径
 * @returns 返回获取到的文件列表，如果没有文件，返回空数组
 */
export async function getFileTree(param: { notebook: string, path: string }) {
  const fileListRes = await send('listDocsByPath', param);
  if (fileListRes.data.files) {
    return fileListRes.data.files;
  }
  return [];
}

/**
 * 推送消息
 * @param msg 消息
 * @returns 
 */
export async function pushMsg(msg: string){
  // timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
  return await send('pushMsg', { msg, "timeout": 2000 });
} 
