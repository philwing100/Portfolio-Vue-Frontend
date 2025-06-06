<template>
    <div class="expand-container">
        <div class="header" @click="toggleExpand">
            <span class="label">{{ label }}</span>
            <span class="arrow" :class="{ 'rotated': isExpanded }">▼</span>
        </div>
        <div class="content" :class="{ 'expanded': isExpanded }">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DownwardExpandContent',
    props: {
        label: {
            type: String,
            required: true
        },
        initiallyExpanded: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isExpanded: this.initiallyExpanded
        };
    },
    methods: {
        toggleExpand() {
            this.isExpanded = !this.isExpanded;
        }
    }
};
</script>

<style scoped>
.expand-container {
    width: 100%;
    background-color: #383444;
    border-radius: 8px;
    overflow: hidden;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    user-select: none;
    color: white;
}

.label {
    font-size: 1rem;
    font-weight: 500;
}

.arrow {
    transition: transform 0.3s ease;
    font-size: 0.8rem;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background-color: #2a2734;
}

.content.expanded {
    max-height: 1000px; /* Adjust based on your needs */
    padding: 1rem;
}
</style>