<template>
  <div class="template-container">
    <div :style="{ display: 'inline-block', flexDirection: 'row' }">
      <h2 @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="" spellcheck="false">
        {{ title }}
      </h2>
      <CheckedBox label="Due Date?" @checkbox-toggled="handleCheckboxToggled"/>
          <DateInput  v-if="dueDate" @date-selected="handleDateChange" />

          <CheckedBox label="Recurring task?" @checkbox-toggled="handleRecurringTask"/>
          <!--Later: Recurring task checked = make ui and functions appear for making the list appear every day-->

      <button v-if="debugMode" @click="clearStorage">clearStorage</button>
    </div>
    <div>
      <div class="input-container">
        <button @click="addItem" class="add-button">Remove</button>
      </div>
      <div>
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
    <div class="dropdown">
      <button @click="toggleDropdown" class="dropbtn">Dropdown</button>
      <div v-if="isDropdownOpen" class="dropdown-content">
        <a v-for="(option, index) in titlesArray" :key="index" @click="selectOption(option)">{{ option }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from './DateInput.vue';
import CheckedBox from './CheckBox.vue';
import './ListElement.css'; 
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
      isDropdownOpen: false,
      selectedMode: 'Mode 1', 
      debugMode: false,
      dueDate: false,
      recurringTask: true
    };
  },
  created() {
    // Call a method to load initial data
    this.loadInitialData();
  },
  components: {
    DateInput,
    CheckedBox
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
      if (storedTitlesArray) {
        this.titlesArray = JSON.parse(storedTitlesArray);
      }

      // Ensure there's at least one empty item in the array
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(''); // Base case
      }
    },
    handleDateChange(date) {
      this.selectedDate = date; // Update the parent component's selectedDate
    },
    handleCheckboxToggled() {
      this.dueDate= !this.dueDate;
    },
    handleRecurringTask(){
      this.recurringTask =!this.recurringTask;
    },
    updateTitle() {
      this.saveList();//Save the current list items to the title before changing the title
      const titleElement = this.$refs.titleInput.innerText;
      this.title = titleElement;
      let flag = true;
      if (this.titlesArray.length !== 0) {
        for (let i = 0; i < this.titlesArray.length; i++) {
          //  console.log(this.titlesArray[i]);
          //  console.log(this.title);
          if (this.titlesArray[i] === this.title) {
            flag = false;
          }
        }
      }
      if (flag) {
        this.titlesArray.push(this.title);
        this.saveTitlesArray();
      }
      localStorage.setItem('title', this.title);
      let newItems = localStorage.getItem(this.title)
      this.itemsArray = JSON.parse(newItems);
    },
    saveList() {
      localStorage.setItem(this.title, JSON.stringify(this.itemsArray));
    },
    saveTitlesArray() {
      localStorage.setItem('titlesArray', JSON.stringify(this.titlesArray));
    },
    addItem() {
      if (this.newItem.trim() !== '') {
        if (!this.itemsArray) {
          this.itemsArray = [];
        }
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

      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(''); // Add an empty item as a base case
      }

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