
<template>
  <div class="tabs-root">
    <div class="tabs-list" role="tablist">
      <button
        v-for="(tab, idx) in tabs"
        :key="tab.label"
        class="tab-trigger"
        :class="{ active: idx === selectedIndex }"
        :aria-selected="idx === selectedIndex"
        :tabindex="idx === selectedIndex ? 0 : -1"
        @click="selectTab(idx)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="tabs-content">
      <slot :name="tabs[selectedIndex]?.slotName || tabs[selectedIndex]?.label" />
    </div>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';

export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      required: true,
      // [{ label: 'Tab 1', slotName: 'tab1' }, ...]
    },
    initial: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedIndex: this.initial,
      colors,
    };
  },
  methods: {
    selectTab(idx) {
      this.selectedIndex = idx;
    },
  },
};
</script>

<style scoped>
.tabs-root {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.tabs-list {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--tab-border, #e5e7eb);
  background: var(--tab-bg, #222);
  padding: 0.25rem 0;
}
.tab-trigger {
  background: transparent;
  border: none;
  outline: none;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  color: var(--tab-color, #aaa);
  border-radius: 0.375rem 0.375rem 0 0;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  position: relative;
}
.tab-trigger.active {
  color: var(--tab-active-color, #fff);
  background: var(--tab-active-bg, #3498db);
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}
.tab-trigger:not(.active):hover {
  background: var(--tab-hover-bg, #383444);
  color: var(--tab-hover-color, #fff);
}
.tabs-content {
  padding: 1.5rem 0.5rem 0.5rem 0.5rem;
  background: var(--tab-content-bg, #343541);
  color: var(--tab-content-color, #fff);
  border-radius: 0 0 0.5rem 0.5rem;
  min-height: 2rem;
}

/* Use CSS vars for easy theming from global colors */
:root, .tabs-root {
  --tab-active-bg:  #3498db;
  --tab-active-color: white;
  --tab-hover-bg: #383444;
  --tab-hover-color: white;
  --tab-bg: #222;
  --tab-color: #aaa;
  --tab-border: #e5e7eb;
  --tab-content-bg: #343541;
  --tab-content-color: white;
}
</style>
