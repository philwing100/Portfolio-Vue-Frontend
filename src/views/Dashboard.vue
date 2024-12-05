<template>
  <div>
    <!-- Top row: Hero text and navigation buttons -->
    <div class="top-row" :style="{ 'background-color': colors.sideBar }">
      <div class="button-container">
        <div class="bigButton" id="previousDay" @click="decrementDay" :style="{ 'background-color': colors.background }">Previous Day</div>
        <!--<DateInput  @date-selected="handleDueDateChange" :initialDate="currentDate"/>-->
        <div class="bigButton" id="nextDay" :style="{ 'background-color': colors.background }">Next Day</div>
      </div>
    </div>

    <div class="page-container" :style="{ 'background-color': colors.background }">
      <div class="lists-container">
        <ListElement listName="Backburner"/>
        <ListElement listName="Daily List"/>
      </div>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable*/
//       <DailyCalendar/>
import colors from '@/assets/colors.json';
import ListElement from '@/components/ListItems/ListElement.vue';
import DailyCalendar from '@/components/CalendarComponents/DailyCalendar.vue';
import DateInput from '@/components/ListItems/DateInput.vue';
import './cssViews/Dashboard.css';

export default {
  name: 'DashboardWorld',
  components: {
    ListElement,
    DailyCalendar,
    DateInput,
  },
  data() {
    return {
      colors: colors,
      completedAllTasks: [],   // Completed tasks from All Tasks
      pendingAllTasks: [],     // Pending tasks from All Tasks
      completedDailyList: [],  // Completed tasks from Daily List
      pendingDailyList: [],    // Pending tasks from Daily List
      currentDate: 0,
    };
  },
  methods: {
    handleTaskUpdates(updatedTasks, listName) {

    },
    handleTaskClicked(taskData) {

    },
    handleDateChange(date) {
      this.scheduledDate = date; // Update the parent component's selectedDate
      this.itemsArray[this.selectedItemIndex].scheduledDate = date;
    },
    decrementDay(){
      console.log("0");
    },
    incrementDay(){

    },
  }
};
</script>
