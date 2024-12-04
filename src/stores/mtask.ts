import { defineStore } from 'pinia'

/**
 * 侧边栏选择
 */
export const useNavStore = defineStore('navSelectId', {
  state: () => ({ navid: 'today', level: -1, label: '今天'}),
  getters: {},
  actions: {
    change(param:{ navid: string, level: number, label: string }) {
      this.navid = param.navid;
      this.level = param.level;
      this.label = param.label;
    }
  },
})

/**
 * 侧边栏选择
 */
export const useTodoStore = defineStore('todoSelectId', {
  state: () => ({blockId: ''}),
  getters: {},
  actions: {
    change(newId:string) {
      this.blockId = newId;
    }
  },
})
