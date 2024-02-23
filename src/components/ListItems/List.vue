<template>
    <div>
      <h1>List Page</h1>
      <button @click="addItem">Add New Element</button>
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListPage',
    data() {
      return {
        items: []
      };
    },
    mounted() {
      this.loadItems();
    },
    methods: {
      addItem() {
        const newItem = prompt('Enter new item:');
        if (newItem) {
          this.items.push(newItem);
          this.saveItems();
        }
      },
      saveItems() {
        localStorage.setItem('listItems', JSON.stringify(this.items));
      },
      loadItems() {
        const storedItems = localStorage.getItem('listItems');
        if (storedItems) {
          this.items = JSON.parse(storedItems);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  