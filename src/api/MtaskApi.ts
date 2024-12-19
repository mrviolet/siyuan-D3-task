/*
 * @Author: yl_li
 * @Date: 2024-09-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-19
 * @description: 根据 suyuan-api 封装好的, 适配插件的 api
 */
import { send } from "./SiyuanApi";
import { format } from 'date-fns';

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
export async function pushMsg(msg: string) {
  // timeout：消息持续显示时间，单位为毫秒。可以不传入该字段，默认为 7000 毫秒
  return await send('pushMsg', { msg, "timeout": 2000 });
}

/** 
 * 根据 block id 获取 dom
 * @param blockId block id
*/
export async function getDomByBlockId(blockId: string) {
  return await send('getDom', { id: blockId });
}

/**
 * 根据 block id 编辑 block 内容, 使用 markdown 语法
 * 同时需要恢复之前的块属性
 */
export async function editBlockMkByBlockId(blockId: string, content: string) {
  // 获取块属性
  const blockAttrRes = await send('getBlockAttrs', { id: blockId });
  const attrs = blockAttrRes.data;
  // 移除不是 custom 开头的字段
  Object.keys(attrs).forEach(key => {
    if (!key.startsWith('custom')) {
      delete attrs[key];
    }
  });
  await send('updateBlock', { id: blockId, data: content, dataType: 'markdown' })
  await  send('setBlockAttrs', { id: blockId, attrs });
}

/**
 * 设置完成时间
 * 自定义属性 custom-mt-plantime
 */
export async function editPlanTime(blockId: string, time: string) {
  return await send('setBlockAttrs', { id: blockId, attrs: { "custom-mt-plantime": format(time, 'yyyyMMdd') + '000000' } });
}

/**
 * 根据 block id 获取 block 内容
 * @param blockid block id
 * @returns 块信息，使用 Todo 进行包装
 */
export async function getBlockByBlockid(blockid: string) {
  let queryBlockSql = `SELECT * FROM blocks WHERE id = '${blockid}'`
  const blockRes = await send('sql', { stmt: queryBlockSql });
  if (!blockRes.data) return null;
  return blockRes.data[0];
}
