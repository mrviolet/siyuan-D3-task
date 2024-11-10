<!--
 * @Author: yl_li
 * @Date: 2024-11-06
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-11
 * @description: 日期选择器, 基于 vue-datepicker 实现，使用 date-fns 汉化
-->
<template>
  <!-- 日期选择器 -->
  <div class="p-0.5 pt-[1px] rounded-md cursor-pointer	 text-[14px] hover:bg-[#e5e7eb]">
    <VueDatePicker :modelValue="modelValue" position="left" :format-locale="zhCN" :enable-time-picker="false"
      :ui="{ menu: 'd3-datepicker', calendarCell: 'd3-datepicker-cell' }" cancelText="清除" selectText="确定"
      @update:modelValue="handleDate">
      <template #arrow-left>
        <left theme="outline" size="24" fill="#333" />
      </template>
      <template #arrow-right>
        <Right theme="outline" size="24" fill="#333" />
      </template>
      <template #calendar-icon>
        <CalendarThree theme="outline" size="24" fill="#333" />
      </template>
      <template #trigger>
        <span class="clickable-text" :style="warningStyle">
          <CalendarThree class="mr-2" theme="outline" />
          <span>{{ dateStr }}{{ dateMesage }}</span>
        </span>
      </template>
    </VueDatePicker>
  </div>
</template>

<script setup lang="ts">
  import '@vuepic/vue-datepicker/dist/main.css'
  import VueDatePicker from '@vuepic/vue-datepicker';
  import { zhCN } from 'date-fns/locale';
  import { format, differenceInCalendarDays } from 'date-fns';

  import { computed } from 'vue';
  import { CalendarThree, Left, Right } from '@icon-park/vue-next'

  const props = defineProps<{
    modelValue: Date,
  }>();

  const emit = defineEmits(['update:modelValue']);

  /**
 * 更新日期
 */
  const handleDate = (newDate: Date) => {
    emit('update:modelValue', newDate); // 使用 emit 更新父组件的 modelValue
  };

  /**
   * 格式化后的日期信息
   */
  const dateStr = computed(() => {
    if (!props.modelValue) {
      return '请选择完成时间';
    }
    return format(props.modelValue, 'yyyy年MM月dd日')
  })

  /**
   * 分析后的日期信息, 例如xx天前, xx天后, 今天, 明天, 设置完成日期
   */
  const dateMesage = computed(() => {
    if (!props.modelValue) {
      return '';
    }
    const now = new Date();
    const diffDays = differenceInCalendarDays(props.modelValue, now);
    return diffDays === 0
      ? ' ,今天'
      : diffDays === 1
        ? ' ,明天'
        : diffDays > 0
          ? ` ,${diffDays}天后`
          : ` ,${Math.abs(diffDays)}天前`;
  })

  /**
   * 提醒，如果完成时间是今天之前，红色提示
   */
  const warningStyle = computed(() => {
    if (!props.modelValue) {
      return {};
    }
    const now = new Date();
    if (differenceInCalendarDays(props.modelValue, now) < 0) {
      return { color: '#e13e39', fontWeight: '500' }
    }
  })
</script>

<style>

  /* 去掉下拉上的小三角 */
  .dp__arrow_top {
    display: none !important;
  }

  .d3-datepicker-cell {
    font-size: 12px;
    border-radius: 36%;
    width: 30px;
    height: 30px;
  }

  .dp__active_date {
    font-weight: bold;
  }

  .dp__calendar_header_item {
    font-size: 12px;
    color: #a3a3a3;
  }

  .dp__calendar_header_separator {
    display: none;
  }
</style>
