<template>
  <div class="daily-calendar">
    <div class="calendar-container" ref="calendarContainer" @click="handleEmptySpaceClick($event)">
      <div class="time-slots">
        <!-- Generate time slots (24 hours) -->
        <div
          v-for="hour in 24"
          :key="hour"
          class="time-slot"
          :style="{ top: calculateTopPosition(hour) }"
        >
          {{ formatHour(hour) }}
        </div>
      </div>

      <div class="events">
        <!-- Render events dynamically -->
        <div
          v-for="(event, index) in combinedEvents"
          :key="`${event.listType}-${index}`"
          :class="['event', { 'event-complete': event.complete }]"
          :style="getEventDynamicStyle(event)"
          @click.stop="handleEventClick(event, index, $event)"
        >
          <span>{{ event.textString }}</span>
        </div>
      </div>

      <!-- EventCard integration -->
      <EventCard
        v-if="showEventCard"
        :event="activeEvent"
        :eventPosition="eventCardPosition"
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
      eventCardPosition: { top: 200, left: 200 },
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
      // 1rem = 16px, so 60px = 3.75rem
      return `${hour * 3.75}rem`;
    },
    formatHour(hour) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour} ${ampm}`;
    },
    getEventDynamicStyle(event) {
      const startHour = this.parseTime(event.scheduledTime);
      let endHour = startHour + event.taskTimeEstimate / 60;
      if (endHour > 24.75) {
        endHour = 24.75;
      }
      const topPosition = startHour * 3.75; // 3.75rem per hour
      let height = (endHour - startHour) * 3.75;
      const minHeight = 1.5625; // 25px = 1.5625rem
      if (height < minHeight) {
        height = minHeight;
      }
      return {
        top: `${topPosition}rem`,
        height: `${height}rem`,
        backgroundColor: event.color || "var(--accentColor)",
        textDecoration: event.complete ? "line-through" : "none",
      };
    },
    handleEventClick(event, index, clickEvent) {
      const rect = this.$refs.calendarContainer.getBoundingClientRect();
      this.eventCardPosition = {
        left: clickEvent.clientX - rect.left,
        top: clickEvent.clientY - rect.top
      };
      this.activeEvent = { ...event };
      this.activeEventIndex = index;
      this.activeEventListType = event.listType;
      this.showEventCard = true;
    },
    handleEmptySpaceClick(e) {
      if (e.target.classList.contains('calendar-container')) {
        const rect = this.$refs.calendarContainer.getBoundingClientRect();
        const y = e.clientY - rect.top;
        this.eventCardPosition = {
          left: e.clientX - rect.left,
          top: y
        };
        const hour = Math.floor(y / 60);
        const minute = Math.floor((y % 60) / 1);
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
      const scrollPosition = defaultScrollTime * 3.75 * 16; // px
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
  overflow-x: hidden;
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
  background-color: var(--accentColor); /* fallback, overridden inline */
  font-size: 1rem;
  transition: background-color 0.2s;
}

.event-complete {
  text-decoration: line-through;
}

.event:hover {
  background-color: var(--primaryColor);
}
</style>