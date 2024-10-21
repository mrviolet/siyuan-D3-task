/*
 * @Author: yl_li
 * @Date: 2024-09-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-19
 * @description: 根据 suyuan-api 封装好的, 适配插件的 api
 */
import { formatTodo } from "../utils/entityUtil";
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

// /** 
//  * 查询和此ID有关的所有 todo
//  * 先查询笔记本下的所有 todo，再查询块下的所有 todo
// */
// export async function getTodosLikeId(selectedID: string, showFinished: boolean = false) {
//   if (!selectedID) return [];
//   let queryNTodoSql = `SELECT * FROM blocks WHERE box = '${selectedID}' and type = 'i' and subtype='t'`
//   if (!showFinished) {
//     queryNTodoSql += " and markdown like '%[ ]%'"
//   }
//   const nTodoRes = await send('sql', { stmt: queryNTodoSql });
//   if (nTodoRes.data.length != 0) {
//     return nTodoRes.data.map((d: any) => formatTodo(d));
//   } else {
//     let queryBlockTodoSql = `SELECT * FROM blocks WHERE path like '%${selectedID}%' and type = 'i' and subtype='t'`
//     if (!showFinished) {
//       queryBlockTodoSql += " and markdown like '%[ ]%'"
//     }
//     const bTodoRes = await send('sql', { stmt: queryBlockTodoSql });
//     return bTodoRes.data.map((d: any) => formatTodo(d));
//   }
// }