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
.shadcn-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background: var(--primary);
  color: var(--accentColor);
  transition: background 0.15s, color 0.15s;
}
.shadcn-btn.primary {
  background: var(--primary);
  color: var(--accentColor);
}
.shadcn-btn.secondary {
  background: var(--secondaryColor);
  color: var(--accentColor--);
}
.shadcn-btn:hover {
  opacity: 0.85;
}
</style>