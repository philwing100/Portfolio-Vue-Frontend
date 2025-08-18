<template>
  <div>
    <div class="stats-container">
      <h1>Life Calendar Stats</h1>

      <div class="date-picker-container">
        <label>Birth Date:</label>
        <DateInput v-model="startDate" />
      </div>

      <LifeCalendar :start-date="startDate" />
    </div>
  </div>
</template>

<script>
import LifeCalendar from '@/components/StatsComponents/LifeCalendar.vue';
import DateInput from '@/components/ListItems/DateInput.vue'

export default {
  name: 'Stats',
  components: {
    LifeCalendar,
    DateInput,
  },
  data() {
    return {
      startDate: '1990-01-01', // Default birth date
    };
  },
  mounted() {
    // Load saved birth date from localStorage if available
    const savedDate = localStorage.getItem('lifecalendar-birth-date');
    if (savedDate) {
      this.startDate = savedDate;
    }
  },
  watch: {
    startDate(newDate) {
      // Save birth date to localStorage when changed
      localStorage.setItem('lifecalendar-birth-date', newDate);
    }
  }
};
</script>

<style scoped>
.stats-container {
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  background: var(--primaryColor, #343541);
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}

h1 {
  color: var(--accentColor, #fff);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.date-picker-container {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.date-picker-container label {
  color: var(--accentColor, #fff);
  font-size: 1.1rem;
  font-weight: 600;
}

.date-input {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--secondaryColor, #555);
  background: var(--secondaryColor, #555);
  color: var(--accentColor, #fff);
  font-size: 1rem;
  min-width: 9.375rem;
}

.date-input:focus {
  outline: none;
  border-color: var(--accentColor, #fff);
  box-shadow: 0 0 0 0.125rem rgba(255, 255, 255, 0.2);
}
</style>