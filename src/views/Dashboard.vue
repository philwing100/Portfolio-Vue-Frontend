<template>
  <div>
    <div class="grid-container">
    <div class="heroText">Current Task: Work on Dashboard</div>
    <div class="bigButton previousDay" :style="{'background-color': colors.sidebar}">Previous Day</div>
    <div class="bigButton nextDay" :style="{'background-color': colors.sidebar}">Next Day</div>


  
    <div class="Seperator"></div>
    <div class="listContainer allTasks">All tasks</div>
    <div class="listContainer todayTasks">Today's Tasks</div>

    <div class="calendarTemp">Insert Daily Calendar Here</div>
  </div>
</div>
</template>

<script>
import colors from '@/assets/colors.json';

export default {
  name: 'DashboardWorld',

  setup() {
    return{
    colors:colors
  };
  },

}
</script>

<style>
.grid-container{
  display:grid;
  grid-template-rows: 200px 100px 400px;
  height: 100vh;
}

.heroText{
  font-size:30px;
  grid-row:1;
}

.bigButton{
  grid-row:1;
  color:white;
}

.previousDay{
}

.nextDay{
}

.allTasks{
  grid-row:3;
}

.todayTasks{
  grid-row:3;
}

.calendarTemp{
  grid-row:3;

}
</style>
