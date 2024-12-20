/*
 * @Author: yl_li
 * @Date: 2024-09-14
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-20
 * @description: 实体相关工具类
 */

import { getDomByBlockId } from "../api/MtaskApi"
import { parseIal2JSON, parseHtmlStr } from "../utils/ialUtil"
import { parse } from 'date-fns';


/**
 * 格式化待办事项数据
 * 
 * 此函数用于将 siyun 返回的 block 数据转换为 interface 为 Todo 的数据
 * 
 * @param data siyun 的 block 数据, 用到如下的属性：
 *             - id, hpath, fcontent, markdown
 * @returns 返回interface Todo 对象
 */
export async function formatTodo(data: {
  id: string, hpath: string, fcontent: string, markdown: string,
  parent_id: string, ial: string, root_id: string, p_markdown: string, p_created: string
}): Promise<Todo> {
  // 获取块的 dom, 用于展示
  const dom = await getDomByBlockId(data.id)

  // 封装 todo
  let todo: Todo = {
    blockId: data.id,
    mk: data.markdown,
    isFinished: data.p_markdown.startsWith("* [X] "),
    hpath: data.hpath, // 可读的笔记本路径
    dom: dom.data.dom.replace("contenteditable", "a"),
    pid: data.parent_id,
    docId: data.root_id,
    pMarkdown: data.p_markdown,
    logs: []
  }
  // 获取 plantime
  const ial = parseIal2JSON(data.ial)
  const plantime = ial["custom-mt-plantime"]
  if (plantime) todo.planTime = parse(plantime, "yyyyMMddHHmmss", new Date())
  // 封装 logs
  const logs: Timeline[] = []
  // 1、获取创建时间
  logs.push({
    time: data.p_created,
    content: "创建任务"
  })
  // 2、补充其他时间线
  const log: string = ial["custom-mt-log"]
  // 3、根据 time 倒序
  if (log) {
    logs.push(...parseHtmlStr(log))
  }
  logs.sort((a, b) => {
    return Number(b.time) - Number(a.time)
  })
  todo.logs = logs
  return todo
}
