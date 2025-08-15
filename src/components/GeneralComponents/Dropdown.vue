<template>
    <select @change="onSelect" :value="modelValue">
      <option v-for="(option, index) in options" :key="index" :value="getValue(option)">
        {{ getLabel(option) }}
      </option>
    </select>
  </template>

  <script>
  export default {
    name: "Dropdown",
    props: {
      options: {
        type: Array,
        required: true,
      },
      modelValue: [String, Number, Object], // For v-model binding
      labelKey: {
        type: String,
        default: null,
      },
      valueKey: {
        type: String,
        default: null,
      },
    },
    methods: {
      getLabel(option) {
        return this.labelKey ? option[this.labelKey] : option;
      },
      getValue(option) {
        return this.valueKey ? option[this.valueKey] : option;
      },
      onSelect(event) {
        const selectedValue = event.target.value;
        // Emit either raw value or matched object
        const matched = this.options.find(
          (opt) => this.getValue(opt).toString() === selectedValue
        );
        this.$emit("update:modelValue", this.getValue(matched));
        this.$emit("selected", matched);
      },
    },
  };
  </script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: var(--secondaryColor);
  color: var(--accentColor);
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  min-width: 7.5rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-button:hover {
  background: var(--primaryColor);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--primaryColor);
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.25rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 100%;
  max-height: 12.5rem;
  overflow-y: auto;
}

.dropdown-item {
  padding: 0.625rem 0.9375rem;
  cursor: pointer;
  border-bottom: 0.0625rem solid var(--secondaryColor);
  transition: background-color 0.2s;
  color: var(--accentColor);
}

.dropdown-item:hover {
  background: var(--secondaryColor);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.3s ease;
}

.arrow.rotated {
  transform: rotate(180deg);
}
</style>