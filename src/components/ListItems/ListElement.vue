<template>
  <div class="template-container">
    <h2 @blur="updateTitle" contenteditable="true" ref="titleInput">
      {{ title }}
    </h2>
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
          <!--<PopupList :items="items" />-->
        </div>
      </div>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index" draggable @dragstart="dragStart(index)" @dragover="dragOver" @drop="drop(index)">
          <div class="item-container">
            <button class="remove-button" @click="removeItem(index)">X</button>
            <button class="drag-button" @click="enableDragging(index)">≡</button>
            <span contenteditable="true" @blur="updateItem(index, $event)" class="item-text" spellcheck="false">{{ item }}</span>
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
      itemsArray: [],
      draggedIndex: null,
      draggingEnabledIndex: null
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
    },
    addItemAfter(index) {
      // Insert a new empty item after the specified index
      this.itemsArray.splice(index + 1, 0, '');

      // Update localStorage
      localStorage.setItem('items', JSON.stringify(this.itemsArray));

      // Wait for the DOM to update
      this.$nextTick(() => {
        // Find the newly added span element
        const newItemSpan = this.$el.querySelectorAll('.item-text')[index + 1];
        if (newItemSpan) {
          // Focus on the newly added span element
          newItemSpan.focus();
        }
      });
    },
    dragStart(index) {
      // Store the index of the dragged item
      this.draggedIndex = index;
    },

    enableDragging(index) {
      // Store the index of the item for which dragging is enabled
      this.draggingEnabledIndex = index;
    },

    dragOver(event) {
      event.preventDefault();
    },

    drop(index) {
      // Update the order of items after dropping
      if (this.draggedIndex !== index) {
        const itemToMove = this.itemsArray.splice(this.draggedIndex, 1)[0];
        this.itemsArray.splice(index, 0, itemToMove);
        localStorage.setItem('items', JSON.stringify(this.itemsArray));
      }
    }
  },
  mounted() {
    this.title = localStorage.getItem('title') || 'All tasks';
    this.itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
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
.remove-all-button,
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
