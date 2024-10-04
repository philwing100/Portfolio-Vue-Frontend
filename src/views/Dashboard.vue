<template>
  <div>
    <!-- Top row: Hero text and navigation buttons -->
    <div class="top-row" :style="{ 'background-color': colors.sideBar }">
      <div class="heroText" :style="{ 'background-color': colors.sidebar }">10/4/2024 9:05</div>
      <div class="button-container">
        <div class="bigButton" id="previousDay" :style="{ 'background-color': colors.background }">Previous Day</div>
        <div class="bigButton" id="nextDay" :style="{ 'background-color': colors.background }">Next Day</div>
      </div>
    </div>

    <div class="page-container" :style="{ 'background-color': colors.background }">
      <div class="lists-container">
        <ListElement listName="All Tasks" @update-tasks="handleTaskUpdates"/>
        <ListElement listName="Daily List" @update-tasks="handleTaskUpdates"/>
      </div>

        <DailyCalendar
          :completed-all-tasks="completedAllTasks"
          :pending-all-tasks="pendingAllTasks"
          :completed-daily-list="completedDailyList"
          :pending-daily-list="pendingDailyList"
          @task-clicked="handleTaskClicked"
        />
    </div>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';
import ListElement from '@/components/ListItems/ListElement.vue';
import DailyCalendar from '@/components/CalendarComponents/DailyCalendar.vue';
import './cssViews/Dashboard.css';

export default {
  name: 'DashboardWorld',
  components: {
    ListElement,
    DailyCalendar
  },
  data() {
    return {
      colors: colors,
      completedAllTasks: [],   // Completed tasks from All Tasks
      pendingAllTasks: [],     // Pending tasks from All Tasks
      completedDailyList: [],  // Completed tasks from Daily List
      pendingDailyList: [],    // Pending tasks from Daily List
    };
  },
  methods: {
    handleTaskUpdates(updatedTasks, listName) {
      // Handle task updates from ListElement components and distribute to respective arrays
      if (listName === 'All Tasks') {
        this.completedAllTasks = updatedTasks.filter(task => task.completed);
        this.pendingAllTasks = updatedTasks.filter(task => !task.completed);
      } else if (listName === 'Daily List') {
        this.completedDailyList = updatedTasks.filter(task => task.completed);
        this.pendingDailyList = updatedTasks.filter(task => !task.completed);
      }
    },
    handleTaskClicked(taskData) {
      const { taskIndex, listType } = taskData;
      // Process the clicked task and send it to the right ListElement
      if (listType === 'pendingAllTasks') {
        this.pendingAllTasks.splice(taskIndex, 1);
        // Optionally move to the completed list or handle accordingly
      } else if (listType === 'pendingDailyList') {
        this.pendingDailyList.splice(taskIndex, 1);
      }
    }
  }
};
</script>
