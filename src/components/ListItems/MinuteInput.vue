<template>
  <div class="minute-input">
    <input
      type="text"
      :value="minutes"
      @input="validateInput"
      @keypress="restrictToNumbers"
      @focus="showTooltip"
      @blur="hideTooltip"
      class="minute-input-field"
      placeholder="Duration"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      minutes: this.modelValue, // Bind to modelValue instead of initialMinutes
      tooltipVisible: false,
    };
  },
  methods: {
    validateInput(event) {
      const num = Number(event.target.value);
      this.minutes = (1440 > num && num > 0 ? num : '');

      // Emit update:modelValue to enable two-way binding
      this.$emit('update:modelValue', String(this.minutes));
      console.log(this.minutes);
    },

    restrictToNumbers(event) {
      const key = event.key;
      if (!/[0-9]/.test(key)) {
        event.preventDefault();
      }
    },

    showTooltip() {
      if (this.minutes <= 0) {
        this.tooltipVisible = true;
      }
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
  },
  watch: {
    // Sync minutes if modelValue changes externally (e.g., from the parent)
    modelValue(newValue) {
      this.minutes = newValue;
    },
  },
};
</script>

<style scoped>
.minute-input {
  position: relative;
}

.minute-input-field {
  background-color: var(--secondaryColor);
  color: #cfcfcf;
  border: 1px solid white;
  border-radius: 4px;
  padding: 8px;
  width: 90%;
  cursor: text;
  -moz-appearance: textfield;
}

.minute-input-field::-webkit-inner-spin-button,
.minute-input-field::-webkit-outer-spin-button {
  display: none;
}

.tooltip {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #ffcc00;
  color: #000;
  padding: 5px;
  border-radius: 4px;
  z-index: 10;
}
</style>