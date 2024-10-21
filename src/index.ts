/*
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-05
 * @description: 
 */

import './style.css';
import '@icon-park/vue-next/styles/index.css'
import { Plugin, openTab } from 'siyuan'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import DockView from './view/Dock.vue'
import MainView from './view/Main.vue'
const dockView = createApp(DockView).use(createPinia())

export default class MtaskPlugin extends Plugin {
  async onload() {
    // 将该实例注册到全局
    window.mtaskPluginInstance = this
    this.addIcons(`<svg id="mytask-icon" width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 42H42V6H32H30C28.6758 9.15854 26.6758 10.7378 24 10.7378C21.3242 10.7378 19.3242 9.15854 18 6H16H6V42Z" fill="#fffff1" stroke="#333" stroke-width="4" stroke-linejoin="round"/><path d="M15 24L21 30L33 18" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`)
    // 初始化侧边栏
    this.addDock({
      config: {
        position: 'RightTop',
        size: { width: 200, height: 0 },
        icon: "mytask-icon",
        title: "Mtask",
      },
      data: {},
      type: 'dock_tab',
      init() {
        this.element.id = 'siyuan-mtask'
        this.element.style.height = '100%'
        dockView.mount('#siyuan-mtask')
      },
      destroy() {
        // console.log('destroy dock: dock_tab')
      },
    })
  }

  openMtaskTab() {
    const tagId = "d3-mtask-tab";
    this.addTab({
      type: tagId,
      init() {
        createApp(MainView).use(createPinia()).mount(this.element);
      }
    })
    openTab({
      app: this.app,
      custom: {
        title: 'MTask',
        icon: 'mytask-icon',
        id: this.name + tagId
      }
    })
  }

}