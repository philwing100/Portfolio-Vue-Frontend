<template>
  <div class="daily-calendar">
    <div class="calendar-container" ref="calendarContainer" @click="handleEmptySpaceClick($event)">
      <div class="time-slots">
        <!-- Generate time slots (24 hours) -->
        <div v-for="hour in 24" :key="hour" class="time-slot" :style="{ top: calculateTopPosition(hour) }">
          {{ formatHour(hour) }}
        </div>
      </div>

      <div class="events">
        <!-- Render events dynamically -->
        <div v-for="(event, index) in combinedEvents" :key="`${event.listType}-${index}`" class="event"
          :style="getEventStyle(event)" @click.stop="handleEventClick(event, index)">
          <span>{{ event.textString }}</span>
        </div>
      </div>

      <!-- EventCard integration -->
      <EventCard
        v-if="showEventCard"
        :event="activeEvent"
        @close="closeEventCard"
        @save="saveEvent"
      />
    </div>
  </div>
</template>

<script>
import { getTodayDate } from '../../date.js';
import EventCard from './EventCard.vue';

export default {
  name: "DailyCalendar",
  components: {
    EventCard,
  },
  props: {
    list1: {
      type: Array,
      required: true,
      default: () => [],
    },
    list2: {
      type: Array,
      required: true,
      default: () => [],
    },
    date: {
      type: String,
      required: true,
    },
  },
  emits: ["update:list1", "update:list2", "event-clicked"],
  data() {
    return {
      showEventCard: false,
      activeEvent: null,
      activeEventIndex: null,
      activeEventListType: null,
      eventCardPosition: { top: '200px', left: '30%' }, // You can improve this for better placement
    };
  },
  computed: {
    combinedEvents() {
      const today = this.date;
      const events = [
        ...this.list1.map((event) => ({ ...event, listType: "list1" })),
        ...this.list2.map((event) => ({ ...event, listType: "list2" })),
      ];
      return events.filter((event) => event.scheduledDate === today);
    },
  },
  methods: {
    calculateTopPosition(hour) {
      return `${hour * 60}px`;
    },
    formatHour(hour) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour} ${ampm}`;
    },
    getEventStyle(event) {
      const startHour = this.parseTime(event.scheduledTime);
      let endHour = startHour + event.taskTimeEstimate / 60;
      if (endHour > 24.75) {
        endHour = 24.75;
      }
      const topPosition = startHour * 60;
      let height = (endHour - startHour) * 60;
      const minHeight = 25;
      if (height < minHeight) {
        height = minHeight;
      }
      return {
        top: `${topPosition}px`,
        height: `${height}px`,
        backgroundColor: event.color || "blue",
        textDecoration: event.complete ? "line-through" : "none",
      };
    },
    handleEventClick(event, index) {
      this.activeEvent = { ...event };
      this.activeEventIndex = index;
      this.activeEventListType = event.listType;
      this.showEventCard = true;
    },
    handleEmptySpaceClick(e) {
      // Only trigger if clicking on empty space (not on event)
      if (e.target.classList.contains('calendar-container')) {
        // Calculate time from click position
        const rect = this.$refs.calendarContainer.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const hour = Math.floor(y / 60);
        const minute = Math.floor((y % 60) / 1); // 1px per minute
        const ampm = hour >= 12 ? 'pm' : 'am';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const timeString = `${formattedHour}:${minute.toString().padStart(2, '0')}${ampm}`;
        this.activeEvent = {
          title: '',
          startTime: timeString,
          endTime: '',
          color: '#2196f3',
          scheduledDate: this.date,
          scheduledTime: timeString,
          textString: '',
          taskTimeEstimate: 60,
          complete: false,
        };
        this.activeEventIndex = null;
        this.activeEventListType = null;
        this.showEventCard = true;
      }
    },
    closeEventCard() {
      this.showEventCard = false;
      this.activeEvent = null;
      this.activeEventIndex = null;
      this.activeEventListType = null;
    },
    saveEvent(eventData) {
      // If editing existing event
      if (this.activeEventIndex !== null && this.activeEventListType) {
        if (this.activeEventListType === "list1") {
          this.$emit("update:list1", [
            ...this.list1.slice(0, this.activeEventIndex),
            eventData,
            ...this.list1.slice(this.activeEventIndex + 1),
          ]);
        } else {
          this.$emit("update:list2", [
            ...this.list2.slice(0, this.activeEventIndex),
            eventData,
            ...this.list2.slice(this.activeEventIndex + 1),
          ]);
        }
      } else {
        // New event, add to list2 by default
        this.$emit("update:list2", [...this.list2, eventData]);
      }
      this.closeEventCard();
    },
    parseTime(time) {
      if (time == null) time = Date.now().toString();
      const regex = /(\d{1,2}):(\d{2})(am|pm)/i;
      const match = time.trim().match(regex);
      if (!match) return 0;
      let [_, hours, minutes, period] = match;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
      }
      return hours + minutes / 60;
    },
    scrollToDefaultTime() {
      const currentTime = new Date();
      const defaultScrollTime = currentTime.getHours() - 1;
      const scrollPosition = defaultScrollTime * 60;
      this.$refs.calendarContainer.scrollTop = scrollPosition;
    },
  },
  mounted() {
    this.scrollToDefaultTime();
  },
};
</script>
<style scoped>
.daily-calendar {
  position: relative;
  height: 100%;
  width: 100%;
}

.calendar-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  background: var(--secondaryColor);
}

.time-slots {
  position: absolute;
  width: 100%;
  pointer-events: none;
}

.time-slot {
  position: absolute;
  left: 0;
  width: 100%;
  height: 3.75rem;
  border-top: 0.0625rem solid var(--accentColor);
  text-align: left;
  padding-left: 0.625rem;
  box-sizing: border-box;
  font-size: 0.75rem;
  color: var(--accentColor);
  background-color: var(--secondaryColor);
}

.events {
  position: absolute;
  width: 100%;
}

.event {
  position: absolute;
  left: 20%;
  width: 60%;
  color: var(--accentColor);
  border-radius: 0.25rem;
  padding-left: 0.625rem;
  padding-top: 0.3125rem;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event:hover {
  background-color: var(--primary);
}
</style>