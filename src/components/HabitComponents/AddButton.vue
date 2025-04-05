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
  width: 64px;
  height: 64px;
  background-color: rgba(128, 128, 128, 0.3); /* semi-transparent gray */
  color: white;
  font-size: 2.5rem;
  border: none;
  border-radius: 12px; /* Rounded but still square-ish */
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button:hover {
  background-color: rgba(128, 128, 128, 0.5);
  transform: scale(1.05);
}
</style>
