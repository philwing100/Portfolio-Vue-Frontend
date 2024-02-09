<template>
    <SideBar />
    <div class="everythingElse">
    </div>

</template>

<script>
import SideBar from './components/SideBar.vue';

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
  color: white;
  background-color: #343541;
}

#app {
  font-family: 'Roboto', sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.everythingElse{
  padding-left:200px;
}

</style>
