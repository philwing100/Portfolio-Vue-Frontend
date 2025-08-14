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

.dropdown-trigger {
  padding: 0.625rem 1rem;
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.375rem;
  background-color: var(--primary);
  color: var(--accentColor);
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 9.375rem;
  transition: all 0.3s ease;
}

.dropdown-trigger:hover {
  border-color: var(--accentColor);
  box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 0.25);
}

.dropdown-arrow {
  font-size: 0.75rem;
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--primary);
  border: 0.0625rem solid var(--secondaryColor);
  border-top: none;
  border-radius: 0 0 0.375rem 0.375rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 12.5rem;
  overflow-y: auto;
}

.dropdown-item {
  padding: 0.625rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--accentColor);
  transition: background-color 0.2s ease;
  border-bottom: 0.0625rem solid var(--secondaryColor);
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: var(--secondaryColor);
}

.dropdown-item.selected {
  background-color: var(--accentColor);
  color: var(--primary);
}

.dropdown-item.disabled {
  color: var(--secondaryColor);
  cursor: not-allowed;
  opacity: 0.5;
}

.dropdown-item.disabled:hover {
  background-color: transparent;
}
</style>