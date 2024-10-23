<!--
 * @Author: yl_li
 * @Date: 2024-10-22
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-23
 * @description: 
-->
<template>
  <div>
    <div class="flex items-start mb-2 mr-2 pb-2 border-b" v-for="item in props.list">
      <div>
        <input class="w-3 h-3" type="checkbox" />
      </div>
      <div class="ml-4 max-w-xs">
        <div class="truncate">{{ item.content }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


  const props = defineProps<{
    list: Todo[],
  }>();

</script>

<style scoped></style>
