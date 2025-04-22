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
  