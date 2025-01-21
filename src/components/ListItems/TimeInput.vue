<template>
  <div class="time-picker">
    <input
      type="text"
      v-model="formattedTime"
      @focus="showDropdown"
      @click="showDropdown"
      @input="onInputChange"
      @blur="handleBlur"
      @keydown.down.prevent="navigateDown"
      @keydown.up.prevent="navigateUp"
      @keydown.enter.prevent="selectCurrentTime"
      class="time-input"
      ref="timeInput"
    />
    <div v-if="isDropdownVisible" class="time-dropdown">
      <div
        v-for="(time, index) in selectableTimes"
        :key="time"
        class="time-option"
        :class="{ selected: time === selectedTime, highlighted: index === highlightedIndex }"
        @click="selectTime(time)"
        @mousedown.prevent
        @mouseover="highlightedIndex = index"
      >
        {{ time }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      selectedTime: this.modelValue || this.getNearestTime(),
      formattedTime: '',
      highlightedIndex: 0, // Track the currently highlighted index
    };
  },
  computed: {
    selectableTimes() {
      const times = [];
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 60; j += 30) {
          const hour = i === 0 ? 12 : i > 12 ? i - 12 : i;
          const period = i < 12 ? 'am' : 'pm';
          const formattedTime = `${hour}:${String(j).padStart(2, '0')}${period}`;
          times.push(formattedTime);
        }
      }
      return times.filter(time => this.isFutureTime(time));
    },
  },
  methods: {
    getNearestTime() {
      const now = new Date();
      const nearestTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), Math.ceil(now.getMinutes() / 30) * 30);
      return this.formatTime(nearestTime);
    },
    formatTime(date) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours < 12 ? 'am' : 'pm';
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHour}:${String(minutes).padStart(2, '0')}${period}`;
    },
    isFutureTime(time) {
      const [hour, minutePart] = time.split(':');
      const minute = parseInt(minutePart);
      const period = minutePart.slice(-2);
      const formattedHour = period === 'am' ? (hour === '12' ? 0 : parseInt(hour)) : (hour === '12' ? 12 : parseInt(hour) + 12);
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), formattedHour, minute) > now;
    },
    showDropdown() {
      this.isDropdownVisible = true;
      this.highlightedIndex = this.selectableTimes.findIndex(time => time === this.selectedTime);
      this.$nextTick(() => {
        const dropdown = this.$el.querySelector('.time-dropdown');
        if (dropdown) {
          dropdown.scrollTop = this.highlightedIndex * dropdown.children[0].offsetHeight;
        }
      });
    },
    onInputChange(event) {
      this.formattedTime = event.target.value;
    },
    handleBlur() {
      if (this.isValidTime(this.formattedTime)) {
        this.selectedTime = this.formattedTime;
      } else {
        this.formattedTime = this.selectedTime;
      }
      this.isDropdownVisible = false;
      this.updateParent(); // Update parent with the selected time
    },
    isValidTime(timeString) {
      const timeRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;
      return timeRegex.test(timeString);
    },
    selectTime(time) {
      this.selectedTime = time;
      this.formattedTime = time;
      this.isDropdownVisible = false;
      this.updateParent(); // Update parent when a time is selected
      this.$nextTick(() => {
        this.$refs.timeInput.focus();
      });
    },
    navigateDown() {
      if (this.highlightedIndex < this.selectableTimes.length - 1) {
        this.highlightedIndex++;
      }
    },
    navigateUp() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    selectCurrentTime() {
      const time = this.selectableTimes[this.highlightedIndex];
      if (time) {
        this.selectTime(time);
      }
    },
    updateParent() {
      this.$emit('update:modelValue', this.selectedTime); // Emit to update v-model in parent
    },
  },
  watch: {
    modelValue(newValue) {
      this.selectedTime = newValue;
      this.formattedTime = newValue;
    },
  },
  mounted() {
    this.formattedTime = this.selectedTime;
  },
};
</script>

<style scoped>
.time-picker {
  position: relative;
}

.time-input {
  background-color: #343541;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  padding: 8px;
  width: 80%;
  cursor: text;
}

.time-dropdown {
  position: absolute;
  top: 40px; /* Adjust based on your layout */
  left: 0;
  background-color: #2b2b2b;
  border: 1px solid #4a4a4a;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}

.time-option {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.time-option:hover {
  background-color: #007bff; /* Change color on hover */
}

.time-option.selected {
  background-color: #0056b3; /* Change color for selected time */
}

.time-option.highlighted {
  background-color: #0056b3; /* Highlight the currently selected option */
}
</style>
