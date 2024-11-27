/*
 * @Author: yl_li
 * @Date: 2024-11-26
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-27
 * @description: 查询 todo 相关的接口，基于 siyuan api 封装 
 */
import { formatTodo } from "../utils/entityUtil";
import { send } from "./SiyuanApi";

/**
 * 根据笔记本 id 查询 todo, 默认仅显示已完成的
 * @param boxid 笔记本 ID
 * @param filter 筛选条件, 默认为只显示未完成的
 * @returns 
 */
export async function getTodosByBoxid(boxid: string, filter: TodoFilter = { state: 'unfinished' }) {
  if (!boxid) return [];
  let queryTodoSql = `SELECT * FROM blocks WHERE type = 'i' AND subtype = 't' AND box = '${boxid}'`
  if (filter.state == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.state == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  const todoRes = await send('sql', { stmt: queryTodoSql });
  return todoRes.data.map((d: any) => formatTodo(d));
}

/**
 * 根据文档 id 查询 todo, 默认仅显示已完成的
 * @param boxid 笔记本 ID
 * @param filter.state 是否显示已完成, 默认为 false 不展示 
 * @returns 
 */
export async function getTodosByDocid(docid: string, filter: TodoFilter = { state: 'unfinished' }) {
  if (!docid) return [];
  let queryTodoSql = `SELECT * FROM blocks WHERE type = 'i' AND subtype = 't' AND path like '%${docid}%'`
  if (filter.state == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.state == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  const todoRes = await send('sql', { stmt: queryTodoSql });
  return todoRes.data.map((d: any) => formatTodo(d));
}

/**
 * 根据 block id 查询 Todo
 * @param blockid block id
 * @returns 块信息，使用 Todo 进行包装
 */
export async function getTodoByBlockid(blockid: string) {
  let queryBlockSql = `SELECT * FROM blocks WHERE id = '${blockid}'`
  const blockRes = await send('sql', { stmt: queryBlockSql });
  if (!blockRes.data) return null;
  return blockRes.data.map((d: any) => formatTodo(d))[0];
}

/**
 * 查询计划完成时间为今天的 todo
 * 不区分是否完成，全量数据
 */
export async function getTodayTodo() {
  // let queryBlockSql = `SELECT * FROM blocks WHERE id = '${blockid}'`
  // const blockRes = await send('sql', { stmt: queryBlockSql });
  // if (!blockRes.data) return null;
  // return blockRes.data.map((d: any) => formatTodo(d))[0];
}

/**
 * 查询计划完成时间为明天的 todo list
 * 不区分是否完成，全量数据
 */
export async function queryTomorrowTodo() {

}

export async function queryAllTodo(filter: TodoFilter = { state: 'unfinished' }) {

}