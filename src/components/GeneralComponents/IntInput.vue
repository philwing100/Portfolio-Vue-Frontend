<template>
    <div class="int-input-container">
        <label v-if="label">{{ label }}</label>
        <div class="input-wrapper">
            <input type="number" :value="modelValue" @input="updateValue" :min="min" :max="max" class="number-input" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'IntInput',
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        label: {
            type: String,
            default: ''
        }
    },
    methods: {
        updateValue(event) {
            let newValue = parseInt(event.target.value) || this.min;
            newValue = Math.min(Math.max(newValue, this.min), this.max);
            this.$emit('update:modelValue', newValue);
        },
    }
};
</script>

<style scoped>
.int-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 500;
  color: var(--accentColor);
  font-size: 0.875rem;
}

.input-field {
  padding: 0.625rem 0.75rem;
  border: 0.125rem solid var(--secondaryColor);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: var(--primaryColor);
  color: var(--accentColor);
}

.input-field:focus {
  outline: none;
  border-color: var(--accentColor);
  box-shadow: 0 0 0 0.1875rem rgba(255, 255, 255, 0.1);
}

.input-field.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.input-controls {
  display: flex;
  gap: 0.25rem;
}

.control-btn {
  background: var(--secondaryColor);
  border: 0.0625rem solid var(--accentColor);
  border-radius: 0.25rem;
  width: 1.875rem;
  height: 1.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: background-color 0.2s;
  color: var(--accentColor);
}

.control-btn:hover {
  background: var(--primaryColor);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>