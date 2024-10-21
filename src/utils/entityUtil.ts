/*
 * @Author: yl_li
 * @Date: 2024-09-14
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-14
 * @description: 实体相关工具类
 */

/**
 * 格式化待办事项数据
 * 
 * 此函数用于将 siyun 返回的 block 数据转换为 interface 为 Todo 的数据
 * 
 * @param data siyun 的 block 数据, 用到如下的属性：
 *             - id, hpath, fcontent, markdown
 * @returns 返回interface Todo 对象
 */
export function formatTodo(data: {id:string, hpath:string, fcontent:string, markdown:string}): Todo {
  return {
    blockId: data.id,
    content: data.fcontent,
    isFinished: data.markdown.startsWith("* [X] "),
    hpath: data.hpath, // 可读的笔记本路径
  }
}
