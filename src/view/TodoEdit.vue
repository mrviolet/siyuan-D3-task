<!--
 * @Author: yl_li
 * @Date: 2024-10-30
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-04
 * @description: todo 编辑页面, 暴漏 changed 事件
 * type = time, 修改完成时间
 * type = content, 修改内容
 * type = state, 修改状态
-->
<template>
  <div class="flex flex-col h-full">
    <!-- 顶部 -->
    <div class=" flex-none flex m-2 pb-3 border-b border-gray-300">
      <!-- 状态，是否完成 -->
      <div class="pr-3">
        <input @change="changeTodoState" type="checkbox" v-model="todo.isFinished"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" />
      </div>
      <!-- 分割线 -->
      <div class="h-4 mt-1 border border-gray-300"></div>
      <!-- 计划完成时间 -->
      <DatePicker class="ml-3" v-model="todo.planTime" @changed="changePlanTime" />
    </div>
    <!-- 任务标题 -->
    <TodoContentEdit class="flex-auto overflow-y-auto" @changed="changeContent" v-model="todo.mk" />
    <!-- 工具条 -->
    <div class="flex-none mx-1 mt-1.5">
      <!-- 复制块id -->
      <!-- <svg class="popover__block" data-id="20241126104059-q09riq5" style=""><use xlink:href="#iconFile"></use></svg> -->
      <copy-link class="mx-1" theme="outline" size="16" fill="#333" @click="copyBlockId" />
      <!-- 查看块详情, 聚焦 -->
      <scanning class="mx-1 popover__block" size="16" :data-id="todo.pid" fill="#333" />
      <!-- 跳转块位置 -->
      <copy-link class="mx-1" theme="outline" size="16" fill="#333" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import DatePicker from '../components/todo/DatePicker.vue';
  import TodoContentEdit from '../components/todo/TodoContentEdit.vue';
  import { CopyLink, Scanning } from '@icon-park/vue-next'
  import { pushMsg } from '../api/MtaskApi';

  const props = defineProps<{
    todo: Todo,
  }>();

  const eventHandler = defineEmits(['changed']);
  function copyBlockId() {
    const pBlockId = props.todo.pid
    if (pBlockId) {
      navigator.clipboard.writeText(pBlockId)
      pushMsg(`已复制块 ID 至剪切板(${pBlockId})`)
    }
  }

  /**
   * 完成/取消完成 todo
   * @param event 
   */
  function changeTodoState(event: Event) {
    const target = event.target as HTMLInputElement;
    const param = { type: 'state', blockId: props.todo.blockId, pid: props.todo.pid, val: target.checked }
    if (target.checked) { pushMsg("完成任务") } else { pushMsg("取消完成任务") }
    eventHandler('changed', param)
  }

  /**
   * 修改完成时间
   * @param val 
   */
  function changePlanTime(val: string) {
    const param = { type: 'time', blockId: props.todo.blockId, pid: props.todo.pid, val }
    eventHandler('changed', param)
  }

  /**
   * 修改内容
   * @param val 
   */
  function changeContent(val: string) {
    const param = { type: 'content', blockId: props.todo.blockId, pid: props.todo.pid, val }
    eventHandler('changed', param)
  }

</script>

<style scoped></style>
