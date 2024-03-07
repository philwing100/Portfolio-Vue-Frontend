<template>
  <div class="template-container">
    <h2 @blur="updateTitle" contenteditable="true" ref="titleInput">
      {{ title }}
    </h2>
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
          <div class="item-container">
            <button class="remove-button" @click="removeItem(index)">X</button>
            <span contenteditable="true" @blur="updateItem(index, $event)">{{ item }}</span>
          </div>
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
      title: 'All tasks', // Initial title
      showPopup: false,
      newItem: '',
      itemsArray: []
    };
  },
  methods: {
    updateTitle() {
      // Update the title when the <h2> element loses focus
      this.title = this.$refs.titleInput.innerText;
      localStorage.setItem('title', this.title);
    },

    updateItem(index, event) {
      // Update the item at the specified index when the list item loses focus
      this.itemsArray[index] = event.target.innerText.trim();
      localStorage.setItem('items', JSON.stringify(this.itemsArray));
    },
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
    this.title = localStorage.getItem('title') || 'All tasks';
    this.itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  }
}
</script>

<style scoped>

.remove-button {
  user-select: none;
}

.template-container {
  background-color: black;
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
  background-color: red;
}

.ListItem li {
  position: relative;
  padding-top:1.45px;
  padding-bottom:1.45px;
  padding-left:10px;
}

.ListContainer {
  max-height: 300px;
  max-width: 300px;
  overflow-y: auto;
  display: flex;
}

.ListItem {
  padding: 0;
}

.ListItem, .RemoveButtonContainer {
  list-style-type: none;
  padding: 0;
}

li {
  list-style-type: none;
}

.item-text{
  margin-left:10px;
}

</style>
