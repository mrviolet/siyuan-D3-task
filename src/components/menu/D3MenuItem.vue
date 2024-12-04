<!--
 * @Author: yl_li
 * @Date: 2024-09-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-01
 * @description: 侧边栏的最小元素，一个图标+文字
-->
<template>
  <div class="rounded-lg hover:bg-[#f4f7fc] cursor-pointer p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5"
    :style="{ backgroundColor: navSelected.navid == props.id ? '#f4f7fc' : '' }" @click="clickNav">
    <IconDom />
    <span class="self-center">{{ lable }}</span>
  </div>
</template>
<script setup lang="ts">
  import { h } from 'vue';
  import { Icon } from '@icon-park/vue-next/lib/runtime';
  import { useNavStore } from '../../stores/mtask';

  const props = defineProps<{
    icon: Icon
    lable: string
    id: string
  }>();

  const navSelected = useNavStore();
  const emitHandler = defineEmits(['clickNav']);

  const IconDom = h(props.icon, {
    class: ['self-center', 'p-0.5'],
    theme: 'outline',
    size: '14',
    fill: '#333'
  })

  function clickNav() {
    emitHandler('clickNav', { navid: props.id, level: -1, label: props.lable })
  }
</script>