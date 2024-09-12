/*
 * @Author: yl_li
 * @Date: 2024-09-04
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-04
 * @description: 
 */
export {};

declare global {
  interface Window {
    mtaskPluginInstance: any
  }

  interface Nav {
    id: string,
    label: string,
    path: string,
    notebook: string,
    child?: Nav[]
  } 
}