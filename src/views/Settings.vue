<template>
  <div class="settings-root">
    <h1>Select Site Themes</h1>
    <div class="ColorPickerContainer">
      <colorpicker
        class="colorpicker primary"
        label="Primary"
        v-model="tempColors.primary"
      />
      <colorpicker
        class="colorpicker secondary"
        label="Secondary"
        v-model="tempColors.secondary"
      />
      <colorpicker
        class="colorpicker accents"
        label="Accent"
        v-model="tempColors.accent"
      />
    </div>
    <div class="button-row">
      <Button :onClick="saveColors" variant="primary">Save</Button>
      <Button :onClick="revertColors" variant="secondary">Revert</Button>
    </div>
  </div>
</template>

<script>
import colorpicker from '@/components/SettingsComponents/ColorPicker.vue';
import Button from '@/components/GeneralComponents/Button.vue';

export default {
  name: 'Settings',
  components: {
    colorpicker,
    Button,
  },
  data() {
    return {
      initialColors: {
        primary: getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim() || 'black',
        secondary: getComputedStyle(document.documentElement).getPropertyValue('--secondaryColor').trim() || '#343541',
        accent: getComputedStyle(document.documentElement).getPropertyValue('--accentColor').trim() || 'white',
      },
      tempColors: {
        primary: '',
        secondary: '',
        accent: '',
      },
    };
  },
  created() {
    // Load from localStorage if available, else use initial
    const saved = JSON.parse(localStorage.getItem('siteColors') || 'null');
    if (saved) {
      this.tempColors = { ...saved };
      this.initialColors = { ...saved };
      console.log('Loaded colors from localStorage:', this.tempColors);
    } else {
      this.tempColors = { ...this.initialColors };
      console.log('Using initial colors:', this.tempColors);
    }
  },
  watch: {
    tempColors: {
      handler(newColors) {
        // Only apply colors to settings page, not global
        this.applyColorsToSettings(newColors);
      },
      deep: true,
    },
  },
  methods: {
    applyColorsToSettings(colors) {
      // Apply colors to settings page only (scoped styles or inline)
      // Example: could set style on root element of settings page
      this.$el.style.setProperty('--primaryColor', colors.primary);
      this.$el.style.setProperty('--secondaryColor', colors.secondary);
      this.$el.style.setProperty('--accentColor', colors.accent);
    },
    saveColors() {
      // Save to localStorage
      localStorage.setItem('siteColors', JSON.stringify(this.tempColors));
      // Apply globally
      document.documentElement.style.setProperty('--primaryColor', this.tempColors.primary);
      document.documentElement.style.setProperty('--secondaryColor', this.tempColors.secondary);
      document.documentElement.style.setProperty('--accentColor', this.tempColors.accent);
      // Skeleton for backend call
      this.sendColorsToBackend(this.tempColors);
    },
    revertColors() {
      this.tempColors = { ...this.initialColors };
    },
    sendColorsToBackend(colors) {
      // Skeleton: Replace with actual API call
      // Example:
      // fetch('/api/user/colors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(colors),
      // });
    },
  },
};
</script>

<style scoped>
.settings-root {
  background: var(--primaryColor);
  color: var(--primaryColor);
}
.ColorPickerContainer {
  margin-left: 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  padding: 1rem;
}
.colorpicker {
  margin: 1rem;
}
.button-row {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>