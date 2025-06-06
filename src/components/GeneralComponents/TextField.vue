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
    gap: 5px;
    width: 100%;
}

.text-label {
    font-weight: bold;
}

.text-input {
    padding: 8px;
    border: 1px solid white;
    border-radius: 4px;
    font-size: 16px;
    background-color: black;
    color:white;
}

.char-counter {
    font-size: 12px;
    color: gray;
    text-align: right;
}
</style>