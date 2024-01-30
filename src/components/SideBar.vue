<template>

<button @click="toggleWidth">Toggle Width</button>
    <div :style="{ width: sidebarWidth + 'px' }" class="sidebar">
    </div>
  <div id="sideNav" class="sidebar">
    <nav>
      <ul>
        <span class="collapse-icon">
          <i class="fas fa-angle-double-left"></i>
        </span>
        <div class="sidebarItem">
          <router-link to="/">Dashboard</router-link>
        </div>
        <div class="sidebarItem">
          <router-link to="/Lists">Lists</router-link>
        </div>
        <div class="sidebarItem">
          <router-link to="/Settings">Settings</router-link>
        </div>
      </ul>
    </nav>
  </div>

  <router-view></router-view>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SideBar',
  setup() {
    // Define a reactive variable for the sidebar width
    const sidebarWidth = ref(200); // Initial width

    // Function to toggle the sidebar width
    const toggleWidth = () => {
      // Change the sidebar width based on some condition
      sidebarWidth.value = sidebarWidth.value === 200 ? 100 : 200;
    };

    // Return data and functions to be used in the template
    return {
      sidebarWidth,
      toggleWidth,
    };
  },
};
</script>

<style>
.sidebar {
  height: 100%;
  width: 200px; /* Set an initial width */
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: width 0.5s; 
  padding-top: 60px;
  display: flex;
  flex-direction: column;
}

.sidebarItem {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidebarItem:hover {
  color: #f1f1f1;
}

.collapse-icon{
  position: absolute;
  padding: 0.75em;

  color: white;
  transition: 0.2s linear;
}

.rotate-180{
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
