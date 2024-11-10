<!--
 * @Author: yl_li
 * @Date: 2024-11-10
 * @LastEditors: yl_li
 * @LastEditTime: 2024-11-10
 * @description: 
-->

<template>
  <div class="outline-none mx-4 font-medium text-lg whitespace-nowrap" contenteditable spellcheck="false"
    @input="updateText">
    {{ text }}
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
</script>

<style scoped></style>
