<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <button @click="$emit('close')" class="close-button">✖</button>
        <slot name="header"></slot>
      </div>

      <div class="modal-body">
        <slot name="body"></slot>
      </div>

      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
  },
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--primaryColor);
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.0625rem solid var(--secondaryColor);
  background-color: var(--secondaryColor);
  border-radius: 0.5rem 0.5rem 0 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accentColor);
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--accentColor);
  cursor: pointer;
  padding: 0;
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: var(--primaryColor);
  opacity: 0.8;
}

.modal-body {
  padding: 1.5rem;
  color: var(--accentColor);
  line-height: 1.6;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: 0.0625rem solid var(--secondaryColor);
  background-color: var(--secondaryColor);
  border-radius: 0 0 0.5rem 0.5rem;
}

.modal-button {
  padding: 0.5rem 1rem;
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.25rem;
  background-color: var(--primaryColor);
  color: var(--accentColor);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.modal-button:hover {
  opacity: 0.8;
}

.modal-button.primary {
  background-color: var(--accentColor);
  color: var(--primaryColor);
  border-color: var(--accentColor);
}

.modal-button.primary:hover {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>