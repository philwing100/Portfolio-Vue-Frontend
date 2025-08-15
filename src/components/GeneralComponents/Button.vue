<template>
  <button :class="['shadcn-btn', variant]" @click="onClick">
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  variant: {
    type: String,
    default: 'primary',
  },
});
</script>

<style scoped>
button {
  background-color: var(--secondaryColor);
  color: var(--accentColor);
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--primaryColor);
}

button:disabled {
  background-color: var(--secondaryColor);
  opacity: 0.6;
  cursor: not-allowed;
}
</style>