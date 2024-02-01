<template>
  <div>
    <button @click="toggleWidth">Toggle Width</button>
    <div :style="{ width: sidebarWidth + 'px' }" class="sidebar">
      <div v-show="!toggleBar" class="collapse-icon rotate-180">
        <i class="fas fa-angle-double-left"></i>
      </div>
      <div id="sideNav" class="sidebar-content">
        <nav>
          <ul>
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
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SideBar',
  setup() {
    const toggleBar = ref(false);
    const sidebarWidth = ref(200);

    const toggleWidth = () => {
      toggleBar.value = !toggleBar.value;
      sidebarWidth.value = toggleBar.value ? 38 : 200;
    };

    return {
      toggleBar,
      sidebarWidth,
      toggleWidth,
    };
  },
};
</script>

<style>
.sidebar {
  height: 100%;
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

.sidebar-content {
  width: 100%;
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

.collapse-icon {
  padding: 0.75em;
  color: white;
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
