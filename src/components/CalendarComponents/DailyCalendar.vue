<template>
  <div class="daily-calendar">
    <div class="calendar-container" ref="calendarContainer">
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
        <!-- Render pending and completed tasks dynamically from different lists -->
        <div
          v-for="(task, index) in combinedEvents"
          :key="task.id"
          class="event"
          :style="getEventStyle(task)"
          @click="handleEventClick(task, index)"
        >
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyCalendar',
  props: {
    completedAllTasks: {
      type: Array,
      required: true
    },
    pendingAllTasks: {
      type: Array,
      required: true
    },
    completedDailyList: {
      type: Array,
      required: true
    },
    pendingDailyList: {
      type: Array,
      required: true
    }
  },
  computed: {
    combinedEvents() {
      // Combine all task arrays and filter by today's date
      const today = this.getTodayDate();
      return [
        ...this.pendingAllTasks.filter(task => task.scheduledDate === today),
        ...this.completedAllTasks.filter(task => task.scheduledDate === today),
        ...this.pendingDailyList.filter(task => task.scheduledDate === today),
        ...this.completedDailyList.filter(task => task.scheduledDate === today)
      ];
    }
  },
  methods: {
    calculateTopPosition(hour) {
      // Ensure this function works to calculate the top position based on the hour
      return `${hour * 60}px`;
    },
    formatHour(hour) {
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour} ${ampm}`;
    },
    getEventStyle(task) {
      const startHour = this.parseTime(task.startTime);
      const endHour = this.parseTime(task.endTime);
      const topPosition = startHour * 60; // Top position in px
      const height = (endHour - startHour) * 60; // Event height in px

      return {
        top: `${topPosition}px`,
        height: `${height}px`,
        backgroundColor: task.completed ? '#888888' : '#4caf50' // Gray if completed
      };
    },
    handleEventClick(task, index) {
      // Emit the task's index and its list type to the parent (Dashboard)
      const listType = this.getListType(task);
      this.$emit('task-clicked', { taskIndex: index, listType });
    },
    getListType(task) {
      if (this.pendingAllTasks.includes(task)) return 'pendingAllTasks';
      if (this.completedAllTasks.includes(task)) return 'completedAllTasks';
      if (this.pendingDailyList.includes(task)) return 'pendingDailyList';
      if (this.completedDailyList.includes(task)) return 'completedDailyList';
      return '';
    },
    getTodayDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
    },
    parseTime(time) {
      const [hours, minutes] = time.split(':').map(Number);
      return hours + minutes / 60;
    },
    scrollToDefaultTime() {
      const currentTime = new Date();
      const defaultScrollTime = currentTime.getHours() - 1; // 1 hour before current time
      const scrollPosition = defaultScrollTime * 60; // Scroll to this position (in px)

      // Scroll the container to the desired position
      this.$refs.calendarContainer.scrollTop = scrollPosition;
    }
  },
  mounted() {
    this.scrollToDefaultTime();
  }
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
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.event:hover {  
  background-color: #388e3c;
}

.completed {
  text-decoration: line-through;
}
</style>
