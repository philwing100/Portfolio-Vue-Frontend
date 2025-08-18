<template>
  <div class="dropdown">
    <button
      class="dropdown-button"
      @click="toggleMenu"
      type="button"
    >
      {{ selectedLabel }}
      <span class="arrow" :class="{ rotated: menuOpen }">&#9660;</span>
    </button>
    <div v-if="menuOpen" class="dropdown-menu">
      <div
        v-for="(option, index) in options"
        :key="index"
        class="dropdown-item"
        @click="selectOption(option)"
      >
        {{ getLabel(option) }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: [String, Number, Object],
    labelKey: {
      type: String,
      default: null,
    },
    valueKey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    selectedLabel() {
      const matched = this.options.find(
        (opt) => this.getValue(opt) === this.modelValue
      );
      return matched ? this.getLabel(matched) : "Select...";
    },
  },
  methods: {
    getLabel(option) {
      return this.labelKey ? option[this.labelKey] : option;
    },
    getValue(option) {
      return this.valueKey ? option[this.valueKey] : option;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    selectOption(option) {
      this.menuOpen = false;
      this.$emit("update:modelValue", this.getValue(option));
      this.$emit("selected", option);
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    ...{
      getLabel(option) {
        return this.labelKey ? option[this.labelKey] : option;
      },
      getValue(option) {
        return this.valueKey ? option[this.valueKey] : option;
      },
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
      selectOption(option) {
        this.menuOpen = false;
        this.$emit("update:modelValue", this.getValue(option));
        this.$emit("selected", option);
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.menuOpen = false;
        }
      },
    }
  }
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