<template>
  <div class="habit-card" :class="{ inactive: !isActiveToday }" @click="handleCardClick">
    <!-- Top bar -->
    <div class="habit-top">
      <font-awesome-icon :icon="habitIcon" class="habit-icon" />
      <button class="gear-btn" @click.stop="$emit('edit', habit)">
        <font-awesome-icon :icon="gearIcon" />
      </button>
    </div>

    <!-- Title -->
    <h3 class="habit-title">{{ habit.title }}</h3>

    <!-- Tag -->
    <span class="habit-tag">{{ habit.tag }}</span>

    <!-- Streaks -->
    <div class="streak-footer">
      <span class="left">🏆 {{ habit.highestStreak }}</span>
      <span class="right">🔥 {{ habit.currentStreak }}</span>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCog, faRunning, faBook, faPrayingHands, faBolt } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Habit",
  components: {
    FontAwesomeIcon,
  },
  props: {
    habit: Object,
  },
  computed: {
    todayBit() {
      const today = new Date().getDay(); // 0 = Sunday
      return [64, 1, 2, 4, 8, 16, 32][today]; // Match your bitmap order
    },
    isActiveToday() {
      return (this.habit.days & this.todayBit) > 0;
    },
    habitIcon() {
      // You can customize this logic per habit type/tag
      if (this.habit.title.toLowerCase().includes("exercise")) return faRunning;
      if (this.habit.title.toLowerCase().includes("prayer")) return faPrayingHands;
      if (this.habit.title.toLowerCase().includes("read")) return faBook;
      return faBolt;
    },
    gearIcon() {
      return faCog; // Default gear icon
    },
  },
  methods: {
    handleCardClick() {
      if (!this.isActiveToday) return;

      const updatedHabit = { ...this.habit };

      if (updatedHabit.type === 1) {
        updatedHabit.currentStreak += 1;
        updatedHabit.highestStreak = Math.max(
          updatedHabit.highestStreak,
          updatedHabit.currentStreak
        );
      } else {
        updatedHabit.currentStreak -= 1;
        updatedHabit.currentStreak = Math.max(0, updatedHabit.currentStreak);
      }

      this.$emit("update", updatedHabit);
    },
  },
};
</script>

<style scoped>
.habit-card {
  position: relative;
  border-radius: 10px;
  background: black;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s, opacity 0.3s;
  cursor: pointer;
}

.habit-card:hover {
  transform: scale(1.01);
}

.habit-card.inactive {
  opacity: 0.4;
}

.habit-card.inactive .gear-btn {
  opacity: 0.5;
}

.habit-card.inactive .gear-btn:hover {
  opacity: 0.8;
}

.habit-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habit-icon {
  font-size: 2rem;
  color: #0077cc;
}

.gear-btn {
  padding: 8px 16px;
  background-color: #343541;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.habit-title {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.habit-tag {
  background-color: #f0f0f0;
  color: #666;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  display: inline-block;
}

.streak-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #444;
}

.streak-footer .left {
  text-align: left;
}

.streak-footer .right {
  text-align: right;
}
</style>
