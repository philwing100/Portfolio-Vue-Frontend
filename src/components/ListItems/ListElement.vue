<template>
  <div class="template-container">
    <h2 @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="" spellcheck="false">
      {{ title }}
    </h2>
    <button @click="clearStorage">clearStorage</button>
    <div>
      <div class="input-container">
        <input type="text" v-model="newItem" placeholder="Enter an item" @keyup.enter="addItem" class="input-field"
          spellcheck="false">
        <button @click="addItem" class="add-button">Add Item</button>
      </div>
      <div class="dropdown">
          <button @click="toggleDropdown" class="dropbtn">Dropdown</button>
          <div v-if="isDropdownOpen" class="dropdown-content">
            <a v-for="(option, index) in titlesArray" :key="index" @click="selectOption(option)">{{ option }}</a>
          </div>
        </div>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          @dragover="dragOver" @drop="drop(index)">
          <div class="item-container" @click="focusEditable(index)">
            <button class="remove-button" @click="removeItem(index)">X</button>
            <div class="text-cursor item-text" ref="itemSpan" contenteditable="true"
              @keydown.enter.prevent="handleEnter(index, $event)" @keydown.backspace="handleBackspace(index, $event)"
              @keydown.up="handleArrowUp(index, $event)" @keydown.down="handleArrowDown(index, $event)"
              @blur="updateItem(index, $event)" spellcheck="false">{{ item }}</div>
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
      required: false
    }
  },
  data() {
    return {
      title: this.listName,
      newItem: '',
      itemsArray: [],
      titlesArray: [],
      draggedIndex: null,
      isDropdownOpen: false
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

      const storedItemsArray = localStorage.getItem(this.title);
      if (storedItemsArray) {
        this.itemsArray = JSON.parse(storedItemsArray);
      }

      const storedTitlesArray = localStorage.getItem('titlesArray');
      if(storedTitlesArray){
        this.titlesArray = JSON.parse(storedTitlesArray);
      }
    },
    updateTitle() {
      this.saveList();//Save the current list items to the title before changing the title
      const titleElement = this.$refs.titleInput.innerText;
      this.title = titleElement;
      let flag=true;
    if(this.titlesArray.length !== 0){
      for(let i=0;i<this.titlesArray.length;i++){
      //  console.log(this.titlesArray[i]);
      //  console.log(this.title);
        if(this.titlesArray[i]===this.title){
          flag=false;
        }
      }
    }
      if(flag){
        this.titlesArray.push(this.title);
        this.saveTitlesArray();
      }
      localStorage.setItem('title', this.title);
      let newItems = localStorage.getItem(this.title)
      this.itemsArray=JSON.parse(newItems);
    },
    saveList() {
      localStorage.setItem(this.title, JSON.stringify(this.itemsArray));
    },
    saveTitlesArray(){
      localStorage.setItem('titlesArray', JSON.stringify(this.titlesArray));
    },
    addItem() {
      if (this.newItem.trim() !== '') {
        if (!this.itemsArray) {
          this.itemsArray = []; // Ensure itemsArray is initialized
        }
        console.log(this.title + " " + this.itemsArray + " " + this.titlesArray);
        this.itemsArray.push(this.newItem.trim());
        this.newItem = '';
        this.saveList();
      }
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
      this.saveList();
    },
    focusEditable(index, position = null) {
      this.$nextTick(() => {
        const element = this.$refs.itemSpan[index];
        if (element) {
          element.focus();
          if (position !== null) {
            this.setCaretPosition(element, position);
          }/* else {
            // Ensure the caret is placed at the end if position is not specified
            this.setCaretPosition(element, element.innerText.length);
          }*/
        }
      });
    },
    handleEnter(index, event) {
      const text = event.target.innerText;
      const selection = window.getSelection();
      const caretPosition = selection.anchorOffset;

      const textBeforeCaret = text.substring(0, caretPosition);
      const textAfterCaret = text.substring(caretPosition);

      this.itemsArray.splice(index, 1, textBeforeCaret);
      this.itemsArray.splice(index + 1, 0, textAfterCaret);

      this.$nextTick(() => {
        this.focusEditable(index + 1, 0);
      });

      this.saveList();
    },
    handleBackspace(index, event) {
      if (window.getSelection().anchorOffset === 0 && index > 0) {

        const currentText = event.target.innerText;
        const previousText = this.itemsArray[index - 1];
        const newText = previousText + currentText;

        this.itemsArray.splice(index - 1, 1, newText);
        this.itemsArray.splice(index, 1);

        this.$nextTick(() => {
          const previousElement = this.$refs.itemSpan[index - 1];
          if (previousElement) {
            previousElement.focus();
            this.setCaretPosition(previousElement, previousText.length);
            this.removeItem(index);
          }
          this.saveList();
        });
      }
    },
    handleArrowUp(index, event) {
      if (event.target.innerText.length === 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index - 1, this.itemsArray[index - 1].length);
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elementRect = event.target.getBoundingClientRect();

      // Check if the caret is in the top row
      const isTopRow = rect.top === elementRect.top;

      if (isTopRow && index > 0 || event.target.innerText.length === 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index - 1, this.itemsArray[index - 1].length);
      }
    },
    handleArrowDown(index, event) {
      if (event.target.innerText.length === 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elementRect = event.target.getBoundingClientRect();

      const isBottomRow = Math.abs(rect.bottom - elementRect.bottom) < 1;

      if (isBottomRow && index < this.itemsArray.length || event.target.innerText.length === 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
      }
    },
    updateItem(index, event) {
      this.itemsArray.splice(index, 1, event.target.innerText);
      this.saveList();
    },
    removeItem(index) {
      this.itemsArray.splice(index, 1);
      this.saveList();

      // Check if the array is not empty and the index is valid before focusing
      if (this.itemsArray.length > 0) {
        const newIndex = index === this.itemsArray.length ? index - 1 : index;
        this.$nextTick(() => {
          this.focusEditable(newIndex);
        });
      }
    },
    setCaretPosition(element, position) {
      const range = document.createRange();
      const sel = window.getSelection();
      if (element.firstChild) {
        range.setStart(element.firstChild, position);
      } else {
        // Create a text node if the element is empty
        const textNode = document.createTextNode('');
        element.appendChild(textNode);
        range.setStart(textNode, 0);
      }
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    },
    clearStorage() {
      localStorage.clear();
      this.title = 'Daily List'
      this.itemsArray = this.titlesArray = [];
      this.newItem = '';
      this.loadInitialData();
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      // Do something with the selected option
      console.log('Selected option:', option);
      this.isDropdownOpen = false; // Close the dropdown after selecting an option
    }
  }
}
</script>

<style scoped>
.dropbtn{
  margin-bottom: 10px;
  min-width: 20px;
  max-width:200px;
  width:200px;
} 


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.text-cursor {
  cursor: text;
}

.item-text:focus {
  outline: none;
  /* Remove default outline for focused element */
}

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
  margin-bottom: 0px;
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