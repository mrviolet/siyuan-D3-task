<!--
 * @Author: yl_li
 * @Date: 2024-09-09
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-30
 * @description: 循环的菜单, level 用于显示层级, 0级为笔记本, 1级及之后是文档
-->
<template>
  <div>
    <div class="mt-1" v-for="nav in navs" :key="nav.id">
      <div @click="clickNav(nav.id, nav.label)"
        class="rounded-lg cursor-pointer hover:bg-[#f4f7fc] p-1.5 pl-3 grid grid-cols-nav-i gap-x-1.5"
        :style="{ paddingLeft: (level + 0.75) + 'rem', backgroundColor: nav.id == navSelected.navid ? '#f4f7fc' : '' }">
        <IconComponent :nav="nav" @click.stop="toggleChildVisibility(nav)" />
        <span class="self-center">{{ nav.label }}</span>
      </div>
      <D3MenuGroup v-if="isChildVisible[nav.id] && nav.child && nav.child.length" :navs="nav.child" :level="level + 1"
        @clickNav="(param: any) => sendClickEmit(param, nav.label)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { h, ref } from 'vue';
  import { RightSquare, DownSquare, Round } from '@icon-park/vue-next'
  import { getFileTree } from '../../api/MtaskApi';
  import { useNavStore } from '../../stores/mtask';

  const emitHandler = defineEmits(['clickNav']);
  const navSelected = useNavStore();

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
        nav.child = res.map((item: { id: string, name: string, path: string }) => {
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
   * @param param 
  */
  function clickNav(id: string, label: string) {
    emitHandler('clickNav', { navid: id, level: props.level, label: label })
  }

  function sendClickEmit(param: any, label: string) {
    if (param.level != 0) {
      param.label = label + '/' + param.label
    }
    emitHandler('clickNav', param)

  }

</script>
