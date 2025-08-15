<template>
    <div class="text-field-container">
        <label v-if="label" class="input-label">{{ label }}</label>
        <input type="text" :value="modelValue" @input="updateValue" :maxlength="maxLength" class="text-input"
            autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" />

        <p v-if="maxLength" class="character-count">
            {{ modelValue.length }} / {{ maxLength }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "",
        },
        maxLength: {
            type: Number,
            default: null, // No limit unless specified
        },
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>

<style scoped>
.text-field-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-weight: 500;
  color: var(--accentColor);
  font-size: 0.875rem;
}

.text-input {
  padding: 0.75rem 1rem;
  border: 0.125rem solid var(--secondaryColor);
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background: var(--primaryColor);
  color: var(--accentColor);
  resize: vertical;
  min-height: 2.5rem;
}

.text-input:focus {
  outline: none;
  border-color: var(--accentColor);
  box-shadow: 0 0 0 0.1875rem rgba(255, 255, 255, 0.1);
}

.text-input.error {
  border-color: #dc3545;
}

.text-input::placeholder {
  color: var(--secondaryColor);
}

.error-message {
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.character-count {
  font-size: 0.75rem;
  color: var(--accentColor);
  text-align: right;
  margin-top: 0.25rem;
  opacity: 0.7;
}

.character-count.warning {
  color: #ffc107;
}

.character-count.error {
  color: #dc3545;
}
</style>