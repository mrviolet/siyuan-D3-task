<!--
 * @Author: yl_li
 * @Date: 2024-11-26
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-27
 * @description: todo 列表的单个任务组件，暴漏两个事件
 * 1、changed - 当 todo 的完成状态发生变化时触发, 参数1为 block id, 参数2为 true 或 false
 * 2、pick - 当 todo 被选中时触发, 参数为 block id
 *
-->

<template>
  <div class="flex border-b p-2 cursor-pointer mb-1 hover:bg-[#e5e7eb] hover:rounded-md" :style="itemStyle()"
    @click="pickTodo">
    <div class="flex items-center h-5">
      <input type="checkbox" @change="changeTodoState"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0" />
    </div>
    <div class="ms-4 mr-2 flex-grow" :style="{'max-width': todo.planTime ? 'calc(100% - 118px)' : 'calc(100% - 30px)'}">
      <label class="font-medium block text-gray-900 truncate">
        {{ todo.content }}
      </label>
      <p id="helper-checkbox-text" class="text-xs font-normal text-gray-500">
        {{ todo.hpath }}
      </p>
    </div>
    <div :class="{'text-rose-600': isOverdue, 'text-sky-600': !isOverdue}">
      {{ getPlanTime() }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useTodoStore } from '../../stores/mtask';
  import { pushMsg } from '../../api/MtaskApi';
  import { format, differenceInCalendarDays } from 'date-fns';

  const todoSelected = useTodoStore();
  const eventHandler = defineEmits(['pick', 'changed']);
  const props = defineProps<{
    todo: Todo,
  }>();


  /**
   * 完成/取消完成 todo
   * @param event 
   */
  function changeTodoState(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      pushMsg("完成任务")
      eventHandler('changed', { blockId: props.todo.blockId, state: true })
    } else {
      eventHandler('changed', { blockId: props.todo.blockId, state: false })
    }
  }


  /**
   * 选择 todo
   */
  function pickTodo() {
    eventHandler('pick', props.todo.blockId)
  }


  /**
   * todo 被选中时的样式
   */
  function itemStyle() {
    if (todoSelected.blockId == props.todo.blockId) {
      return {
        'background-color': '#e5e7eb',
        'border-radius': '0.375rem'
      }
    }
  }

  /**
   * 格式化为可读的计划完成日期
   */
  function getPlanTime() {
    if (props.todo.planTime == null) return '';
    return format(props.todo.planTime, 'yyyy/MM/dd')
  }

  /**
   * 是否超期
   */
  const isOverdue = computed(() => {
    if (!props.todo.planTime) return false;
    return differenceInCalendarDays(props.todo.planTime, new Date()) < 0
  });

</script>
