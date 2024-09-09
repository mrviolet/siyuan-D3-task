<!--
 * @Author: yl_li
 * @Date: 2024-09-09
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-09
 * @description: 
-->
<template>
  <div>
    <div class="rounded-lg cursor-pointer hover:bg-[#f4f7fc] p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5">
      <IconComponent @click="toggleChildVisibility" />
      <span class="self-center">{{ lable }}</span>
    </div>
    <D3MenuGroup class="pl-3" v-if="isChildVisible && child && child.length"
      v-for="(item, index) in child" :key="index" :lable="item.label" :child="item.child" />
  </div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import { RightSquare, DownSquare, Round } from '@icon-park/vue-next'

const props = defineProps<{
  lable: string,
  child?: any[]
}>();

const isChildVisible = ref(false);

const IconComponent = () => {
  if (props.child && props.child.length > 0) {
    return h(
      isChildVisible.value ? DownSquare : RightSquare, {
      class: ['self-center', 'p-0.5', 'rounded-sm', 'hover:bg-[#d1e2ff]'],
      theme: 'outline',
      size: '14',
      fill: '#333'
    });
  } else {
    return h(
      Round, {
      class: ['self-center', 'py-0.5', 'px-1.5', 'rounded-sm'],
      theme: 'filled',
      size: '6',
      fill: '#9b9b9b'
    });
  }
}

function toggleChildVisibility() {
  isChildVisible.value = !isChildVisible.value;
}

</script>
