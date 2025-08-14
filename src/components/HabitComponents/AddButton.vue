<template>
  <button class="add-button" @click="$emit('click')">
    +
  </button>
</template>

<script>
export default {
  name: "AddButton",
};
</script>

<style scoped>
.add-button {
  width: 4rem;
  height: 4rem;
  background-color: var(--secondaryColor);
  color: var(--accentColor);
  font-size: 2.5rem;
  border: none;
  border-radius: 0.75rem; /* Rounded but still square-ish */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button:hover {
  background-color: var(--accentColor);
  color: var(--primary);
  transform: scale(1.05);
}
</style>
