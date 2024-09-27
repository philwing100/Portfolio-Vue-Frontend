<template>
  <div class="minute-input">
    <input
      type="text"
      v-model="minutes"
      @input="validateInput"
      @keypress="restrictToNumbers"
      @focus="showTooltip"
      @blur="hideTooltip"
      class="minute-input-field"
      placeholder="Minute Estimate"
    />
  </div>
</template>

<script>
export default {
  props: {
    initialMinutes: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      minutes: this.initialMinutes, // Holds the minute value
      tooltipVisible: false, // Controls tooltip visibility
    };
  },
  methods: {
    // Method to ensure input contains only valid numbers
    validateInput() {
      // Ensure that only valid numbers are input
      const num = Number(this.minutes);
      
      // If the input is not a valid number or is less than or equal to 0, reset it
      if (isNaN(num) || num <= 0) {
        this.minutes = ''; // Reset to empty if invalid
      } else {
        this.minutes = num; // Set valid number as minutes
      }
      this.$emit('time-selected', this.minutes); // Emit the selected minutes to the parent component
    },
    
    // Restrict input to numbers only in real-time
    restrictToNumbers(event) {
      const key = event.key;
      // Allow only numeric characters and prevent any others from being typed
      if (!/[0-9]/.test(key)) {
        event.preventDefault();
      }
    },
    
    // Tooltip visibility management
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
    // Update minutes if the parent passes a new initialMinutes value
    initialMinutes(newValue) {
      if (newValue > 0) {
        this.minutes = newValue;
      }
    },
  },
  mounted() {
    // Emit the initial value when the component is mounted
    this.$emit('time-selected', this.minutes);
  },
};
</script>

<style scoped>
.minute-input {
  position: relative;
}

.minute-input-field {
  background-color: #1e1e1e;
  color: #cfcfcf;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  padding: 8px;
  width: 90%;
  cursor: text;
  -moz-appearance: textfield; /* Remove number input styling */
}

.minute-input-field::-webkit-inner-spin-button,
.minute-input-field::-webkit-outer-spin-button {
  display: none; /* Hide the spin buttons in Chrome */
}

.tooltip {
  position: absolute;
  top: 40px; /* Adjust based on layout */
  left: 0;
  background-color: #ffcc00;
  color: #000;
  padding: 5px;
  border-radius: 4px;
  z-index: 10;
}
</style>
