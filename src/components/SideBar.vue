<template>
    <div :style="{ width: sidebarWidth + 'px' }" class="sidebar">
      <div @click="toggleWidth" class="collapse-icon" :class="{ 'rotate-180': !toggleBar }">></div>
      <nav class="needPadding">
              <router-link v-if="!toggleBar" to="/Dashboard" class="sidebarItem">Dashboard</router-link>
              <router-link v-if="!toggleBar" to="/Lists" class="sidebarItem">Lists</router-link>
              <router-link v-if="!toggleBar" to="/Settings" class="sidebarItem">Settings</router-link>
              <router-link v-if="!toggleBar" to="/" class="sidebarItem">About Me</router-link>
        </nav>
    </div>
    <router-view :class="{ 'paddingWithSidebar': !toggleBar, 'paddingWithoutSidebar' : toggleBar }"></router-view>
  </template>

  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'SideBar',
    setup() {
      const toggleBar = ref(false);
      const sidebarWidth = ref(180);
  
      const toggleWidth = () => {
        toggleBar.value = !toggleBar.value;
        sidebarWidth.value = toggleBar.value ? 30 : 180;
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
    color:darkgrey;
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
  