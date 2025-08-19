<template>
  <div class="drawer-overlay" @click.self="closeDrawer">
    <div class="drawer-sheet">
      <div class="drawer-header">
        <span class="drawer-title">More Options</span>
        <Button class="drawer-close-btn" @click="closeDrawer">✕</Button>
      </div>
      <div class="drawer-body">
        <!-- Example: Insert event to calendar lists -->
        <Button class="drawer-insert-btn" @click="insertEvent">Insert Event</Button>
        <!-- Add more input options here as needed -->
      </div>
    </div>
  </div>
</template>

<script>
import Button from '../GeneralComponents/Button.vue';

export default {
  name: 'Drawer',
  components: { Button },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeDrawer() {
      this.$emit('close');
    },
    insertEvent() {
      this.$emit('insert', { ...this.event });
    },
  },
};
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 3000;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
}

.drawer-sheet {
  background: var(--primaryColor);
  width: 22rem;
  max-width: 100vw;
  height: 100%;
  box-shadow: -2px 0 16px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.drawer-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accentColor);
}

.drawer-close-btn {
  background: transparent;
  color: var(--accentColor);
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.drawer-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drawer-insert-btn {
  background: var(--accentColor);
  color: var(--primaryColor);
  border-radius: 0.25rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  cursor: pointer;
}
.drawer-insert-btn:hover {
  background: var(--secondaryColor);
  color: var(--accentColor);
}
</style>