<template>
  <div class="life-calendar-root">
    <div class="calendar-labels">
      <div class="calendar-age-label">
        <span>Age</span>
        <span class="arrow">&#8595;</span>
      </div>
      <div class="calendar-weeks-label">
        <span>Weeks</span>
        <span class="arrow">&#8594;</span>
      </div>
    </div>
    <div class="calendar-columns">
      <!-- First column: 13 columns, show numbers -->
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-header-row">
            <div class="calendar-header-placeholder"></div>
            <div class="calendar-header-cell" v-for="week in 26" :key="week">{{ week }}</div>
          </div>
          <div v-for="row in 90" :key="row" class="calendar-row">
            <div class="calendar-row-label">{{ row }}</div>
            <div v-for="cell in 26" :key="cell" class="calendar-cell" :class="{ filled: isFilled(row, cell, 1) }"></div>
          </div>
        </div>
      </div>
      <!-- Second column: 13 columns, no numbers -->
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-header-row">
            <div class="calendar-header-placeholder"></div>
            <div class="calendar-header-cell" v-for="week in 26" :key="week">{{ week + 26 }}</div>
          </div>
          <div v-for="row in 90" :key="row" class="calendar-row">
            <div class="calendar-row-label"></div>
            <div v-for="cell in 26" :key="cell" class="calendar-cell" :class="{ filled: isFilled(row, cell, 2) }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LifeCalendar',
  props: {
    startDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    weeksSinceStart() {
      const now = new Date();
      const start = new Date(this.startDate);
      const diffMs = now - start;
      return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    },
  },
  methods: {
    isFilled(row, cell, col) {
      // Calculate the week number for this cell
      // Each row represents 52 weeks (26 per column)
      // First column: weeks 1-26 of each year, second column: weeks 27-52 of each year
      const weekInYear = (col === 1) ? cell : cell + 26;
      const weekIndex = (row - 1) * 52 + weekInYear - 1;
      return weekIndex < this.weeksSinceStart;
    },
  },
};
</script>

<style scoped>
.life-calendar-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primaryColor);
  padding: 2rem 0;
}

.calendar-labels {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  max-width: 60rem;
}

.calendar-age-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  color: var(--accentColor);
  margin-left: 2rem;
}

.calendar-weeks-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
  color: var(--accentColor);
  margin-right: 2rem;
}

.arrow {
  font-size: 1.5rem;
  margin-top: 0.25rem;
  margin-left: 0.5rem;
}

.calendar-columns {
  display: flex;
  gap: 2rem;
  justify-content: center;
  width: 100%;
  max-width: 60rem;
}

.calendar-grid-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.calendar-grid {
  display: flex;
  flex-direction: column;
  background: var(--secondaryColor);
  border-radius: 0.5rem;
  padding: 0.5rem 0.25rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
}

.calendar-header-row {
  display: flex;
  margin-bottom: 0.25rem;
}

.calendar-header-placeholder {
  width: 2.2vw;
  min-width: 1.75rem;
  max-width: 2.375rem;
  margin-right: 0.25rem;
}

.calendar-header-cell {
  width: 1.2vw;
  min-width: 1.125rem;
  max-width: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--accentColor);
  font-weight: 600;
  margin-right: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.125rem;
}

.calendar-row-label {
  width: 2.2vw;
  min-width: 1.75rem;
  max-width: 2.375rem;
  text-align: right;
  font-size: 0.85rem;
  color: var(--accentColor);
  margin-right: 0.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 1.2vw;
  min-height: 1.125rem;
  max-height: 2rem;
}

.calendar-cell {
  width: 1.2vw;
  height: 1.2vw;
  min-width: 1.125rem;
  min-height: 1.125rem;
  max-width: 2rem;
  max-height: 2rem;
  background: var(--primaryColor);
  border-radius: 0.2rem;
  border: 0.0625rem solid var(--secondaryColor);
  margin-right: 0.125rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.calendar-cell:hover {
  transform: scale(1.2);
  background: var(--accentColor);
  border-color: var(--accentColor);
  box-shadow: 0 0.25rem 0.75rem rgba(255, 255, 255, 0.3);
  z-index: 10;
  animation: pulse 0.6s ease-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 0 0.5rem rgba(255, 255, 255, 0.3);
  }
  100% {
    transform: scale(1.2);
    box-shadow: 0 0.25rem 0.75rem rgba(255, 255, 255, 0.3);
  }
}

.calendar-cell.filled {
  background: var(--accentColor);
  border: 0.0625rem solid var(--accentColor);
}

@media (max-width: 56.25rem) {

  .calendar-header-cell,
  .calendar-row-label,
  .calendar-cell {
    min-width: 0.75rem;
    max-width: 1.125rem;
    min-height: 0.75rem;
    max-height: 1.125rem;
    font-size: 0.7rem;
  }

  .calendar-row-label {
    min-height: 0.75rem;
    max-height: 1.125rem;
  }

  .calendar-columns {
    gap: 1rem;
    max-width: 98vw;
  }

  .calendar-cell:hover {
    transform: scale(1.1);
  }
}
</style>