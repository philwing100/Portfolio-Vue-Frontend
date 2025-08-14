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
            <div class="calendar-header-cell" v-for="week in 13" :key="week">{{ week }}</div>
          </div>
          <div v-for="row in 90" :key="row" class="calendar-row">
            <div class="calendar-row-label">{{ row }}</div>
            <div
              v-for="cell in 13"
              :key="cell"
              class="calendar-cell"
              :class="{ filled: isFilled(row, cell, 1) }"
            ></div>
          </div>
        </div>
      </div>
      <!-- Second column: 13 columns, no numbers -->
      <div class="calendar-grid-wrapper">
        <div class="calendar-grid">
          <div class="calendar-header-row">
            <div class="calendar-header-cell" v-for="week in 14" :key="week">
              <span v-if="week > 13">{{ week }}</span>
            </div>
          </div>
          <div v-for="row in 90" :key="row" class="calendar-row">
            <div class="calendar-row-label"></div>
            <div
              v-for="cell in 13"
              :key="cell"
              class="calendar-cell"
              :class="{ filled: isFilled(row, cell, 2) }"
            ></div>
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
      // weekIndex: 0-based index for each cell
      // First column: weeks 0-1169, second column: weeks 1170-2339
      const weekIndex = (col - 1) * (13 * 90) + (row - 1) * 13 + (cell - 1);
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
  background: var(--primaryColor, #343541);
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
  color: var(--accentColor, #fff);
  margin-left: 2rem;
}

.calendar-weeks-label {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.1rem;
  color: var(--accentColor, #fff);
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
  background: var(--secondaryColor, #222);
  border-radius: 0.5rem;
  padding: 0.5rem 0.25rem;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
}

.calendar-header-row {
  display: flex;
  margin-bottom: 0.25rem;
}

.calendar-header-cell {
  width: 1.2vw;
  min-width: 18px;
  max-width: 32px;
  text-align: center;
  font-size: 0.85rem;
  color: var(--accentColor, #fff);
  font-weight: 600;
}

.calendar-row {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.calendar-row-label {
  width: 2.2vw;
  min-width: 28px;
  max-width: 38px;
  text-align: right;
  font-size: 0.85rem;
  color: var(--accentColor, #fff);
  margin-right: 0.25rem;
  font-weight: 600;
}

.calendar-cell {
  width: 1.2vw;
  height: 1.2vw;
  min-width: 18px;
  min-height: 18px;
  max-width: 32px;
  max-height: 32px;
  background: var(--calendar-cell-bg, #444);
  border-radius: 0.2rem;
  border: 1px solid var(--secondaryColor, #222);
  margin-right: 2px;
  transition: background 0.15s;
}

.calendar-cell.filled {
  background: var(--accentColor, #fff);
  border: 1px solid var(--accentColor, #fff);
}

@media (max-width: 900px) {
  .calendar-header-cell,
  .calendar-row-label,
  .calendar-cell {
    min-width: 12px;
    max-width: 18px;
    min-height: 12px;
    max-height: 18px;
    font-size: 0.7rem;
  }
  .calendar-columns {
    gap: 1rem;
    max-width: 98vw;
  }
}
</style>