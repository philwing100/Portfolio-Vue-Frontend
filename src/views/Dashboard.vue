<template>
  <div>
    <!-- Top row: Hero text and navigation buttons -->
    <div class="top-row" :style="{ 'background-color': colors.sideBar }">
      <div class="button-container">
       <!-- <MultiplayerToggle v-model="isChecked" label="Multiplayer"/>-->
        <!--Need to put these in a v-if is bound to the emits of multiplayer toggle-->
          <div class="bigButton" id="previousDay" @click="decrementDay"
            :style="{ 'background-color': colors.background }">&lt;&lt;</div>
          <DateInput :style="{margin:'0px',color:'white' }" @date-selected="handleDateChange" v-model="currentDate"/>
          <div class="bigButton" id="nextDay" @click="incrementDay"
          :style="{ 'background-color': colors.background }">>></div>
      </div>
    </div>

    <div class="page-container" :style="{ 'background-color': colors.background }">
      <div class="lists-container">
        <ListElement listName="Backburner" v-model="backburner" />
        <ListElement listName="Daily List" v-model="dailyList" :initialDate="currentDate"/>
        <DailyCalendar v-model:list1="backburner" v-model:list2="dailyList" :date="currentDate"/>
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
import MultiplayerToggle from '@/components/DashboardComponents/MultiplayerToggle.vue';
import { getTodayDate, incrementDate, decrementDate } from '../date.js'
import { mapState } from 'vuex'; // Importing Vuex to access state

export default {
  name: 'DashboardWorld',
  components: {
    ListElement,
    DailyCalendar,
    DateInput,
    MultiplayerToggle,
  },
  data() {
    return {
      colors: colors,
      dailyList: [],
      backburner: [],
      currentDate: getTodayDate(),
      isChecked: false,
    };
  },
  computed: {
    ...mapState(['isAuthenticated', 'user']),
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
      this.currentDate = decrementDate(this.currentDate);
    },
    incrementDay() {
      this.currentDate = incrementDate(this.currentDate);
    },
    onEventClicked({ event, listType, index }) {
      console.log(`Event clicked:`, event);
    },
  },
  mounted(){
    
  }
};
</script>
