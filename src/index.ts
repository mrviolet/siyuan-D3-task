/*
 * @Author: yl_li
 * @Date: 2024-08-20
 * @LastEditors: yl_li
 * @LastEditTime: 2024-08-21
 * @description: 
 */
// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { Plugin } from 'siyuan'

export default class MtaskPlugin extends Plugin {

  // 插件加载
  async onload() {
    console.log('mtask plugin loaded');
    
  }
}
