<template>
    <div class="checkbox-container">
      <label for="checkbox-input">{{ label }}</label>
      <input
        type="checkbox"
        id="checkbox-input"
        v-model="isChecked"
        @change="emitCheckboxChange"
        @keyup.enter="toggleCheckbox"
        tabindex="0" />
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckboxInput',
    props: {
      label: {
        type: String,
        default: 'Checkbox' // Default label text
      }
    },
    data() {
      return {
        isChecked: false
      };
    },
    methods: {
      emitCheckboxChange() {
        this.$emit('checkbox-toggled', this.isChecked); // Emit the checked state to the parent
      },
      toggleCheckbox() {
        // Toggle the checkbox value when Enter is pressed
        this.isChecked = !this.isChecked;
        this.emitCheckboxChange(); // Emit the change
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  