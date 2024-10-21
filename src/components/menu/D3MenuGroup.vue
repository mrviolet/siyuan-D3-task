<!--
 * @Author: yl_li
 * @Date: 2024-09-09
 * @LastEditors: yl_li
 * @LastEditTime: 2024-10-22
 * @description: 循环的菜单, level 用于显示层级, 0级为笔记本, 1级及之后是文档
-->
<template>
  <div>
    <div v-for="nav in navs" :key="nav.id">
      <div class="rounded-lg cursor-pointer hover:bg-[#f4f7fc] p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5" :style="{paddingLeft: (level + 0.75) + 'rem'}">
        <IconComponent :nav="nav" @click="toggleChildVisibility(nav)" />
        <span class="self-center" @click="clickNav(nav.id)">{{ nav.label }}</span>
      </div>
      <D3MenuGroup v-if="isChildVisible[nav.id] && nav.child && nav.child.length" :navs="nav.child" :level="level + 1" @clickNav="clickNav" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref } from 'vue';
import { RightSquare, DownSquare, Round } from '@icon-park/vue-next'
import { getFileTree } from '../../api/MtaskApi';

const emitHandler = defineEmits(['clickNav']);

const props = defineProps<{
  navs: Nav[],
  level: number
}>();

const isChildVisible = ref<Record<string, boolean>>({});
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

/**
 * 点击导航项时的处理函数
 * 
 * @param {string} navid - 被点击导航项的ID
 * 说明:
 * - 该函数会在点击特定导航项时被触发
 * - 通过 emitHandler 触发名为 'clickNav' 的自定义事件，并传递当前点击的导航项ID和导航级别
 * - 导航级别的信息通过 defineProps.level 获取，这是在组件中定义的属性
 */
function clickNav(param: any) {
  let emitParam = param
  if(!param.level) {
    emitParam = {navid:param, level:props.level}
  }
  emitHandler('clickNav', emitParam)
}

</script>
