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
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--accentColor);
}

.input-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.number-input {
    width: 60px;
    padding: 0.5rem;
    text-align: center;
    border: 1px solid var(--accentColor);
    border-radius: 4px;
    background: var(--secondaryColor);
    color: var(--accentColor);
}

button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: var(--accentColor);
    color: var(--accentColor);
    cursor: pointer;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

button:hover:not(:disabled) {
    background: var(--secondaryColor);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>