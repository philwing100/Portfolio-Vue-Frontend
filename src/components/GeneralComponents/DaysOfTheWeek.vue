<template>
    <div class="days-container">
      <div
        v-for="(day, index) in daysOfWeek"
        :key="day.short"
        class="day-circle"
        :class="{ selected: isSelected(index) }"
        @click="toggleDay(index)"
      >
        {{ day.short }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      modelValue: {
        type: Number,
        default: 0, // Default to no days selected
      },
    },
    data() {
      return {
        daysOfWeek: [
          { short: "M", value: 1 },
          { short: "T", value: 2 },
          { short: "W", value: 4 },
          { short: "TH", value: 8 },
          { short: "F", value: 16 },
          { short: "S", value: 32 },
          { short: "S", value: 64 },
        ],
      };
    },
    computed: {
      selectedDays() {
        return this.modelValue;
      },
    },
    methods: {
      isSelected(index) {
        return (this.selectedDays & this.daysOfWeek[index].value) !== 0;
      },
      toggleDay(index) {
        const dayValue = this.daysOfWeek[index].value;
        const newDays = this.selectedDays ^ dayValue; // Toggle the bit
        this.$emit("update:modelValue", newDays);
      },
    },
  };
  </script>
  
  <style scoped>
  .days-container {
    display: flex;
    gap: 8px;
  }
  
  .day-circle {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: black;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .day-circle.selected {
    background-color: darkblue;
  }
  </style>
  