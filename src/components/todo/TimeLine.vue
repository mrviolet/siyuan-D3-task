<!--
 * @Author: yl_li
 * @Date: 2024-11-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-25
 * @description: 
-->
<template>
  <div class=" overflow-y-auto ">
    <ol class="border-s border-gray-200 relative mx-2">
      <li class="ms-4" v-for="(item, index) in data" :key="index">
        <div class=" absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white" />
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 ">
          {{ item.time }}
        </time>
        <p class="mb-4 text-base font-normal text-gray-500 ">
          {{ item.content }}
        </p>
      </li>

    </ol>
  </div>
</template>

<script setup lang="ts">
  const data = [
    { time: '2024/2/1', 'content': '创建任务' },
    { time: '2024/4/1', 'content': '调整任务, 设置完成时间为 2024/4/1' },
    { time: '2024/6/1', 'content': '调整任务, 设置完成时间为 2024/8/1' },
    { time: '2024/12/1', 'content': '完成任务' }
  ]
</script>

<style scoped></style>
