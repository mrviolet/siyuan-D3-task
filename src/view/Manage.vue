<!--
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-12
 * @description: 任务管理主页面
-->
<template>
  <div class="d3-mt h-full w-full flex ">
    <div class="bg-[#eee9dc] flex basis-full gap-x-2 p-2 mt-manage-base">
      <!-- 左侧导航栏 -->
      <div class="flex-none w-64 flex flex-col">
        <!-- 导航栏上行固定部分 -->
        <div class="grid gap-y-1">
          <D3MenuItem lable="今天" :icon=CheckCorrect />
          <D3MenuItem lable="明天" :icon=Plan />
          <D3MenuItem lable="收集箱" :icon=AllApplication />
        </div>
        <!-- 导航栏下行, 笔记列表部分 -->
        <!-- 标题 -->
        <div class="font-bold border-t border-slate-400 mx-3 pt-4 mt-4 mb-2">文档树</div>
        <!-- 导航组 -->
        <div class="overflow-y-auto mb-4">
          <D3MenuGroup class="grid gap-y-1 border-t" :navs="navList" />
        </div>
      </div>
      <!-- 中间工作区 -->
      <div class="flex-auto w-64 bg-white rounded-lg">
        02
      </div>
      <!-- 右侧编辑区 -->
      <div class="flex-auto w-22 bg-white rounded-lg">
        03
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import D3MenuItem from '../components/menu/D3MenuItem.vue';
import D3MenuGroup from '../components/menu/D3MenuGroup.vue';

import { AllApplication, CheckCorrect, Plan } from '@icon-park/vue-next'
import { getOpenNotebookList } from '../api/MtaskApi';
import { ref } from 'vue';

let navList = ref<Nav[]>([])

// 获取笔记本列表
getOpenNotebookList().then(res => {
  navList.value = res.map((item: { name: string; id: string; closed: boolean }):Nav => {
    return {
      label: item.name,
      id: item.id,
      child: [],
      notebook:item.id,
      path: '/'
    }
  })
})

// async function queryChild(param: { notebook: string, path: string,  }) {
//   await getFileTree(param).then(res => {
//     addNavChild(navList.value, res);
    
//     // navList.value?.forEach(nav => {
//     //   if (nav.id === id) {
//     //     nav.child = res.map((item: { name: string; id: string; closed: boolean }) => {
//     //       return {
//     //         label: item.name,
//     //         id: item.id,
//     //         child: []
//     //       }
//     //     })
//     //   }
//     // })
//   })
// }

// function addNavChild(sourseList, childList) {
//   const navList = ref<Nav[]>([])
//   navList.value = [
//     {
//       label: '笔记本',
//       id: 'notebook',
//       child: []
//     },
//     {
//       label: '文档',
//       id: 'doc',
//       child: []
//     },
//     {
//       label: '块',
//       id: 'block',
//      child: []
//     }
//   ]
// }
</script>

<style lang="css">
.mt-manage-base svg {
  fill: none;
}
</style>
