/*
 * @Author: yl_li
 * @Date: 2024-09-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-01
 * @description: siyuan 的 api, 仅返回数据, 不做数据加工, 禁止直接调用
 */
import { fetchSyncPost } from "siyuan";

/**
 * 这里维护方法与 url 的映射关系
 */
interface UrlMap {
  getFileTree: string  // 获取文件树
  listDocsByPath: string  // 获取文件列表
  lsNotebooks: string  // 获取笔记本列表
  sql: string // 执行 sql
  pushMsg: string // 推送消息
  getDom: string // 获取 dom
  updateBlock: string // 编辑块
  setBlockAttrs: string // 设置块属性
  getBlockAttrs: string // 获取块属性
}

const urlMap: UrlMap = {
  getFileTree: '/api/getFileTree',
  listDocsByPath: "/api/filetree/listDocsByPath",
  lsNotebooks: '/api/notebook/lsNotebooks',
  sql: '/api/query/sql',
  pushMsg: '/api/notification/pushMsg',
  getDom: '/api/block/getBlockDOM',
  updateBlock: '/api/block/updateBlock',
  setBlockAttrs: '/api/attr/setBlockAttrs',
  getBlockAttrs: '/api/attr/getBlockAttrs'
};

export async function send(methodName: string, param?: any) {
  // 获取 url
  const url = urlMap[methodName as keyof UrlMap];
  if (url) {
    return await fetchSyncPost(url, param);
  }
  return { code: 0, msg: "", data: null };
}
