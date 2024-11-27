<!--
 * @Author: yl_li
 * @Date: 2024-10-30
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-26
 * @description: todo 编辑页面
-->
<template>
  <div class="flex flex-col h-full">
    <!-- 顶部 -->
    <div class=" flex-none flex m-2 pb-3 border-b border-gray-300">
      <!-- 状态，是否完成 -->
      <div class="pr-3">
        <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" />
      </div>
      <!-- 分割线 -->
      <div class="h-4 mt-1 border border-gray-300"></div>
      <!-- 计划完成时间 -->
      <DatePicker class="ml-3" v-model="todo.planTime" />
    </div>
    <!-- 任务标题 -->
    <TodoContentEdit class="flex-auto" v-model="todo.content"></TodoContentEdit>
    <!-- 工具条 -->
    <div class="flex-none mx-1">
      <!-- 复制块id -->
      <copy-link class="mx-1" theme="outline" size="16" fill="#333" @click="copyBlockId" />
      <!-- 查看块详情 -->
      <copy-link class="mx-1" theme="outline" size="16" fill="#333" />
      <!-- 跳转块位置 -->
      <copy-link class="mx-1" theme="outline" size="16" fill="#333" />
    </div>
    <!-- 任务时间线 -->
  </div>
</template>

<script setup lang="ts">
  import DatePicker from '../components/todo/DatePicker.vue';
  import TodoContentEdit from '../components/todo/TodoContentEdit.vue';
  import { CopyLink, } from '@icon-park/vue-next'
  import { pushMsg } from '../api/MtaskApi';

  import { ref } from 'vue';

  const props = defineProps<{
    todo: Todo,
  }>();

  const date = ref({});

  function copyBlockId() {
    const blockId = props.todo.blockId
    if(blockId) {
      navigator.clipboard.writeText(blockId)
      pushMsg(`已复制块 ID 至剪切板(${blockId})`)
    }
  }

</script>

<style scoped></style>