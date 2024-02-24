<template>
   <!--PopupList.vue-->
  <div>
    <h1>List Page</h1>
    AMOGUYS
    <button @click="togglePopup">Add New Element</button>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PopupList',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    togglePopup() {
      this.$emit('toggle-popup');
    }
  }
};
</script>

<style scoped>
html {
  background-color: green;
}
</style>

