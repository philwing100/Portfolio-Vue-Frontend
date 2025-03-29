<template>
  <div class="daily-calendar">
    <div class="calendar-container" ref="calendarContainer">
      <div class="time-slots">
        <!-- Generate time slots (24 hours) -->
        <div v-for="hour in 24" :key="hour" class="time-slot" :style="{ top: calculateTopPosition(hour) }">
          {{ formatHour(hour) }}
        </div>
      </div>

      <div class="events">
        <!-- Render events dynamically -->
        <div v-for="(event, index) in combinedEvents" :key="`${event.listType}-${index}`" class="event"
          :style="getEventStyle(event)" @click="handleEventClick(event, index)">
          <span>{{ event.textString }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTodayDate} from '../../date.js';
export default {
  name: "DailyCalendar",
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
    date:{
      type: String,
      required: true,
    },
  },
  emits: ["update:list1", "update:list2", "event-clicked"],

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

  watch: {
    list1(newVal) {
      //console.log('List1 (Backburner) updated:', newVal);
    },
    list2(newVal) {
      //console.log('List2 (Daily List) updated:', newVal);
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
     // console.log(event);
     // console.log(event.scheduledTime);
      const startHour = this.parseTime(event.scheduledTime);
      let endHour = startHour + event.taskTimeEstimate / 60;

      // Ensure the event doesn't go beyond the last hour of the day (24 hours) and a little less so that it wraps nicely
      if (endHour > 24.75) {
        endHour = 24.75;
      }

      const topPosition = startHour * 60; // Top position in px
      let height = (endHour - startHour) * 60; // Event height in px

      const minHeight = 25;
      if (height < minHeight) {
        height = minHeight;
      }


      return {
        top: `${topPosition}px`,
        height: `${height}px`,
        backgroundColor: "#4caf50", // Default color
        textDecoration: event.complete ? "line-through" : "none",
      };

    },

    handleEventClick(event, index) {
      this.$emit("event-clicked", { event, listType: event.listType, index });
    },

    // Updated parseTime method to handle various formats like '2:00pm', '09:59am', '9:59am'
    parseTime(time) {
      if(time==null)
        time=Date.now().toString();
      const regex = /(\d{1,2}):(\d{2})(am|pm)/i;
      const match = time.trim().match(regex);
      if (!match) return 0; // Default if time format is invalid

      let [_, hours, minutes, period] = match;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);

      // Convert to 24-hour time format
      if (period.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
      } else if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
      }

      // Return the time in hours (decimal format)
      return hours + minutes / 60;
    },

    scrollToDefaultTime() {
      const currentTime = new Date();
      const defaultScrollTime = currentTime.getHours() - 1; // 1 hour before current time
      const scrollPosition = defaultScrollTime * 60; // Scroll to this position (in px)

      // Scroll the container to the desired position
      this.$refs.calendarContainer.scrollTop = scrollPosition;
    },
  },

  mounted() {
    this.scrollToDefaultTime();
  },
};
</script>

<style scoped>
/* Styles remain the same */
.daily-calendar {
  position: relative;
  height: 100%;
  width: 100%;
}

.calendar-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
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
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
  font-size: 12px;
  color: #888;
}

.events {
  position: absolute;
  width: 100%;
}

.event {
  position: absolute;
  left: 20%;
  width: 60%;
  background-color: blue;
  color: white;
  border-radius: 4px;
  padding-left: 10px;
  padding-top:5px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event:hover {
  background-color: blue;
}
</style>
