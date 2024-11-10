<!--
 * @Author: yl_li
 * @Date: 2024-10-30
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-10
 * @description: todo 编辑页面
-->
<template>
  <div>
    <!-- 顶部 -->
    <div class="flex m-4 pb-3 border-b border-gray-300">
      <!-- 状态，是否完成 -->
      <div class="pr-3">
        <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" />
      </div>
      <div class="h-4 mt-1 border border-gray-300"></div>
      <DatePick />
    </div>
    <!-- 任务标题 -->
    <div>
      <TodoContentEdit v-model="todo.content"></TodoContentEdit>
    </div>
    <!-- 任务时间线 -->
    <TimeLine />

    


  </div>
</template>

<script setup lang="ts">
  import DatePick from '../components/todo/DatePick.vue';
  import TodoContentEdit from '../components/todo/TodoContentEdit.vue';
  import TimeLine from '../components/todo/TimeLine.vue';

  const props = defineProps<{
    todo: Todo,
  }>();
  


</script>

<style scoped></style>