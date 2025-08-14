<template>
  <div
    class="slider-container"
    tabindex="0"
    @keydown.left.prevent="moveSlider(false)"
    @keydown.right.prevent="moveSlider(true)"
  >
    <label class="slider-label">{{ label }}</label>
    <div class="slider" @click="toggleSlider" :aria-checked="isChecked" role="switch">
      <div class="slider-tab" :class="{ 'slider-checked': isChecked }">{{ isChecked ? '' : '' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BooleanSlider',
  props: {
    label: {
      type: String,
      default: 'Yes/No',
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isChecked: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.isChecked = newValue; // Update local state when parent prop changes
    },
  },
  methods: {
    emitSliderChange() {
      this.$emit('update:modelValue', this.isChecked); // Emit for v-model bindingS
    },
    toggleSlider() {
      this.isChecked = !this.isChecked;
      this.emitSliderChange(); // Emit the change
    },
    moveSlider(direction) {
      // True for right arrow (Yes), false for left arrow (No)
      if (direction && !this.isChecked) {
        this.isChecked = true;
      } else if (!direction && this.isChecked) {
        this.isChecked = false;
      }
      this.emitSliderChange(); // Emit the change
    },
  },
  mounted() {
    this.isChecked = this.modelValue; // Set initial state based on prop value
  }
};
</script>

<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 0.3125rem 0;
}

.slider-label {
  font-size: 0.875rem;
  color: var(--accentColor);
  min-width: 7.5rem;
}

.slider-track {
  position: relative;
  width: 3.125rem;
  height: 1.5rem;
  background-color: var(--secondaryColor);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider-track.active {
  background-color: var(--accentColor);
}

.slider-thumb {
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--primary);
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
}

.slider-thumb.active {
  transform: translateX(1.625rem);
}
</style>