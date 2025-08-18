<template>
  <div class="event-card">
    <div class="event-card-header">
      <TextField
        ref="titleInput"
        v-model="localEvent.title"
        placeholder="Add title"
        class="event-title"
        autofocus
      />
      <Button class="close-btn" @click="$emit('close')">✕</Button>
    </div>
    <div class="event-card-body">
      <div class="event-time-row">
        <Timer
          v-model="localEvent.startTime"
          label="Start"
        />
        <span class="time-separator">–</span>
        <Timer
          v-model="localEvent.endTime"
          label="End"
        />
      </div>
      <DownwardExpandContent label="Color">
        <ColorPicker v-model="localEvent.color" />
      </DownwardExpandContent>
    </div>
    <div class="event-card-footer">
      <Button class="save-btn" @click="saveEvent">Save</Button>
    </div>
  </div>
</template>

<script>
import TextField from '../GeneralComponents/TextField.vue';
import Timer from '../ListItems/Timer.vue';
import ColorPicker from '../SettingsComponents/ColorPicker.vue';
import DownwardExpandContent from '../GeneralComponents/DownwardExpandContent.vue';
import Button from '../GeneralComponents/Button.vue';

export default {
  name: 'EventCard',
  components: {
    TextField,
    Timer,
    ColorPicker,
    DownwardExpandContent,
    Button,
  },
  props: {
    event: {
      type: Object,
      default: () => ({
        title: '',
        startTime: '',
        endTime: '',
        color: '#2196f3',
      }),
    },
  },
  data() {
    return {
      localEvent: { ...this.event },
    };
  },
  mounted() {
    // Focus the title field when the card pops up
    this.$nextTick(() => {
      if (this.$refs.titleInput && this.$refs.titleInput.$el.querySelector('input')) {
        this.$refs.titleInput.$el.querySelector('input').focus();
      }
    });
  },
  methods: {
    saveEvent() {
      this.$emit('save', { ...this.localEvent });
    },
  },
  watch: {
    event: {
      handler(newVal) {
        this.localEvent = { ...newVal };
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.event-card {
  min-width: 320px;
  max-width: 400px;
  background: var(--primaryColor);
  border-radius: 0.75rem;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  padding: 1.25rem 1.5rem 1rem 1.5rem;
  position: absolute;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.event-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
}

.close-btn {
  background: transparent;
  color: var(--accentColor);
  font-size: 1.25rem;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
}

.event-card-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-time-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.time-separator {
  font-size: 1.25rem;
  color: var(--accentColor);
}

.event-card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.save-btn {
  background: var(--accentColor);
  color: var(--primaryColor);
  border-radius: 0.25rem;
  font-weight: 600;
  padding: 0.5rem 1.25rem;
  border: none;
  cursor: pointer;
}
</style>