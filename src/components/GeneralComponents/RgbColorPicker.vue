<template>
    <div class="color-picker">
        <div class="preview-section">
            <div class="color-preview" :style="{ backgroundColor: colorString }"></div>
            <div class="color-value">{{ colorString }}</div>
            <div class="color-label">{{ label }}</div>
        </div>

        <div class="picker-layout">
            <div class="preset-colors">
                <div v-for="color in presetColors" :key="color" class="preset-color" :style="{ backgroundColor: color }"
                    @click="selectPresetColor(color)"></div>
            </div>

            <div class="controls-section">
                <IntInput v-model="red" label="Red" :min="0" :max="255" @update:modelValue="updateColor" />
                <IntInput v-model="green" label="Green" :min="0" :max="255" @update:modelValue="updateColor" />
                <IntInput v-model="blue" label="Blue" :min="0" :max="255" @update:modelValue="updateColor" />
            </div>
        </div>
    </div>
</template>



<script>
import IntInput from './IntInput.vue';

export default {
    name: 'RgbColorPicker',
    components: {
        IntInput
    },
    props: {
        modelValue: {
            type: String,
            default: 'rgb(0,0,0)'
        },
        label: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            red: 0,
            green: 0,
            blue: 0,
            presetColors: [
                'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)',
                'rgb(255,255,0)', 'rgb(255,0,255)', 'rgb(0,255,255)',
                'rgb(255,255,255)', 'rgb(128,128,128)', 'rgb(0,0,0)'
            ]
        };
    },
    computed: {
        colorString() {
            return `rgb(${this.red},${this.green},${this.blue})`;
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(newValue) {
                this.parseColor(newValue);
            }
        }
    },
    methods: {
        updateColor() {
            this.$emit('update:modelValue', this.colorString);
        },
        selectPresetColor(color) {
            this.parseColor(color);
            this.updateColor();
        },
        parseColor(colorStr) {
            const match = colorStr.match(/rgb\((\d+),(\d+),(\d+)\)/);
            if (match) {
                this.red = parseInt(match[1]);
                this.green = parseInt(match[2]);
                this.blue = parseInt(match[3]);
            }
        }
    }
};
</script>

<style scoped>
.color-picker {
    padding: 1rem;
    background-color: #383444;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;
}

.preview-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.color-preview {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    border: 2px solid #ffffff;
}

.color-value {
    color: white;
    font-family: monospace;
}

.picker-layout {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

.preset-colors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    flex: 1;
    padding-right: 80px;
}

.preset-color {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border-color 0.2s;
}

.preset-color:hover {
    border-color: white;
}

.controls-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1;
    margin-left: 120px;
    padding-left:20px;
    right: 0;
}
</style>
