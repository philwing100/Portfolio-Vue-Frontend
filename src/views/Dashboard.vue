<template>
  <div>
    <!-- Top row: Hero text and navigation buttons -->
    <div class="top-row" :style="{ 'background-color': colors.sideBar }">
      <div class="button-container">
        <div class="bigButton" id="previousDay" @click="decrementDay"
          :style="{ 'background-color': colors.background }">Previous Day</div>
        <!--<DateInput  @date-selected="handleDueDateChange" :initialDate="currentDate"/>-->
        <div class="bigButton" id="nextDay" :style="{ 'background-color': colors.background }">Next Day</div>
      </div>
    </div>

    <div class="page-container" :style="{ 'background-color': colors.background }">
      <div class="lists-container">
        <ListElement
          listName="Backburner"
          v-model="backburner"
        />
        <ListElement
          listName="Daily List"
          v-model="dailyList"
        />
        <DailyCalendar v-model:list1="backburner" v-model:list2="dailyList" />
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
      dailyList: [],
      backburner: [],
      currentDate: 0,
    };
  },
  watch: {
  backburner(newVal) {
    //console.log('Backburner list updated:', newVal);
  },
  dailyList(newVal) {
    //console.log('Daily list updated:', newVal);
  }
},
  methods: {
    handleDateChange(date) {
      this.scheduledDate = date; 
      this.itemsArray[this.selectedItemIndex].scheduledDate = date;
    },
    decrementDay() {
      console.log("0");
    },
    incrementDay() {

    },
    onEventClicked({ event, listType, index }) {
      console.log(`Event clicked:`, event);
    },
  }
};
</script>
