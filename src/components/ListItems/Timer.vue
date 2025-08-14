<template>


</template>

<script>


</script>

<style scoped>
.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  border: 0.125rem solid var(--secondaryColor);
  border-radius: 0.5rem;
  background-color: var(--primary);
  max-width: 18.75rem;
  margin: 0 auto;
}

.timer-display {
  font-size: 3rem;
  font-weight: bold;
  color: var(--accentColor);
  font-family: 'Courier New', monospace;
  min-width: 12.5rem;
  text-align: center;
}

.timer-controls {
  display: flex;
  gap: 0.75rem;
}

.timer-button {
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.start-button {
  background-color: var(--accentColor);
  color: var(--primary);
}

.start-button:hover {
  opacity: 0.8;
}

.pause-button {
  background-color: var(--secondaryColor);
  color: var(--accentColor);
}

.pause-button:hover {
  opacity: 0.8;
}

.reset-button {
  background-color: var(--secondaryColor);
  color: var(--accentColor);
}

.reset-button:hover {
  opacity: 0.8;
}

.timer-input {
  padding: 0.5rem 0.75rem;
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.25rem;
  font-size: 1rem;
  text-align: center;
  width: 5rem;
  background-color: var(--primary);
  color: var(--accentColor);
}
</style>