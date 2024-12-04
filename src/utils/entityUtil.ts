/*
 * @Author: yl_li
 * @Date: 2024-09-14
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-01
 * @description: 实体相关工具类
 */

import { getDomByBlockId } from "../api/MtaskApi"
import { parseIal2JSON } from "../utils/ialUtil"

/**
 * 格式化待办事项数据
 * 
 * 此函数用于将 siyun 返回的 block 数据转换为 interface 为 Todo 的数据
 * 
 * @param data siyun 的 block 数据, 用到如下的属性：
 *             - id, hpath, fcontent, markdown
 * @returns 返回interface Todo 对象
 */
export async function formatTodo(data: { id: string, hpath: string, fcontent: string, markdown: string, parent_id: string, ial: string }): Promise<Todo> {
  // 获取块的 dom, 用于展示
  const dom = await getDomByBlockId(data.id)
  // 封装 todo
  let todo: Todo = {
    blockId: data.id,
    mk: data.markdown,
    isFinished: data.markdown.startsWith("* [X] "),
    hpath: data.hpath, // 可读的笔记本路径
    dom: dom.data.dom.replace("contenteditable", "a"),
    pid: data.parent_id
  }
  // 获取 plantime
  const plantime = parseIal2JSON(data.ial)["custom-mt-plantime"]
  if(plantime) todo.planTime = new Date(plantime);
  
  return todo
}
