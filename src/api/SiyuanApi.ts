/*
 * @Author: yl_li
 * @Date: 2024-09-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-06
 * @description: 
 */
import { fetchSyncPost } from "siyuan";
export async function getNotebookList() {
  // 这里添加获取笔记本列表的异步逻辑
  const notebooks = fetchSyncPost("/api/notebook/lsNotebooks"); // 假设这是从服务器获取笔记本列表的方法
  return notebooks;
}