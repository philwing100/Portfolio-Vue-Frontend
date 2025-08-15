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
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: var(--primaryColor);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
}

.expand-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background-color: var(--secondaryColor);
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-bottom: 0.0625rem solid var(--accentColor);
}

.expand-header:hover {
    opacity: 0.8;
}

.expand-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--accentColor);
    margin: 0;
}

.expand-icon {
    font-size: 1.25rem;
    color: var(--accentColor);
    transition: transform 0.3s ease;
}

.expand-icon.rotated {
    transform: rotate(180deg);
}

.expand-content {
    overflow: hidden;
    transition: max-height 0.3s ease-out;
}

.expand-content-inner {
    padding: 1.25rem;
    color: var(--accentColor);
    line-height: 1.6;
}

.expand-content.collapsed {
    max-height: 0;
}

.expand-content.expanded {
    max-height: 31.25rem;
}
</style>