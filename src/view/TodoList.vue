<!--
 * @Author: yl_li
 * @Date: 2024-10-22
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-07
 * @description: 任务列表
-->
<template>
  <div class="px-1.5">
    <div class="flex border-b p-2 cursor-pointer mb-1 hover:bg-[#e5e7eb] hover:rounded-md" v-for="(item,index) in props.list"
      :style="itemStyle(item.blockId)" :key="item.blockId" @click="selectedItem(index)">
      <div class="flex items-center h-5">
        <!-- <input id="helper-checkbox" aria-describedby="helper-checkbox-text" type="checkbox" value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" /> -->
        <input type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" />
      </div>
      <div class="ms-4 mr-2 " style="max-width: calc(100% - 30px)">
        <label class="font-medium block text-gray-900 truncate">
          {{ item.content }}
        </label>
        <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500">
          {{ item.hpath }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTodoStore } from '../stores/mtask';

  const todoSelected = useTodoStore();
  const emitHandler = defineEmits(['selected']);

  const props = defineProps<{
    list: Todo[],
  }>();

  function selectedItem(index: number) {
    todoSelected.change(props.list[index].blockId)
    emitHandler('selected', props.list[index])
  }

  function itemStyle(blockId: string) {
    if (todoSelected.blockId == blockId) {
      return {
        'background-color': '#e5e7eb',
        'border-radius': '0.375rem'
      }
    }
  }

</script>

<style scoped></style>
