<template>
  <div class="color-picker-root">
    <label v-if="label" class="color-picker-label">{{ label }}</label>
    <ChromePicker :value="modelValue" @input="updateColor" />
  </div>
</template>

<script setup>
import { ChromePicker } from 'vue-color';
import 'vue-color/style.css';

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '#68CCCA',
  },
});
const emit = defineEmits(['update:modelValue']);

function updateColor(newColor) {
  emit('update:modelValue', newColor.hex || newColor);
}
</script>

<style scoped>
.color-picker-root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.color-picker-label {
  margin-left:2rem;
  margin-right:1rem;
  margin-top:1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  filter: invert(100%);
}
</style>