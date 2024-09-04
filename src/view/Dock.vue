<!--
 * @Author: yl_li
 * @Date: 2024-08-23
 * @LastEditors: yl_li
 * @LastEditTime: 2024-09-03
 * @description: 侧边栏
-->
<template>
  <div class="d3-mt">
    <div class="flex h-10 w-full bg-[#f7f7f5] pt-[6px] pb-[6px] pl-[10px] pr-[10px]">
      <!-- 标题 -->
      <div class="font-bold text-sm content-center">Mtask</div>
      <div class="flex-1"></div>
      <div class="grid grid-cols-4 gap-2 content-center">
        <!-- 刷新 -->
        <span class="rounded-sm hover:bg-[#ebebea] cursor-pointer p-[3px]">
          <svg class="w-[14px] h-[14px] text-[#a1a09c]">
            <use xlink:href="#iconRefresh" />
          </svg>
        </span>
        <!-- 最大化 -->
        <span class="rounded-sm hover:bg-[#ebebea] cursor-pointer p-[3px]" @click="openMtaskTab">
          <svg class="w-[14px] h-[14px] text-[#a1a09c]">
            <use xlink:href="#iconFullscreen"></use>
          </svg>
        </span>
        <!-- 更多 -->
        <span class="rounded-sm hover:bg-[#ebebea] cursor-pointer p-[3px]">
          <svg class="w-[14px] h-[14px] text-[#a1a09c]">
            <use xlink:href="#iconMore"></use>
          </svg>
        </span>
        <!-- 最小化 -->
        <span class="rounded-sm hover:bg-[#ebebea] cursor-pointer p-[3px]" @click="closeDock">
          <svg class="w-[14px] h-[14px] text-[#a1a09c]">
            <use xlink:href="#iconMin"></use>
          </svg>
        </span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { closeDock,openMtaskTab } from '../utils/systemUtil';

</script>

<style lang="css"></style>
