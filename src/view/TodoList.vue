<!--
 * @Author: yl_li
 * @Date: 2024-10-22
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-11
 * @description: 任务列表，暴漏两个事件，selected 和 change
 * 1、changed - 当 todo 的完成状态发生变化时触发, 参数1为 block id, 参数2为 true 或 false
 * 2、pick - 当 todo 被选中时触发, 参数为 block id
-->
<template>
  <div>
    <div class="px-1.5">
      <TodoListItem v-for="item in props.list" :key="item.blockId" :todo="item" @changed="changeTodoState"
        @pick="pickTodo" />
    </div>
    <div class="pl-3 py-1 border-l-4 border-gray-300" v-if="list.length === 0">
      <sunset class="h-[20px]" theme="outline" size="24" fill="#d9b7af" />
      <span class="h-[20px] font-bold	ml-3 text-base text-gray-400">没有可做的</span>
      <div class="mt-1 text-gray-400">休息一下是合法的~</div>
    </div>
  </div>

</template>

<script setup lang="ts">
  import TodoListItem from '../components/todo/TodoListItem.vue';
  import { Sunset } from '@icon-park/vue-next'

  const eventHandler = defineEmits(['pick', 'changed']);
  const props = defineProps<{
    list: Todo[]
  }>();


  function changeTodoState(param: any) {
    eventHandler('changed', param)
  }


  function pickTodo(blockid: string) {
    eventHandler('pick', blockid)
  }

</script>

<style scoped></style>
