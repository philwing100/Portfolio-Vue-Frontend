<template>
<SideBar />
  <nav>
    <router-link to="/">Dashboard</router-link> |
    <router-link to="/Lists">Lists</router-link> |
    <router-link to="/Settings">Settings</router-link>
  </nav>
  <router-view/>

</template>

<script>
import SideBar from './components/Sidebar.vue';

export default {
  components: {
    SideBar,
  },
};
</script>

<style>

body, html {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
