<template>
  <div>
    <div class="grid-container">
      <div class="heroText" :style="{ 'background-color': colors.sidebar }">Current Task: Work on Dashboard</div>
      <div class="bigButton previousDay" :style="{ 'background-color': colors.sidebar }">Previous Day</div>
      <div class="bigButton nextDay" :style="{ 'background-color': colors.sidebar }">Next Day</div>

      <div class="contentContainer">
        <div class="listContainer">All tasks
          <div class="innerListContainer">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>
        </div>
        <div class="listContainer">Today's Tasks
          <div class="innerListContainer">
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
            </ul>
          </div>

        </div>
      </div>
        <div class="calendarTemp">Insert Daily Calendar Here</div>
      
    </div>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';

export default {
  name: 'DashboardWorld',

  setup() {
    return {
      colors: colors
    };
  },

}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-rows: 200px 500px;
  height: 100vh;
  padding-top: 10px;
}

.heroText {
  font-size: 30px;
  grid-row: 1;
}

.bigButton {
  grid-row: 1;
  color: white;
}

.previousDay {}

.nextDay {}

.listContainer {
  grid-row: 2;
  border-radius: 10px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  min-height: 300px;
  min-width: 200px;
  max-width: 300px;
  padding: 5px 10px;
  margin: 10px 10px 20px 10px;
}

.innerListContainer {}

.calendarTemp {}

.contentContainer {
  display: flex;
  flex-flow: row;
}

.calendarTemp {
  border-radius: 10px;
  border-color: white;
  border-style: solid;
  background-color: green;
  flex:1;
}
</style>
