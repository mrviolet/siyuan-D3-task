<!--
 * @Author: yl_li
 * @Date: 2024-10-22
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-22
 * @description: 
-->
<template>
  <div v-for="item in props.list">
    {{ item }}
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  list: Todo[],
}>();

</script>
