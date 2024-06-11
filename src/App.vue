<template>
  <SideBar :colors="colors"/>
  <div class="everythingElse">
  </div>
</template>

<script>
import SideBar from './components/SidebarComponents/SideBar.vue';
import colorsData from '@/assets/colors.json';

export default {
  components: {
    SideBar,
  },
  provide() {
    if (colorsData) {
      return {
        colors: colorsData,
      };
    } else {
      return {
        colors: {
          primary: '#3498db',
          secondary: '#2ecc71',
          downClick: '#e74c3c',
          clicked: 'e',
          hover: '#383444',
          text: 'white',
          background: '#343541',
          sidebar: '#000000',
        },
      };
    }
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  color: var(--text-color);
  background-color: var(--primary-color);
}

#app {
  font-family: 'Roboto', sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.everythingElse {
  padding-left: 200px;
}
</style>
