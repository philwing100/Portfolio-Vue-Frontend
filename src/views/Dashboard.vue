<template>
  <div class="grid-container">
    <div class="heroText">Current Task: Work on Dashboard</div>
    <div class="bigButton previousDay">Previous Day</div>
    <div class="bigButton nextDay">Next Day</div>
    <div class="listContainer allTasks">All tasks</div>
    <div class="listContainer todayTasks">Today's Tasks</div>

    <div class="calendarTemp">Insert Daily Calendar Here</div>

  </div>

</template>

<script>

export default {
//import colors from '@/assets/colors.json';


  name: 'DashboardWorld',
  components: {
  }
}
</script>

<style>
.grid-container{
  display:grid;
  grid-template-columns: 250px 250px 250px 250px 250px 250px;
  grid-template-rows: 100px ifr;
  height:100vh;
}

.heroText{
  font-size:30px;
}

.bigButton{

}

.previousDay{
 grid-column:3;
}

.nextDay{
  grid-column:4;
}

.allTasks{
  grid-column:1;
  grid-row:2;
}

.todayTasks{
  grid-column:2;
  grid-row:2;
}

.calendarTemp{
  grid-column:3;
  grid-row:2;
}
</style>
