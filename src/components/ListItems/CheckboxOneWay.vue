<template>
  <div class="pretty-button-container">
    <button 
      class="pretty-button" 
      @mouseenter="hoverButton" 
      @mouseleave="resetButton" 
      @click="toggleCheck" 
      @keyup.enter="toggleCheck"
    >
      <span class="button-label">{{ buttonLabel }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PrettyButton',
  data() {
    return {
      isChecked: false, // Keeps track of whether the button is "checked"
    };
  },
  computed: {
    buttonLabel() {
      // Label changes based on whether the button is checked
      return this.isChecked ? '✓' : '';
    }
  },
  methods: {
    emitButtonChange() {
      this.$emit('checkbox-toggled', this.isChecked); // Emit the checked state to the parent
    },
    hoverButton(event) {
      // Temporarily show the checkmark on hover
      event.target.innerHTML = '✓';
    },
    resetButton(event) {
      // Reset the button to its actual checked state after hover
      event.target.innerHTML = '';
    },
    toggleCheck() {
      // Permanently check or uncheck the button on click
      this.isChecked = !this.isChecked;
      this.emitButtonChange();
    }
  }
};
</script>

<style scoped>
.pretty-button-container {
  display: inline-block;
  padding-left: 0.1875rem;
  margin-bottom: 0.125rem;
}

.pretty-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5625rem;
  height: 1.5625rem;
  background-color: var(--secondaryColor);
  border: 0.125rem solid var(--primary);
  border-radius: 0.3125rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, border-color 0.3s;
}

.pretty-button:hover {
  background-color: var(--primary);
  border-color: var(--accentColor);
}

.button-label {
  font-size: 1rem;
  color: var(--accentColor);
}

.pretty-button:hover .button-label {
  color: var(--accentColor);
}
</style>