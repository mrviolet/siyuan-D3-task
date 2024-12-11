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

/**
 * todo list 参数
 * 包括是否展示已完成任务, 是否展示倒计时
 */
export const useTodoListParamStore = defineStore('todoListParamId', {
  state: () => ({showFinished: false, showTimer: false}),
  getters: {},
  actions: {
    changeShowFinished(newVal:boolean) {
      this.showFinished = newVal;
    },
    changeShowTimer(newVal:boolean) {
      this.showTimer = newVal;
    }
  },
})
