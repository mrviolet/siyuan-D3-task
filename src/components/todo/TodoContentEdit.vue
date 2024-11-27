<!--
 * @Author: yl_li
 * @Date: 2024-11-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-21
 * @description: 适配 todo edit 的文本编辑
-->

<template>
  <div class="">
    <pre class="ml-[-12px] text-lg font-medium text-slate-300 cursor-text mt-content-edit" v-if="!text" @click="focusInput">
    准备做什么？
  </pre>
    <div ref="editableDiv" class="outline-none ml-2 mb-4 font-medium text-lg break-all" contenteditable spellcheck="false"
      @input="updateText">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue']);

  const text = ref(props.modelValue);

  // 同步输入内容
  const updateText = (event: any) => {
    const newValue = event.target.innerText;
    text.value = newValue;
    emit('update:modelValue', newValue);
  };

  // 监听 modelValue 的变化，并同步到编辑器
  watch(
    () => props.modelValue,
    (newValue) => {
      text.value = newValue;
    }
  );

  // 焦点转移到可编辑区域
  const editableDiv = ref<HTMLDivElement | null>(null);
  const focusInput = () => {
    editableDiv.value?.focus();
  };
</script>

<style scoped>
  .mt-content-edit {
    height: 0;
    overflow: visible;
    direction: ltr;
    font-family: var(--b3-font-family);
  }
</style>
