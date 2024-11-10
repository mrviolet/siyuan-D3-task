<!--
 * @Author: yl_li
 * @Date: 2024-11-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-06
 * @description: 日期选择器
-->
<template>
  <!-- 日期选择器 -->
  <div class="pl-3 text-[14px]">
    <VueDatePicker v-model="planDate">
      <template #trigger>
        <span class="clickable-text">
          <CalendarThree class="mr-2" theme="outline" />
          <span>7天后, 2024年7月7日</span>
        </span>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'
  import VueDatePicker from '@vuepic/vue-datepicker';

  import { ref, watch, computed } from 'vue';
  import { CalendarThree } from '@icon-park/vue-next'

  /**
   * 可读的日期信息, 例如xx天前, xx天后, 今天, 明天, 设置完成日期
   */
  const dateMesage = ref('');
  /**
   * 计划完成日期
   */
  const planDate = ref(new Date());
</script>

<style scoped></style>
