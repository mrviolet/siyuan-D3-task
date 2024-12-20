<!--
 * @Author: yl_li
 * @Date: 2024-11-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-20
 * @description: 时间线
-->
<template>
  <div class=" overflow-y-auto ">
    <ol class="border-s border-gray-200 relative mx-2">
      <li class="ms-4" v-for="(item, index) in data" :key="index">
        <div class=" absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white" />
        <time class="mb-1 text-xs font-normal leading-none text-gray-400 ">
          {{ item.time }}
        </time>
        <p class="mb-3 font-normal text-gray-500 ">
          {{ item.content }}
        </p>
      </li>

    </ol>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    data: Timeline[],
  }>();
</script>

<style scoped></style>
