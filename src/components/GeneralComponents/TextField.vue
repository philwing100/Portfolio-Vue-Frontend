<template>
    <div class="text-field">
        <label v-if="label" class="text-label">{{ label }}</label>
        <input type="text" :value="modelValue" @input="updateValue" :maxlength="maxLength" class="text-input"
            autocomplete="new-password" autocorrect="off" autocapitalize="off" spellcheck="false" />

        <p v-if="maxLength" class="char-counter">
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
.text-field {
    display: flex;
    flex-direction: column;
    gap: 0.3125rem;
    width: 100%;
}

.text-label {
    font-weight: bold;
    color: var(--accentColor);
}

.text-input {
    padding: 0.5rem;
    border: 0.0625rem solid var(--accentColor);
    border-radius: 0.25rem;
    font-size: 1rem;
    background-color: var(--primary);
    color:var(--accentColor);
}

.char-counter {
    font-size: 0.75rem;
    color: var(--secondaryColor);
    text-align: right;
}
</style>