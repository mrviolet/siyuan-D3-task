/*
 * @Author: yl_li
 * @Date: 2024-09-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-06
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


/**
 * 根据笔记本 id 查询 todo, 默认仅显示已完成的
 * @param boxid 笔记本 ID
 * @param filter 筛选条件, 默认为只显示未完成的
 * @returns 
 */
export async function getTodosByBoxid(boxid: string, filter: TodoFilter = { status: 'unfinished' }) {
  if (!boxid) return [];
  let queryTodoSql = `SELECT * FROM blocks WHERE type = 'i' AND subtype = 't' AND box = '${boxid}'`
  if (filter.status == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.status == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  const todoRes = await send('sql', { stmt: queryTodoSql });
  return todoRes.data.map((d: any) => formatTodo(d));
}


/**
 * 根据文档 id 查询 todo, 默认仅显示已完成的
 * @param boxid 笔记本 ID
 * @param showFinished 是否显示已完成, 默认为 false 不展示 
 * @returns 
 */
export async function getTodosByDocid(docid: string, filter: TodoFilter = { status: 'unfinished' }) {
  if (!docid) return [];
  let queryTodoSql = `SELECT * FROM blocks WHERE type = 'i' AND subtype = 't' AND path like '%${docid}%'`
  if (filter.status == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.status == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  const todoRes = await send('sql', { stmt: queryTodoSql });
  return todoRes.data.map((d: any) => formatTodo(d));
}

/**
 * 查询块的信息根据 block id
 * @param blockid block id
 * @returns 块信息，使用 Todo 进行包装
 */
export async function queryBlockById(blockid: string) {
  let queryBlockSql = `SELECT * FROM blocks WHERE id = '${blockid}'`
  const blockRes = await send('sql', { stmt: queryBlockSql });
  if (!blockRes.data) return null;
  return blockRes.data.map((d: any) => formatTodo(d))[0];
}
