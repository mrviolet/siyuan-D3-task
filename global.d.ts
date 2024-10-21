/*
 * @Author: yl_li
 * @Date: 2024-09-04
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-21
 * @description: 
 */
export {};

declare global {
  interface Window {
    mtaskPluginInstance: any
  }

  /**
   * 侧边栏数据
   */
  interface Nav {
    id: string,
    label: string,
    path: string, 
    notebook: string, // 笔记本id
    child?: Nav[]
  }

  /**
   * 待办事项数据
   */
  interface Todo{
    blockId: string,
    content: string,
    isFinished: boolean,
    hpath: string, // 可读的笔记本路径
  }

  /**
   * 待办事项筛选条件
   */
  interface TodoFilter {
    status?: 'all' | 'finished' | 'unfinished',
  }
  
}