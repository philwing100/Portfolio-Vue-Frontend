<template>
  <div>
    <div class="top-row" :style="{ 'background-color': colors.sidebar }">
      <div class="heroText" :style="{ 'background-color': colors.sidebar }">Current Task: Work on Dashboard</div>
      <div class="button-container">

        <div class="bigButton" id="previousDay" :style="{ 'background-color': colors.background }">Previous Day
        </div>
        <div class="bigButton" id="nextDay" :style="{ 'background-color': colors.background }">Next Day
        </div>
      </div>
    </div>
    <div class="page-container" :style="{ 'background-color': colors.background }">
      <div class="content-container" :style="{ 'background-color': colors.background }">
        <div class="listContainer">All tasks

          <div>
            <!-- Button to toggle rendering of another component -->
            <button @click="toggleComponent">Toggle Component</button>

            <!-- Render the component based on the value of showComponent -->
            <div v-if="showComponent">
              <!-- AnotherComponent will be rendered here when showComponent is true -->
              <PopupContainer />
            </div>
          </div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
      <div class="listContainer" id="todayTasks">Today's Tasks
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
</template>

<script>
import colors from '@/assets/colors.json';
import { ref } from 'vue';
import PopupContainer from '@/components/ListItems/PopupContainer.vue';

export default {
  name: 'DashboardWorld',
  components: {
    PopupContainer
  },

  setup() {
    // Define a reactive variable to control the rendering of the component
    const showComponent = ref(false);

    // Function to toggle the value of showComponent
    const toggleComponent = () => {
      showComponent.value = !showComponent.value;
    };

    return {
      colors: colors,
      showComponent,
      toggleComponent
    };
  },
}
</script>

<style>
.top-row {
  grid-row: 1;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.button-container {
  min-width: 300px;
  display: flex;
  flex-direction: row;
}

.heroText {
  font-size: 30px;
  margin: 10px 0px 10px 20px;
}

.bigButton {
  color: white;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 100px 10px;
}

.page-container {
  display: flex;
  padding-top: 10px;
  flex-direction: row;
  padding-left: 10px;
}

.listContainer {
  border-radius: 10px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  min-height: 400px;
  max-height: 600px;
  min-width: 300px;
  max-width: 400px;
  padding: 5px 10px;
  margin: 10px 10px 20px 10px;
}

.innerListContainer {}

li {}

.content-container {
  grid-row: 2;
  display: flex;
  flex-flow: row;
  min-width: 600px;
  justify-content: space-around;
}

.calendarTemp {
  grid-row: 2;
  border-radius: 10px;
  border-color: white;
  border-style: solid;
  background-color: black;
  flex: 1;
  min-width: 450px;
  max-width: 700px;
  margin-left: 10px
}
</style>
