<!--
 * @Author: yl_li
 * @Date: 2024-09-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-09
 * @description: 
-->
<template>
  <div class="rounded-lg hover:bg-[#f4f7fc] cursor-pointer p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5">
    <IconDom />
    <span class="self-center">{{ lable }}</span>
  </div>
</template>
<script setup lang="ts">
import { h } from 'vue';
import { Icon } from '@icon-park/vue-next/lib/runtime';

const props = defineProps<{
  icon: Icon
  lable: string
}>();

const IconDom = h(props.icon, {
  class: ['self-center', 'p-0.5'],
  theme: 'outline',
  size: '14',
  fill: '#333'
})
</script>