import { defineStore } from 'pinia'

/**
 * 侧边栏选择
 */
export const useNavStore = defineStore('navSelectId', {
  state: () => ({blockId: 'today'}),
  getters: {},
  actions: {
    change(newId:string) {
      this.blockId = newId;
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
