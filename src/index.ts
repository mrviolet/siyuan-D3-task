/*
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-08-23
 * @description: 
 */

import { Plugin } from 'siyuan'
import App from './App.vue'
import { createApp } from 'vue'

const app = () => createApp(App)

export default class MtaskPlugin extends Plugin {

  async onload() {
    this.addIcons(`<svg id="mytask-icon" width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 42H42V6H32H30C28.6758 9.15854 26.6758 10.7378 24 10.7378C21.3242 10.7378 19.3242 9.15854 18 6H16H6V42Z" fill="#fffff1" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M15 24L21 30L33 18" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`)
    this.addDock({
      config: {
        position: 'RightTop',
        size: { width: 200, height: 0 },
        icon: "mytask-icon",
        title: "Mtask"
      },
      data: {},
      type: 'dock_tab',
      async init() {
        this.element.id = 'siyuan-mtask'
        this.element.style.height = '100%'
        app().mount('#siyuan-mtask')
      },
      destroy() {
        console.log('destroy dock: dock_tab')
      },
    })
  }

}
