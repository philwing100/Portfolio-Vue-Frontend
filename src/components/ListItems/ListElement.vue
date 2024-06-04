<template>
  <div class="template-container">
    <h2 @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="">
      {{ title }}
    </h2>
    <button @click="clearStorage">clearStorage</button>
    <div class="input-container">
      <input type="text" v-model="newItem" placeholder="Enter an item" @keyup.enter="addItem" class="input-field"
        spellcheck="false">
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
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          @dragover="dragOver" @drop="drop(index)">
          <div class="item-container">
            <button class="remove-button" @click="removeItem(index)">X</button>
            <div ref="itemSpan" contenteditable="true" @click="focusEditable(index)"
              @keydown.enter.prevent="handleEnter(index)" @blur="updateItem(index, $event)" class="item-text"
              spellcheck="false">{{ item }}</div>
            </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ListElement',
  props: {
    listName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      title: this.listName,
      showPopup: false,
      newItem: '',
      itemsArray: [],
      listsArray: [],
      draggedIndex: null
    };
  },
  created() {
    // Call a method to load initial data
    this.loadInitialData();
  },
  methods: {
    loadInitialData() {
      const storedTitle = localStorage.getItem('title');
      if (storedTitle) {
        this.title = storedTitle;
      }

      const storedItemsArray = localStorage.getItem('itemsArray');
      if (storedItemsArray) {
        this.itemsArray = JSON.parse(storedItemsArray);
      }
    },
    updateTitle() {
      const titleElement = this.$refs.titleInput.innerText;
      this.title = titleElement;
      localStorage.setItem('title', this.title);
    },
    addItem() {
      if (this.newItem.trim() !== '') {
        this.itemsArray.push(this.newItem.trim());
        this.newItem = '';
        localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
      }
    },
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    closePopup() {
      this.showPopup = false;
    },
    dragStart(index) {
      this.draggedIndex = index;
    },
    dragOver(event) {
      event.preventDefault();
    },
    drop(index) {
      const draggedItem = this.itemsArray[this.draggedIndex];
      this.itemsArray.splice(this.draggedIndex, 1);
      this.itemsArray.splice(index, 0, draggedItem);
      this.draggedIndex = null;
      localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
    },
    focusEditable(index) {
      this.$nextTick(() => {
        this.$refs.itemSpan[index].focus();
      });
    },
    handleBackspace() {

    },
    handleEnter(index) {
      this.itemsArray.splice(index, 0, '');
      localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
      this.focusEditable(index + 1);
    },
    handleArrowUp() {

    },
    handArrowDown() {

    },
    updateItem(index, event) {

      this.itemsArray.splice(index, 1, event.target.innerText);
      localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
    },
    removeItem(index) {
      //error occurs when the x is clicked but near the edge and so the tab tries to focus on the deleted item
      if (index === 0) {
        // Check if itemsArray exists and has at least one element
        if (this.itemsArray && this.itemsArray.length > 0) {
          this.itemsArray = this.itemsArray.slice(1);
        } else {
          // Handle the case when itemsArray is empty or undefined
          console.warn('itemsArray is empty or undefined.');
        }
      } else {
        this.itemsArray.splice(index, 1);
      }
      localStorage.setItem('itemsArray', JSON.stringify(this.itemsArray));
    },
    clearStorage() {
      localStorage.clear();
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