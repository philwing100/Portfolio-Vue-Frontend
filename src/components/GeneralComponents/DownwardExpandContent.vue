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
.expand-content {
  background: var(--primaryColor);
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.375rem;
  margin-bottom: 0.625rem;
  overflow: hidden;
  transition: all 0.3s ease;
}

.header {
  background: var(--secondaryColor);
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.0625rem solid var(--primaryColor);
}

.header:hover {
  background: var(--primaryColor);
  color:var(--accentColor);
  border-color: var(--accentColor);
}

.title {
  font-weight: 600;
  margin: 0;
  color: var(--accentColor);
}

.arrow {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
  color: var(--accentColor);
}

.arrow.expanded {
  transform: rotate(180deg);
}

.content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.content.expanded {
  max-height: 31.25rem;
}

.content-inner {
  padding: 1rem;
  color: var(--accentColor);
}
</style>