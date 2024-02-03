<template>
    <div :style="{ width: sidebarWidth + 'px', 'background-color': colors.sidebar }" class="sidebar" >
      <div @click="toggleWidth" class="collapse-icon" :class="{ 'rotate-180': !toggleBar }">></div>
      <nav class="needPadding">
        <router-link
          v-if="!toggleBar"
          to="/Dashboard"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Dashboard' }"
          @click="setActiveItem('/Dashboard')"
        >
          Dashboard
        </router-link>
        <router-link
          v-if="!toggleBar"
          to="/Lists"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Lists' }"
          @click="setActiveItem('/Lists')"
        >
          Lists
        </router-link>
        <router-link
          v-if="!toggleBar"
          to="/Settings"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Settings' }"
          @click="setActiveItem('/Settings')"
        >
          Settings
        </router-link>
        <router-link
          v-if="!toggleBar"
          to="/"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/' }"
          @click="setActiveItem('/')"
        >
          About Me
        </router-link>
      </nav>
    </div>
    <router-view :class="{ 'paddingWithSidebar': !toggleBar, 'paddingWithoutSidebar' : toggleBar }"></router-view>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import colors from '@/assets/colors.json';
 
  export default {
    name: 'SideBar',
    setup() {
      const toggleBar = ref(false);
      const sidebarWidth = ref(180);
      const activeItem = ref(null);
  
      const toggleWidth = () => {
        toggleBar.value = !toggleBar.value;
        sidebarWidth.value = toggleBar.value ? 30 : 180;
      };
  
      const setActiveItem = (item) => {
        activeItem.value = item;
      };
  
      const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
          toggleWidth();
        }
      };
  
      onMounted(() => {
        // Add event listener when the component is mounted
        document.addEventListener('keyup', handleEscapeKey);
      });
  
      onUnmounted(() => {
        // Remove event listener when the component is unmounted
        document.removeEventListener('keyup', handleEscapeKey);
      });
  
      return {
        toggleBar,
        sidebarWidth,
        toggleWidth,
        activeItem,
        setActiveItem,
        colors: colors,
      };
    },

    beforeRouteUpdate(to, from, next) {
      // Update the activeItem when the route changes
      this.setActiveItem(to.path);
      next();
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
    background-color: colors.sidebar;
    overflow-x: hidden;
    transition: width 0.5s;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    color:white;
  }
  
  .sidebarItem {
    width:100%;
    padding: 5px;
    white-space: nowrap;
    text-decoration: none;
    font-size: 20px;
    display: block;
    transition: 0.3s;
    text-decoration: none; 
    color:white;
    transition: opacity 0.1s;
  }

  .sidebarItem:hover{
    background-color:lightgrey;
  }
  
  .sidebarItem.active {
    background-color: green;
  }

  .needPadding{
    padding-top:30px;
  }

  .paddingWithoutSidebar{
    padding-left:50px;
    transition: 0.3s linear;
  }

  .paddingWithSidebar{
    padding-left:200px;
    transition: 0.3s linear;
  }

  .collapse-icon {
    cursor: pointer;
    transition: 0.15s linear;
    display:flex;
    justify-content: center;
  }
  
  .rotate-180 { 
    transform: rotate(180deg);
  }
  </style>
  