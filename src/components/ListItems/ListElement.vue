<template>
  <div class="template-container">
<<<<<<< HEAD
    <h2 @blur="changeTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="changeTitle">
=======
    <h2 @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="">
>>>>>>> f1b18ed0f558732cf9fa5a1c878f9632fd9bffa4
      {{ title }}
    </h2>
    <button @click="clearStorage">Clearstorage</button>
    <div class="input-container">
<<<<<<< HEAD
      <input type="text" v-model="newItem" placeholder="Enter an item" @keyup.enter.prevent="addItem"
        class="input-field" spellcheck="false">
=======
      <input type="text" v-model="newItem" placeholder="Enter an item" @keyup.enter="addItem" class="input-field"
        spellcheck="false">
>>>>>>> f1b18ed0f558732cf9fa5a1c878f9632fd9bffa4
      <button @click="addItem" class="add-button">Add Item</button>
    </div>
    <button @click="togglePopup" class="toggle-popup-button">Toggle Popup</button>
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <span class="close" @click="closePopup">X</span>
        <div class="popup-content">
          <!-- Optional Popup Content -->
        </div>
      </div>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
<<<<<<< HEAD
        <li v-for="(item, index) in itemsArray" :key="index" :class="{ 'checked': itemsArrayBoolean[index] }">
          <input type="checkbox" v-model="itemsArrayBoolean[index]" @change="checkBoxClicked(index)">
          {{ item }}
=======
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          @dragover="dragOver" @drop="drop(index)" @click="focusEditable(index)">
          <div class="item-container">
            <button class="remove-button" @click="removeItem(index)">X</button>
            <span contenteditable="true" @keydown.enter.prevent="handleEnter(index)" @blur="updateItem(index, $event)"
              class="item-text" spellcheck="false">{{ item }}</span>
          </div>
>>>>>>> f1b18ed0f558732cf9fa5a1c878f9632fd9bffa4
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListElement',
  //So the data is all the stuff currently being displayed
  data() {
    return {
      title: "",
      newItem: '',
<<<<<<< HEAD
      itemsArray: [],
      storageItems: 0,
      itemsArrayBoolean: [] // Array to store boolean values for checkboxes
    };
  },
  created() {
    this.title = localStorage.getItem('title') || this.listName;
    this.itemsArray = JSON.parse(localStorage.getItem('items')) || [];
    // Initialize itemsArrayBoolean with false values for each item
    this.itemsArrayBoolean = new Array(this.itemsArray.length).fill(false);
    this.loadListItems(this.title);
  },
  methods: {
    changeTitle() {
      const newTitle = this.getTitle();
      localStorage.setItem("title", newTitle);
      this.loadListItems(newTitle);
    },
    getTitle() {
      const titleElement = this.$refs.titleInput;
      this.title = titleElement.innerText; // Correct capitalization
      return this.title;
    },
    saveListItems() {
      if (this.title) {
        localStorage.setItem(this.title, JSON.stringify(this.itemsArray));
      }
    },
    loadListItems(title) {
      if (title) {
        const items = localStorage.getItem(title);
        this.itemsArray = items ? JSON.parse(items) : [];
        // Update itemsArrayBoolean length based on new itemsArray length
        this.itemsArrayBoolean = new Array(this.itemsArray.length).fill(false);
      }
    },
    addItem() {
      if (this.newItem.trim() !== '') {
        this.itemsArray.push(this.newItem.trim());
        // Add corresponding boolean value for the new item
        this.itemsArrayBoolean.push(false);
        this.newItem = '';
        this.saveListItems();
      }
    },
    removeItem(index) {
      // Remove item from both arrays
      this.itemsArray.splice(index, 1);
      this.itemsArrayBoolean.splice(index, 1);
      this.saveListItems();
    },
    checkBoxClicked(index) {
      // Reorder list and gray out checked item
      const checkedItem = this.itemsArray.splice(index, 1)[0];
      const checkedItemBoolean = this.itemsArrayBoolean.splice(index, 1)[0];
      this.itemsArray.push(checkedItem);
      this.itemsArrayBoolean.push(checkedItemBoolean);
      // Save list state
      this.saveListItems();
    },
    clearStorage(){
      localStorage.clear();
=======
      itemsArray: [[]],
      draggedIndex: null
    };
  },
  created() {

  },
  methods: {
    updateTitle(){
        const titleElement = this.$refs.titleInput.innerText;
        this.title = titleElement;
        if()

    },
    addItem(){

    },
    loadItems(){

>>>>>>> f1b18ed0f558732cf9fa5a1c878f9632fd9bffa4
    }
  }
}
</script>


<style scoped>
.drag-button {
  padding: 4px;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 4px;
}

/* Styles for dragging */
.ListItem li {
  cursor: move;
}

.checked {
  color: green; /* Gray out checked item */
  background-color:green;
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
  display: flex;
  align-items: center;
}

.input-field {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 14px;
}

.add-button,
.toggle-popup-button {
  padding: 8px 16px;
  background-color: #2d5dc7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.remove-button {
  padding: 4px 8px;
  background-color: #343541;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  margin-right: 8px;
}

.ListContainer {
  display: flex;
  flex-direction: column;
}

.ListItem {
  padding: 0;
}

.item-container {
  display: flex;
  align-items: center;
}

.item-text {
  margin-left: 10px;
  outline: none;
}

.ListItem li {
  position: relative;
  padding-top: 1.45px;
  padding-bottom: 1.45px;
  padding-left: 10px;
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

.ListItem,
.RemoveButtonContainer {
  list-style-type: none;
  padding: 0;
}

li {
  list-style-type: none;
  padding-right: 10px;
  spellcheck: false;
}

li:hover {
  background-color: grey;
  border-radius: 15px;
}
</style>