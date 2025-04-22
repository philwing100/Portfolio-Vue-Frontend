<template>
    <div class="habit-card" @click="$emit('edit', habit)">
      <div class="habit-header">
        <h3>{{ habit.title }}</h3>
        <span class="tag">{{ habit.tag }}</span>
      </div>
  
      <div class="habit-meta">
        <span
          class="type-indicator"
          :class="{ positive: habit.type === 1, negative: habit.type === 0 }"
        >
          {{ habit.type === 1 ? "➕ Positive" : "➖ Negative" }}
        </span>
        <div class="streaks">
          🔥 {{ habit.currentStreak }} | 🏆 {{ habit.highestStreak }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Habit",
    props: {
      habit: Object,
    },
  };
  </script>
  
  <style scoped>
  .habit-card {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    transition: box-shadow 0.2s ease;
  }
  .habit-card:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }
  
  .habit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .tag {
    background-color: #eee;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
    color: #555;
  }
  
  .habit-meta {
    margin-top: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .type-indicator {
    font-weight: bold;
  }
  .type-indicator.positive {
    color: #4caf50;
  }
  .type-indicator.negative {
    color: #f44336;
  }
  
  .streaks {
    font-size: 0.9rem;
    color: #333;
  }
  </style>
  