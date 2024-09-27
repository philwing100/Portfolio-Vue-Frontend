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
      this.isChecked = newValue; // Update local state when prop changes
    }
  },
  methods: {
    emitCheckboxChange() {
      this.$emit('checkbox-toggled', this.isChecked); // Emit the checked state to the parent
      this.$emit('input', this.isChecked); // Emit input event for v-model binding
    },
    toggleCheckbox() {
      // Toggle the checkbox value when Enter is pressed
      this.isChecked = !this.isChecked;
      this.emitCheckboxChange(); // Emit the change
    }
  },
  mounted() {
    this.isChecked = this.value; // Set initial state based on prop value
  }
};
</script>

<style scoped>
.checkbox-container {
  background-color: red; /* Change as needed */
}
</style>
