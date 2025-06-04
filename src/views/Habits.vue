//Habits.Vue
//Button colors #383444
// Any special oractive in color gets this blue #0000dc
// Text on a white background gets this #b1b1b1
//Text on black background is white
// Most things are black, aka #000000
<template>

  <div class="habits-page">
    <div class="top-row">
      Habits (Backend not yet implemented)
  </div>
    <div class="habit-grid">
      <Habit v-for="habit in habits" :key="habit.id" :habit="habit" @update="updateHabit" @edit="openHabitModal" />

      <!-- Add button as a tile -->
      <div class="add-card" @click="createNewHabit">
        <AddButton />
      </div>
    </div>

    <HabitModal :isOpen="showHabitModal" :habit="selectedHabit" @update="updateHabit" @close="showHabitModal = false" />
  </div>
</template>


<script>
import Habit from "@/components/HabitComponents/Habit.vue";
import AddButton from "@/components/HabitComponents/AddButton.vue";
import TestButton from "@/components/GeneralComponents/TestButton.vue";
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import HabitModal from "@/components/HabitComponents/HabitModal.vue";

export default {
  name: "HabitsPage",
  components: {
    Habit,
    AddButton,
    TestButton,
    GenericModal,
    HabitModal,
  },
  data() {
    return {
      showGenericModal: false,
      showHabitModal: false,
      selectedHabit: null,
      habits: [
        {
          id: 1,
          title: "Exercise",
          notes: "",
          tag: "daily",
          type: 1,
          currentStreak: 2,
          highestStreak: 5,
          days: 0b1111111, // All days selected
        },
        {
          id: 2,
          title: "Procrastination",
          notes: "",
          tag: "daily",
          type: 0,
          currentStreak: 1,
          highestStreak: 5,
          days: 0b1111101, //Tuesday disabled
        },
        {
          id: 3,
          title: "Exercise",
          notes: "",
          tag: "daily",
          type: 1,
          currentStreak: 2,
          highestStreak: 5,
          days: 0b1111111,
        },
      ],
    };
  },
  methods: {
    openHabitModal(habit) {
      this.selectedHabit = habit;
      this.showHabitModal = true;
    },
    updateHabit(updatedHabit) {
      if (updatedHabit.id != null) {
        // Existing habit — update
        const index = this.habits.findIndex((h) => h.id === updatedHabit.id);
        if (index !== -1) {
          this.habits[index] = { ...updatedHabit };
        }
      } else {
        // New habit — assign ID and add
        const maxId = this.habits.length
          ? Math.max(...this.habits.map((h) => h.id))
          : 0;
        updatedHabit.id = maxId + 1;
        this.habits.push({ ...updatedHabit });
      }

      this.showHabitModal = false;
    },

    openGenericModal() {
      console.log("Opening Generic Modal...");
      this.showGenericModal = true;
    },
    createNewHabit() {
      this.selectedHabit = {
        id: null,
        title: "",
        notes: "",
        tag: "",
        type: 1,
        currentStreak: 0,
        highestStreak: 0,
      };
      this.showHabitModal = true;
    },

  },
};

</script>
<style scoped>
.habits-page {
  overflow: auto;
  min-height: 100%;
  background-color: #383444;
}

.habit-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #383444;
  padding: 1px;
}

.habit-grid>* {
  flex: 0 0 calc(33.333% - 0.67rem);
  /* 3 cards per row with gaps */
  box-sizing: border-box;
}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 1rem;
  padding: 1rem;
  min-height: 160px;
  cursor: pointer;
  background-color: black;
  transition: background 0.2s ease;
}

.add-card:hover {
  background-color: #f9f9f9;
}
title{
  color: red;
    font-size: 24px;
}
.top-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh; /* Fixed height of 10% of the viewport */
  padding: 0 20px;
  color:White;
  background-color: black;
  font-size:24px;
}
</style>
