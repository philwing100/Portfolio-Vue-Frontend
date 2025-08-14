//Habits.Vue
//Button colors #383444
// Any special oractive in color gets this blue #0000dc
// Text on a white background gets this #b1b1b1
//Text on black background is white
// Most things are black, aka #000000
<template>
  <div class="habits-page">
    <div class="top-row">
      Streaks
    </div>
    <div class="habit-grid">
      <Habit v-for="habit in habits" :key="habit.id" :habit="habit" @update="updateHabit" @edit="openHabitModal" />

      <!-- Add button as a tile -->
      <div class="add-card" @click="createNewHabit">
        <AddButton />
      </div>
    </div>

    <HabitModal :isOpen="showHabitModal" :habit="selectedHabit" @update="updateHabit" @delete="deleteHabit"
      @close="showHabitModal = false" />
  </div>
</template>


<script>
import Habit from "@/components/HabitComponents/Habit.vue";
import AddButton from "@/components/HabitComponents/AddButton.vue";
import TestButton from "@/components/GeneralComponents/TestButton.vue";
import GenericModal from "@/components/GeneralComponents/GenericModal.vue";
import HabitModal from "@/components/HabitComponents/HabitModal.vue";
import { axiosPost, getStreaks } from '../api.js';
import { getTodayDate, normalizeDate } from "@/date";

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
      defaultHabits: [
        {
          id: 1,
          title: "Exercise",
          notes: "",
          goal: 5,
          tag: "daily",
          currentStreak: 4,
          highestStreak: 5,
          days: 0b1111111, // All days selected
          lastUpdated: "2025-06-01",
          color: "#FF0000",
        },
        {
          id: 2,
          title: "Competetive Coding",
          notes: "",
          goal: 5,
          tag: "daily",
          currentStreak: 1,
          highestStreak: 5,
          days: 0b1111101, //Tuesday disabled
          lastUpdated: "2025-06-01",
          color: "#00BFFF",
        },
        {
          id: 3,
          title: "Daily Reading",
          notes: "",
          goal: 7,
          tag: "daily",
          currentStreak: 4,
          highestStreak: 4,
          days: 0b1111111,
          lastUpdated: "2025-06-01",
          color: "#7CFC00",
        },
      ],
      habits: [],
    };
  },
  async created() {
    await this.fetchStreaks();
  },
  methods: {
    openHabitModal(habit) {
      this.selectedHabit = habit;
      this.showHabitModal = true;
    },
    loadHabitFromGet(habit) {//expects habit from api
      let newHabit = {
        id: habit.streakID,
        title: habit.title,
        notes: habit.notes,
        goal: habit.goal,
        tag: habit.tag,
        currentStreak: habit.currentStreak,
        highestStreak: habit.highestStreak,
        days: habit.days,
        lastUpdated: normalizeDate(habit.lastUpdated),
        color: habit.color,
      };
      return newHabit;
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
      console.log('post test: ' + axiosPost('/streaks/', 'updateStreak', { updatedHabit }));

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
        goal: 1,
        tag: "",
        currentStreak: 0,
        highestStreak: 0,
        days: 0b1111111,
        lastUpdated: normalizeDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
        color: "#00BFFF",
      };
      this.showHabitModal = true;
    },
    deleteHabit(habitId) {
      const index = this.habits.findIndex(h => h.id === habitId);
      if (index !== -1) {
        this.habits.splice(index, 1);
      }
      this.showHabitModal = false;
      axiosPost('/streaks/', 'deleteStreak', { habitId });
    },
    async fetchStreaks() {
      try {
        await this.$store.dispatch('checkAuth');
        if (this.$store.state.isAuthenticated) {
          const response = await getStreaks();
          if (response?.message !== "No streaks found for this user") {
            console.dir(response, { depth: null });
            if (response.data) {
              this.habits = [];
              for (const habit of response.data) {
                this.habits.push(this.loadHabitFromGet(habit));
              }
            }
          }
        } else {
          // Use default habits for unauthenticated users
          this.habits = JSON.parse(JSON.stringify(this.defaultHabits));
        }
      } catch (err) {
        console.error("Error fetching streaks:", err);
        // Fallback to default habits on error
        this.habits = JSON.parse(JSON.stringify(this.defaultHabits));
      }
    },
  },
};

</script>
<style scoped>
.habits-page {
  overflow: auto;
  min-height: 100%;
  background-color: var(--primaryColor);
  color: var(--accentColor);
}

.habit-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--primaryColor);
}

.habit-grid>* {
  width: 100%;
  box-sizing: border-box;
}

.add-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.125rem dashed var(--accentColor);
  border-radius: 1rem;
  padding: 1rem;
  min-height: 10rem;
  cursor: pointer;
  background-color: var(--secondaryColor);
  transition: background-color 0.2s ease;
  color: var(--accentColor);
}

.add-card:hover {
  background-color: var(--accentColor);
  color: var(--primaryColor);
}

.top-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  padding: 0 1.25rem;
  color: var(--accentColor);
  background-color: var(--primaryColor);
  font-size: 1.5rem;
}
</style>
