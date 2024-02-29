<template>
  <!-- ListElement.vue -->
  <div>
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
        <li v-for="(item, index) in itemsArray" :key="index">{{ item }}</li>
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
    }
  },
  mounted() {
    this.itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  }
}
</script>

<style scoped>
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
</style>
