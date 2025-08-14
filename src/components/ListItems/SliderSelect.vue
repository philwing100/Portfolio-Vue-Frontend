<template>
  <div class="button-container" @keydown="handleKeydown" tabindex="0" ref="container">
    <div class="slider" :style="{ left: sliderPosition + 'px' }">
      <div class="slider-text">{{ currentMode }}</div>
    </div>
    <div class="option-button option-1" :class="{ active: currentMode === 'Mode 1' }">Mode 1</div>
    <div class="option-button option-2" :class="{ active: currentMode === 'Mode 2' }">Mode 2</div>
    <div class="option-button option-3" :class="{ active: currentMode === 'Mode 3' }">Mode 3</div>
  </div>
</template>

<script>
export default {
  name: 'YesNoSlider',
  props: {
    label: {
      type: String,
      default: 'Yes/No' // Default label text
    },
    value: {
      type: Boolean,
      default: false // Default checked state
    }
  },
  data() {
    return {
      isChecked: this.value // Initialize with the prop value
    };
  },
  watch: {
    value(newValue) {
      this.isChecked = newValue; // Update local state when parent prop changes
    },
    isChecked(newVal) {
      // Ensure slider tab moves whenever isChecked changes (direct or via task load)
      this.updateSliderTabPosition(newVal);
    }
  },
  computed: {
    sliderTabStyle() {
      return {
        transform: this.isChecked ? 'translateX(40px)' : 'translateX(0px)',
        transition: 'transform 0.3s ease'
      };
    }
  },
  methods: {
    emitSliderChange() {
      this.$emit('checkbox-toggled', this.isChecked); // Emit the slider state to the parent
      this.$emit('input', this.isChecked); // Emit input event for v-model binding
    },
    toggleSlider() {
      this.isChecked = !this.isChecked;
      this.emitSliderChange(); // Emit the change
    },
    moveSlider(direction) {
      // Handle arrow key navigation: true for right (Yes), false for left (No)
      if (direction && !this.isChecked) {
        this.isChecked = true;
      } else if (!direction && this.isChecked) {
        this.isChecked = false;
      }
      this.emitSliderChange(); // Emit the change
    },
    updateSliderTabPosition(isChecked) {
      // Additional method to handle external updates to the slider's checked state
      this.isChecked = isChecked;
    }
  },
  mounted() {
    this.isChecked = this.value; // Set initial state based on prop value
  }
};

</script>

<style scoped>
.button-container {
  display: inline-block;
  position: relative;
  background-color: var(--secondaryColor);
  border-radius: 30px;
  width: 300px;
  height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  outline: none; /* Remove default focus outline */
}

.option-button {
  position: absolute;
  display: inline-block;
  width: 100px;
  height: 100%;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
  color: #666;
  transition: color 0.3s ease;
}

.option-button.active {
  color: var(--accentColor);
}

.slider {
  position: absolute;
  width: 100px;
  height: 100%;
  background-color: var(--primary);
  border-radius: 30px;
  transition: 0.3s ease;
}

.slider-text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--accentColor);
  font-weight: bold;
}

.option-1 {
  left: 0;
}

.option-2 {
  left: 100px;
}

.option-3 {
  left: 200px;
}
</style>