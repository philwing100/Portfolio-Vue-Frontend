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
          to="/Learn"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Learn' }"
          @click="setActiveItem('/Learn')"
        >
          Learn
        </router-link>
        <router-link
          v-if="!toggleBar"
          to="/Type"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Type' }"
          @click="setActiveItem('/Type')"
        >
          Type
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
        <router-link
          v-if="!toggleBar"
          to="/Settings"
          class="sidebarItem"
          :class="{ 'active': $route.path === '/Settings' }"
          @click="setActiveItem('/Settings')"
        >
          Settings
        </router-link>
      </nav>
    </div>
    <router-view :class="{ 'paddingWithSidebar': !toggleBar, 'paddingWithoutSidebar' : toggleBar }">
    </router-view>
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
    overflow-x: hidden;
    transition: 0.4s ease-out;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
  }
  
  .sidebarItem {
    width:100%;
    padding: 10px;
    padding-left: 10px;
    white-space: nowrap;
    text-decoration: none;
    font-size: 20px;
    display: block;
    transition: 0.3s ease-out;
    text-decoration: none; 
    color:white;
    transition: opacity 0.2s;
  }

  .sidebarItem:hover{
    background-color:lightgrey;
  }
  
  .sidebarItem.active {
    background-color: #343541;
    border-radius:12px;
    width:85%;
    padding-left:15px;
    padding-right:5px;
  }

  .needPadding{
    padding-top:30px;
  }

  .paddingWithoutSidebar{
    padding-left:30px;
    transition: 0.4s ease-out;
  }

  .paddingWithSidebar{
    padding-left:180px;
    transition: 0.4s ease-out;
  }

  .collapse-icon {
    cursor: pointer;
    transition: 0.3s linear;
    display:flex;
    justify-content: center;
    font-size:20px;
  }
  
  .rotate-180 { 
    transform: rotate(180deg);
  }
  </style>
  