<template>
  <div class="date-picker">
    <div class="input-wrapper">
      <input type="text" v-model="formattedDate" @focus="showCalendar" class="date-input" readonly />
      <span class="dropdown-arrow">&#8595;</span>
    </div>
    <div v-if="isCalendarVisible" class="calendar">
      <div class="calendar-header">
        <button @click="prevMonth">&lt;</button>
        <div class="month-year-display">
          <span>{{ monthNames[currentMonth] }}</span>
          <Dropdown 
            :options="yearOptions" 
            v-model="currentYear" 
            @update:modelValue="onYearChange"
            class="year-dropdown"
          />
        </div>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar-grid">
        <div class="day" v-for="(day, index) in weekDays" :key="index">{{ day }}</div>
        <div v-for="date in displayedDates" :key="date.dateString" class="day"
          :class="{ 'hover': date.isHover, 'selected': date.isSelected }" @mouseover="hoverDate(date.dateString)"
          @mouseleave="clearHover" @click="selectDate(date.dateString)">
          {{ date.day }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Dropdown from '@/components/GeneralComponents/Dropdown.vue';

export default {
  components: {
    Dropdown,
  },
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isCalendarVisible: false,
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      selectedDate: this.modelValue,
      hoveredDate: null,
    };
  },
  computed: {
    formattedDate() {
      return this.hoveredDate || this.formatDate(this.incrementDate(this.selectedDate));
    },
    monthNames() {
      return [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];
    },
    weekDays() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
    yearOptions() {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let year = currentYear; year >= 1930; year--) {
        years.push(year);
      }
      return years;
    },
    displayedDates() {
      const dates = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

      // Fill in the days leading up to the first day of the month
      for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        dates.push({ day: '', dateString: '' });
      }

      // Fill in the days of the month
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const date = new Date(this.currentYear, this.currentMonth, day);

        // Format date as YYYY-MM-DD in local time, without timezone offset
        const dateString = date.getFullYear() +
          '-' + String(date.getMonth() + 1).padStart(2, '0') +
          '-' + String(date.getDate()).padStart(2, '0');

        dates.push({
          day,
          dateString,
          isSelected: dateString === this.selectedDate,
          isHover: dateString === this.hoveredDate,
        });
      }

      return dates;
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date ? new Date(date).toLocaleDateString(undefined, options) : '';
    },
    showCalendar() {
      this.isCalendarVisible = true;
    },
    hoverDate(dateString) {
      this.hoveredDate = dateString;
    },
    clearHover() {
      this.hoveredDate = null;
    },
    selectDate(dateString) {
      this.selectedDate = dateString;
      this.hoveredDate = null;
      this.isCalendarVisible = false;

      // Emit the update to synchronize with the parent component's v-model
      this.$emit('update:modelValue', this.selectedDate);
    },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');

      // Return formatted date as YYYY-MM-DD in local time without timezone adjustments
      return `${year}-${month}-${day}`;
    },
    incrementDate(dateString) {
      let date;

      // Check if dateString is null or undefined, use current date if so
      if (!dateString) {
        date = new Date(this.getCurrentDate()); // Convert the current date string to a Date object
      } else {
        date = new Date(dateString); // Convert the provided dateString to a Date object
      }

      date.setDate(date.getDate() + 1); // Increment the date by 1
      return date.toISOString().split('T')[0]; // Return the incremented date as a string in YYYY-MM-DD format
    },
    onYearChange(newYear) {
      this.currentYear = newYear;
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedDate = newValue; // Update internal date when parent model changes
    },
  },
};
</script>

<style scoped>
.date-picker {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: inline-block;
}

.date-input {
  background-color: var(--primaryColor);
  color: var(--accentColor);
  border: 0.0625rem solid var(--secondaryColor);
  border-radius: 0.25rem;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  width: 9.375rem;
  cursor: text;
}

.dropdown-arrow {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accentColor);
  font-size: 0.75rem;
  pointer-events: none;
}

.date-input:focus {
  outline: none;
  border-color: var(--accentColor);
  box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 0.2);
}

.calendar {
  position: absolute;
  top: 40px;
  left: -10%;
  background-color: var(--secondaryColor);
  border: 1px solid var(--accentColor);
  border-radius: 4px;
  padding-left: 2px;
  padding-right: 2px;
  z-index: 1;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.0em;
}

.month-year-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.year-dropdown {
  min-width: 4rem;
}

.year-dropdown select {
  background: var(--secondaryColor);
  color: var(--accentColor);
  border: 0.0625rem solid var(--accentColor);
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-size: 0.875rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}

.day {
  padding: 1px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  min-height: 5%;
}

.day.hover {
  background-color: var(--secondaryColor);
}

.day.selected {
  background-color: var(--secondaryColor);
}
</style>