<template>
  <SearchBar />
  <SideBar />
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import SideBar from './components/SideBar.vue'

export default {
  name: 'App',
  components: {
    SideBar,
    SearchBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.color-1{
  background-color: #383444;
}

.text-color-1{
  color:white;
}

.small-text-color{
  color:#4f504d;
}

body, html {
    margin: 0;
    padding: 0;
}

</style>
