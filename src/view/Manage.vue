<!--
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-09
 * @description: 任务管理主页面
-->
<template>
  <div class="d3-mt h-full">
    <div class="bg-[#eee9dc] min-h-full flex gap-x-2 p-2 mt-manage-base">
      <!-- 左侧导航栏 -->
      <div class="flex-none w-64">
        <!-- 导航栏上行固定部分 -->
        <div class="grid gap-y-1.5">
          <D3MenuItem lable="今天" :icon=CheckCorrect />
          <D3MenuItem lable="明天" :icon=Plan />
          <D3MenuItem lable="收集箱" :icon=AllApplication />
        </div>
        <!-- 导航栏下行, 笔记列表部分 -->
        <div>
          <D3MenuGroup v-for="item in navList" :key="item.id" :lable="item.label" :child="item.child" />
        </div>
      </div>
      <!-- 中间工作区 -->
      <div class="flex-auto w-64  bg-white rounded-lg">
        02
      </div>
      <!-- 右侧编辑区 -->
      <div class="flex-auto w-22 bg-white rounded-lg">
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import D3MenuItem from '../components/menu/D3MenuItem.vue';
import D3MenuGroup from '../components/menu/D3MenuGroup.vue';

import { AllApplication, CheckCorrect, Plan } from '@icon-park/vue-next'
import { getNotebookList } from '../api/SiyuanApi';

let navList = [
  { label: 'AAAAAA', id: '12', child: [{ label: 'aaaaaa', id: '122', child: [{ label: '1111111', id: '1233' }] }, { label: '2222222', id: '1243'}] },
  { label: 'BBBBBB', child: [], id: '1343' },
]

getNotebookList().then(res => {
  console.log(res);
})
</script>

<style lang="css">
.mt-manage-base svg {
  fill: none;
}
</style>
