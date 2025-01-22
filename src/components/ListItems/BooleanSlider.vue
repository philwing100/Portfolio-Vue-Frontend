<template>
  <div
    class="slider-container"
    tabindex="0"
    @keydown.left.prevent="moveSlider(false)"
    @keydown.right.prevent="moveSlider(true)"
  >
    <label class="slider-label">{{ label }}</label>
    <div class="slider" @click="toggleSlider" :aria-checked="isChecked" role="switch">
      <div class="slider-tab" :class="{ 'slider-checked': isChecked }">{{ isChecked ? 'Yes' : 'No' }}</div>
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
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.slider-label {
  text-align: center;
  margin-bottom: 2px;
  font-size: 16px;
}

.slider {
  position: relative;
  width: 80px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  transition: background-color 0.3s ease;
}

.slider-checked {
  transform: translateX(40px);
}

.slider-tab {
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background-color: #fff;
  position: absolute;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  user-select: none;
  pointer-events: none;
}

.slider[aria-checked="true"] {
  background-color: blue;
}

.slider[aria-checked="false"] {
  background-color: #383444;
}
</style>
