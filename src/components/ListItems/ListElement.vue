<template>
  <div class="template-container">
    <h2>All tasks</h2>
    <div class="input-container">
      <input type="text" v-model="newItem" placeholder="Enter an item" @keyup.enter="addItem">
      <button @click="addItem">Add Item</button>
    </div>
    <button @click="removeAllItems">Remove All</button>
    <button @click="togglePopup">Toggle Popup</button>
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <span class="close" @click="closePopup">X</span>
        <div class="popup-content">
          <!--<PopupList :items="items" />-->
        </div>
      </div>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index">
          {{ item }}
          <button @click="removeItem(index)">X</button> <!-- Add X button -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListElement',
  data() {
    return {
      showPopup: false,
      newItem: '',
      itemsArray: []
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    closePopup() {
      this.showPopup = false;
    },
    addItem() {
      if (this.newItem.trim() !== '') {
        this.itemsArray.push(this.newItem);
        localStorage.setItem('items', JSON.stringify(this.itemsArray));
        this.newItem = '';
      }
    },
    removeAllItems() {
      localStorage.removeItem('items');
      this.itemsArray = [];
    },
    removeItem(index) { // Method to remove item from array and localStorage
      this.itemsArray.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(this.itemsArray));
    }
  },
  mounted() {
    this.itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  }
}
</script>

<style scoped>
.template-container {
  background-color: purple;
  border-radius: 10px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  min-height: 400px;
  max-height: 600px;
  min-width: 300px;
  max-width: 400px;
  padding: 5px 10px;
  margin: 10px 10px 20px 10px;
}

.input-container {
  margin-bottom: 10px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: blue;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.popup-content {
  background-color: green;
}

.ListItem li {
  position: relative;
}

.ListContainer {
  max-height: 300px; /* Set a maximum height for the container */
  overflow-y: auto; /* Enable vertical scrollbar when needed */
}

.ListItem {
  padding: 0; /* Remove padding to avoid additional space */
}

.ListItem li button {
  margin-left: 10px; /* Add some spacing between the item and the X button */
}

li {
  background-color: green;
  list-style-type: none;
}
</style>
