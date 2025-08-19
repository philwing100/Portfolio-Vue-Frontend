<template>
  <div
    class="event-card"
    :style="cardPositionStyle"
  >
    <div class="event-card-header">
      <TextField
        ref="titleInput"
        v-model="localEvent.textString"
        placeholder="Add title"
        class="event-title"
        autofocus
      />
      <Button class="close-btn" @click="$emit('close')">✕</Button>
    </div>
    <div class="event-card-body">
      <div class="event-time-row">
        <TimeInput
          v-model="localEvent.scheduledTime"
          label="Start"
          :maxTime="localEvent.endingTime"
        />
        <span class="time-separator">–</span>
        <TimeInput
          v-model="localEvent.endingTime"
          label="End"
          :minTime="localEvent.scheduledTime"
        />
      </div>
      <DownwardExpandContent label="Color">
        <ColorPicker v-model="localEvent.color" />
      </DownwardExpandContent>
    </div>
    <div class="event-card-footer">
      <Button class="more-btn" @click="toggleDrawer">More Options</Button>
      <Button class="save-btn" @click="saveEvent">Save</Button>
    </div>
    <Drawer
      v-if="drawerOpen"
      :event="localEvent"
      @close="drawerOpen = false"
      @insert="handleDrawerInsert"
    />
  </div>
</template>

<script>
import TextField from '../GeneralComponents/TextField.vue';
import TimeInput from '../ListItems/TimeInput.vue';
import ColorPicker from '../SettingsComponents/ColorPicker.vue';
import DownwardExpandContent from '../GeneralComponents/DownwardExpandContent.vue';
import Button from '../GeneralComponents/Button.vue';
import Drawer from './Drawer.vue';

export default {
  name: 'EventCard',
  components: {
    TextField,
    TimeInput,
    ColorPicker,
    DownwardExpandContent,
    Button,
    Drawer,
  },
  props: {
    event: {
      type: Object,
      default: () => ({
        textString: '',
        scheduledTime: '',
        endingTime: '',
        color: '#2196f3',
      }),
    },
    eventPosition: {
      type: Object,
      default: () => ({ top: 200, left: 200, height: 40 }),
    },
  },
  data() {
    return {
      localEvent: { ...this.event },
      drawerOpen: false,
    };
  },
  computed: {
    cardPositionStyle() {
      // Shift upward by 32px but keep inside viewport
      const shift = 32;
      let top = this.eventPosition.top - shift;
      if (top < 0) top = this.eventPosition.top; // Don't go above page
      return {
        position: 'absolute',
        left: `${this.eventPosition.left}px`,
        top: `${top}px`,
        zIndex: 2000,
      };
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
  mounted() {
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
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    handleDrawerInsert(data) {
      this.$emit('save', { ...data });
      this.drawerOpen = false;
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
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
}

.more-btn {
  background: var(--secondaryColor);
  color: var(--accentColor);
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.5rem 1.25rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.more-btn:hover {
  background: var(--accentColor);
  color: var(--primaryColor);
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