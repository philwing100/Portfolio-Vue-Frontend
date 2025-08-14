<template>
  <div
    class="slider-container"
    tabindex="0"
    @keydown.left.prevent="moveSlider(false)"
    @keydown.right.prevent="moveSlider(true)"
  >
    <label class="slider-label">{{ label }}</label>
    <div class="slider" @click="toggleSlider" :aria-checked="isChecked" role="switch">
      <!--Needs to switch between an icon of one person and multiple -->
      <div class="slider-tab" :class="{ 'slider-checked': isChecked }">{{ isChecked ? Yes : No }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BooleanSlider',
  props: {
    label: {
      type: String,
      default: '',
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
      this.$emit('update:modelValue', this.isChecked); // Emit for v-model binding
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

//ee
</script>

<style scoped>
.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.slider-label {
  text-align: center;
  margin-bottom: 0.125rem;
  font-size: 1rem;
}

.slider {
  position: relative;
  width: 5rem;
  height: 1.875rem;
  border-radius: 0.9375rem;
  display: flex;
  align-items: center;
  padding: 0 0.3125rem;
  transition: background-color 0.3s ease;
}

.slider-checked {
  transform: translateX(2.5rem);
}

.slider-tab {
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  background-color: var(--accentColor);
  position: absolute;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  user-select: none;
  pointer-events: none;
}

.slider[aria-checked="true"] {
  background-color: var(--accentColor);
}

.slider[aria-checked="false"] {
  background-color: var(--secondaryColor);
}
</style>