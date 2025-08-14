<template>
  <SideBar />
  <div class="everythingElse">
  </div>
</template>

<script>
import SideBar from './components/SidebarComponents/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  mounted() {
    // Try to load colors from localStorage and apply to :root
    const saved = JSON.parse(localStorage.getItem('siteColors') || 'null');
    if (saved) {
      document.documentElement.style.setProperty('--primaryColor', saved.primary);
      document.documentElement.style.setProperty('--secondaryColor', saved.secondary);
      document.documentElement.style.setProperty('--accentColor', saved.accent);
    }
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
  font-size: 16px; /* base for rem units */
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.everythingElse {
  padding-left: 12.5rem; /* 200px = 12.5rem */
}
</style>