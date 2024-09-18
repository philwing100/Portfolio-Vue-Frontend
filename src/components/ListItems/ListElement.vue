<template>
  <div class="template-container">
    <div :style="{ display: 'inline-block', flexDirection: 'row' }">
      <h2 @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent="" spellcheck="false">
        {{ title }}
      </h2>
      <CheckedBox label="Due Date?" @checkbox-toggled="handleCheckboxToggled" />
      <DateInput v-if="dueDateCheckbox" @date-selected="handleDateChange" />

      <CheckedBox label="Recurring task?" @checkbox-toggled="handleRecurringTask" />
      <!--Later: Recurring task checked = make ui and functions appear for making the list appear every day-->

      <button v-if="debugMode" @click="clearStorage">clearStorage</button>
    </div>
    <div>
      <div class="input-container">
        <button @click="removeItem" class="add-button">Remove</button>
      </div>
      <div>
      </div>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          @dragover="dragOver" @drop="drop(index)">
          <div class="item-container" @click="focusEditable(index)">
            <span v-if="index === selectedItemIndex">✔️</span>
            <CheckedBox label="" @checkbox-toggled="completeItem(index)" />
            <div class="text-cursor item-text" ref="itemSpan" contenteditable="true"
              @keydown.enter.prevent="handleEnter(index, $event)" @keydown.backspace="handleBackspace(index, $event)"
              @keydown.up="handleArrowUp(index, $event)" @keydown.down="handleArrowDown(index, $event)"
              @blur="updateItem(index, $event)" spellcheck="false">{{ item.textString }}</div>
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
      itemsArray: [],
      titlesArray: [],
      completedItemsArray: [],
      selectedItemIndex: 0,
      draggedIndex: null,
      isDropdownOpen: false,
      debugMode: true,

      textString: '',
      dueDateCheckbox: false,
      dueDateDate: null,
      dueDateTime: null,
      taskTimeEstimate: null,
      recurringTask: false,
      recurringTaskEndDate: null,
      addToCalendarCheckbox: false,

      defaultDueDateCheckbox: false,
      defaultDueDateDate: null,
      defaultDueDateTime: null,
      defaultTaskTimeEstimate: null,
      defaultRecurringTask: false,
      defaultRecurringTaskEndDate: null,
      defaultAddToCalendarCheckbox: false
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
  computed: {

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
      this.dueDateCheckbox = !this.dueDateCheckbox;
    },
    handleRecurringTask() {
      this.recurringTask = !this.recurringTask;
    },
    completeItem(index) {
      //Adds item to the dropdownlist
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
      let textStrings = localStorage.getItem(this.title)
      this.itemsArray = JSON.parse(textStrings);
    },
    saveList() {
      localStorage.setItem(this.title, JSON.stringify(this.itemsArray));
    },
    saveTitlesArray() {
      localStorage.setItem('titlesArray', JSON.stringify(this.titlesArray));
    },
    loadDefaultItemValues() {
      //future makes api call to get this user's default values
    },
    createNewItem(text) {
      return {
        textString: text,
        dueDateCheckbox: false,
        dueDateDate: null,
        dueDateTime: null,
        taskTimeEstimate: null,
        recurringTask: false,
        recurringTaskEndDate: null,
        addToCalendarCheckbox: false,
      }
    },
    createItemWithExistingValues(text) {
      return {

        //These could all instead be replaced with 
        textString: text,
        dueDateCheckbox: this.dueDateCheckbox,
        dueDateDate: this.dueDateDate,
        dueDateTime: this.dueDateTime,
        taskTimeEstimate: this.taskTimeEstimate,
        recurringTask: this.recurringTask,
        recurringTaskEndDate: this.recurringTaskEndDate,
        addToCalendarCheckbox: this.addToCalendarCheckbox,
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
    selectCurrentIndex(index) {
      this.selectedItemIndex = index;
    },/*
    populateCurrentValues(index) {
      this.textString = this.itemsArray.textString[index];
      this.dueDateCheckbox = this.itemsArray.textString[index];
      this.dueDateDate = this.itemsArray[index];
      this.dueDateTime = this.itemsArray[index];
      this.taskTimeEstimate = this.itemsArray[index];
      this.recurringTask = this.itemsArray[index];
      this.recurringTaskEndDate = this.itemsArray[index];
      this.addToCalendarCheckbox = this.itemsArray[index];
    },*/
    focusEditable(index, position = null) {
      this.selectedItemIndex = index;
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

      this.itemsArray.splice(index, 1, this.createItemWithExistingValues(textBeforeCaret));
      this.itemsArray.splice(index + 1, 0, this.createItemWithExistingValues(textAfterCaret));

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

        this.itemsArray.splice(index - 1, 1, this.createItemWithExistingValues(newText));
        this.itemsArray.splice(index, 1);

        this.$nextTick(() => {
          const previousElement = this.$refs.itemSpan[index - 1];
          if (previousElement) {
            previousElement.focus();
            this.setCaretPosition(previousElement, previousText.length);
            this.removeItem();
          }
          this.saveList();
        });
      }
    },
    handleArrowUp(index, event) {
      if (event.target.innerText.length === 0 && index - 1 >= 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index - 1, this.itemsArray[index - 1].length);
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elementRect = event.target.getBoundingClientRect();

      // Check if the caret is in the top row
      const isTopRow = rect.top === elementRect.top;

      if ((isTopRow || event.target.innerText.length === 0) && index - 1 >= 0) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index - 1, this.itemsArray[index - 1].length);
      }
    },
    handleArrowDown(index, event) {
      if (event.target.innerText.length === 0 && index + 1 < this.itemsArray.length) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elementRect = event.target.getBoundingClientRect();

      const isBottomRow = Math.abs(rect.bottom - elementRect.bottom) < 1;

      if ((isBottomRow || event.target.innerText.length === 0) && index + 1 < this.itemsArray.length) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
      }
    },
    updateItem(index, event) {
      this.itemsArray.splice(index, 1, this.createNewItem(event.target.innerText));
      this.saveList();
    },
    removeItem() {
      this.itemsArray.splice(this.selectedItemIndex, 1);
      this.saveList();

      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(''); // Add an empty item as a base case
      }

      // Check if the array is not empty and the index is valid before focusing
      if (this.itemsArray.length > 0) {
        const newIndex = this.selectedItemIndex === this.itemsArray.length ? this.selectedItemIndex - 1 : this.selectedItemIndex;
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
      this.textString = '';
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