<template>
    <div>
      <div class="sidebar">
        
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideBar',
    data() {
      return {
        showSidebar: true, // Initially show the sidebar
      };
    },
    methods: {
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
      },
    },
  };
  </script>
  
  <style>
:root {
  --sidebar-bg-color:#2f855a;
  --sidebar-item-hover:#38a169;
  --sidebar-item-active:#276749;
}
</style>

<style scoped>
.sidebar{
  color:white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  padding: 0.5em;

  transition: 0.2s ease;

  display: flex;
  flex-direction: column;
}

.sidebar ul{
  display: block;
  color: black;
  padding: 16px;
  text-decoration: none;

}

</style>
  