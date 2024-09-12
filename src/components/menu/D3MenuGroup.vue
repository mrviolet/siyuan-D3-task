<!--
 * @Author: yl_li
 * @Date: 2024-09-09
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-11
 * @description: 
-->
<template>
  <div v-for="nav in navs" :key="nav.id">
    <div class="rounded-lg cursor-pointer hover:bg-[#f4f7fc] p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5">
      <IconComponent :nav="nav" @click="toggleChildVisibility(nav)" />
      <span class="self-center">{{ nav.label }}</span>
    </div>
    <div class="pl-3">
      <D3MenuGroup v-if="isChildVisible[nav.id] && nav.child && nav.child.length" :navs="nav.child" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import { RightSquare, DownSquare, Round } from '@icon-park/vue-next'
import { getFileTree } from '../../api/MtaskApi';

const props = defineProps<{
  navs: Nav[]
}>();

const isChildVisible = ref<Record<string, boolean>>({});
const emitHandler = defineEmits(['showChild']);
const IconComponent = (props: { nav: Nav }) => {
  if (props.nav.child) {
    return h(
      isChildVisible.value[props.nav.id] ? DownSquare : RightSquare, {
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

function toggleChildVisibility(nav: Nav) {
  isChildVisible.value[nav.id] = !isChildVisible.value[nav.id];
  getFileTree({ path: nav.path, notebook: nav.notebook }).then(res => {
    if (res.length != 0) {
      nav.child = res.map((item: { id: string, name: string, path: string}) => {
        return {
          id: item.id,
          label: item.name.replace('.sy', ""),
          path: item.path,
          notebook: nav.notebook,
          child: []
        }
      })
    } else {
      nav.child = undefined;
    }
  })

}

</script>
