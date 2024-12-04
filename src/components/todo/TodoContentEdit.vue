<!--
 * @Author: yl_li
 * @Date: 2024-11-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-12-03
 * @description: 适配 todo edit 的文本编辑
-->

<template>
  <div class="">
    <pre class="ml-[-12px] text-lg font-medium text-slate-300 cursor-text mt-content-edit" v-if="!text && !isComposing"
      @click="focusInput">
    准备做什么？
    </pre>
    <div ref="editableDiv" class="outline-none ml-2 mb-4 font-medium text-lg break-all" contenteditable
      spellcheck="false" @input="updateText" @compositionstart="onCompositionStart" @compositionend="onCompositionEnd">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['changed']);

  // 标记是否处于输入法组合状态
  const isComposing = ref(false);
  const text = computed(() => props.modelValue);

  // 同步输入内容
  const updateText = (event: any) => {
    // 检查是否处于输入法组合状态
    if (event.inputType === 'insertCompositionText' || event.inputType === 'deleteCompositionText') {
      return;
    }
    const newValue = event.target.innerText;
    emit('changed', newValue);
  };

  // 焦点转移到可编辑区域
  const editableDiv = ref<HTMLDivElement | null>(null);
  const focusInput = () => {
    editableDiv.value?.focus();
  };


  // 输入法组合开始
  const onCompositionStart = () => {
    isComposing.value = true;
  };

  // 输入法组合结束
  const onCompositionEnd = (event: any) => {
    isComposing.value = false;
    // 在组合结束时再次触发更新
    const newValue = event.target.innerText;
    emit('changed', newValue);
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
