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
  data() {
    return {
      modes: ['Mode 1', 'Mode 2', 'Mode 3'],
      currentModeIndex: 0,
      sliderPosition: 0,
    };
  },
  computed: {
    currentMode() {
      return this.modes[this.currentModeIndex];
    }
  },
  methods: {
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.currentModeIndex = (this.currentModeIndex + 1) % this.modes.length;
      } else if (event.key === 'ArrowLeft') {
        this.currentModeIndex = (this.currentModeIndex - 1 + this.modes.length) % this.modes.length;
      }
      this.updateSliderPosition();
      this.$emit('mode-changed', this.currentMode); // Emit the current mode to the parent
    },
    updateSliderPosition() {
      this.sliderPosition = this.currentModeIndex * 100;
    }
  },
  mounted() {
    this.$refs.container.focus(); // Automatically focus on the component
  }
};
</script>
<style scoped>
.button-container {
  display: inline-block;
  position: relative;
  background-color: #f1f1f1;
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
  color: #2d5dc7;
}

.slider {
  position: absolute;
  width: 100px;
  height: 100%;
  background-color: #2d5dc7;
  border-radius: 30px;
  transition: 0.3s ease;
}

.slider-text {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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