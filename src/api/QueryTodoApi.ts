/*
 * @Author: yl_li
 * @Date: 2024-11-26
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-12
 * @description: 查询 todo 相关的接口，基于 siyuan api 封装 
 */
import { formatTodo } from "../utils/entityUtil";
import { send } from "./SiyuanApi";

/**
 * 根据笔记本 id 查询 todo, 默认仅显示已完成的
 * 1、先查询 type = i, subtype = t 的 block, 此时的 block 是在 suyuan 系统中能显示看到的
 * 2、为了获取的 dom 能正常的展示, 最终要返回的是 type = p 的 block, 否则 dom 会把子集的 dom 也查询出来, praent_id 为上面查询到的 block id 
 * 值得注意的是, 2会把子集的 dom 也查询出来, 但是本身的 dom 会在第一个, 所以可以根据 parent_id 来分组
 * @param boxid 笔记本 ID
 * @param filter 筛选条件, 默认为只显示未完成的
 * @returns 
 */
export async function getTodosByBoxid(boxid: string, filter: TodoFilter = { state: 'unfinished' }) {
  if (!boxid) return [];
  let queryTodoSql = `SELECT id, ial, markdown, created FROM blocks WHERE type = 'i' AND subtype = 't' AND box = '${boxid}'`
  if (filter.state == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.state == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  queryTodoSql = `SELECT b.*, a.ial, a.markdown as p_markdown FROM (${queryTodoSql}) as a LEFT JOIN 
    (SELECT * FROM blocks WHERE type = 'p' GROUP BY parent_id) as b ON a.id = b.parent_id
    ORDER BY a.created`
  const todoRes = await send('sql', { stmt: queryTodoSql });
  const formattedTodos = await Promise.all(todoRes.data.map(async (d: any) => formatTodo(d)));
  return formattedTodos;
}

/**
 * 根据文档 id 查询 todo, 默认仅显示已完成的
 * @param boxid 笔记本 ID
 * @param filter.state 是否显示已完成, 默认为 false 不展示 
 * @returns 
 */
export async function getTodosByDocid(docid: string, filter: TodoFilter = { state: 'unfinished' }) {
  if (!docid) return [];
  let queryTodoSql = `SELECT id, ial, markdown FROM blocks WHERE type = 'i' AND subtype = 't' AND path like '%${docid}%'`
  if (filter.state == 'unfinished') {
    queryTodoSql += " and markdown like '* [ ]%'"
  } else if (filter.state == 'finished') {
    queryTodoSql += " and markdown like '* [x]%'"
  }
  queryTodoSql = `SELECT b.*, a.ial, a.markdown as p_markdown FROM (${queryTodoSql}) as a LEFT JOIN 
    (SELECT * FROM blocks WHERE type = 'p' GROUP BY parent_id) as b ON a.id = b.parent_id`
  const todoRes = await send('sql', { stmt: queryTodoSql });
  const formattedTodos = await Promise.all(todoRes.data.map(async (d: any) => formatTodo(d)));
  return formattedTodos;
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