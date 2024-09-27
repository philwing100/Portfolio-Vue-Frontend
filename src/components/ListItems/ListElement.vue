<template>
  <!-- Include Font Awesome CDN in your HTML -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="template-container">
    <div class="input-grid">
      <div class='title' @blur="updateTitle" contenteditable="true" ref="titleInput" @keydown.enter.prevent=""
        spellcheck="false">
        {{ title }}
      </div>
      <i class="fa-solid fa-gear add-button settings" @click="taskListSettingsPopUp"></i>
      <CheckedBox label="Due Date?" @checkbox-toggled="handleCheckboxToggled" />
      <DateInput v-if="dueDateCheckbox" @date-selected="handleDateChange" :initialDate="dueDateDate" />
      <TimeInput v-if="dueDateCheckbox" @time-changed="handleTimeChange" :initialDateTime="dueDateTime" />
      <CheckedBox label="Recurring task?" @checkbox-toggled="handleRecurringTask" />
      <MinuteInput :initialMinutes="taskTimeEstimate" :key="taskTimeEstimate"
        @time-selected="handleUpdateTimeEstimate" />
      <div v-if="recurringTask">Recurring task frequency (days of the week popup)</div>
      <div v-if="recurringTask">Recurring task end date</div>
      <!--<div v-if="pageIsNotDashboard">List type display</div>-->
      <CheckedBox label="Visible on Calendar?" @calendar-checkbox-toggled="handleCalendarVisible" />
      <button v-if="debugMode" @click="clearStorage">clearStorage</button>
    </div>
    <div>
      <button @click="removeItem" class="add-button">Remove Task</button>
    </div>

    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          :style="index === selectedItemIndex ? 'border: 3px solid blue; border-radius:5px; transition: border-color 0.1s ease;' : 'border: 3px solid transparent;'"
          @dragover="dragOver" @drop="drop(index)">
          <div class="item-container" @click="focusEditable(index)">
            <CheckBoxOneWay label="" @checkbox-toggled="completeItem(index)" />
            <div class="text-cursor item-text" ref="itemSpan" contenteditable="true"
              @keydown.enter.prevent="handleEnter(index, $event)" @keydown.backspace="handleBackspace(index, $event)"
              @keydown.up="handleArrowUp(index, $event)" @keydown.down="handleArrowDown(index, $event)"
              spellcheck="false">{{ item.textString }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="dropdown">
      <button @click="toggleDropdown" @keydown.enter.prevent="toggleDropdown" class="dropbtn">Completed Tasks</button>
      <div v-if="isDropdownOpen" class="dropdown-content">
        <a v-for="(item, index) in completedItemsArray" :key="index" @click="selectOption(index)">{{ item.textString
          }}</a>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable*/

import DateInput from './DateInput.vue';
import CheckedBox from './CheckBox.vue';
import CheckBoxOneWay from './CheckboxOneWay.vue';
import TimeInput from './TimeInput.vue';
import MinuteInput from './MinuteInput.vue';
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
      recurringTasksArray: [],
      selectedItemIndex: 0,
      draggedIndex: null,
      isDropdownOpen: false,
      debugMode: false,

      textString: '',
      dueDateCheckbox: false,
      dueDateDate: null,
      dueDateTime: null,
      timeEstimate: null,
      recurringTask: false,
      recurringTaskEndDate: null,
      addToCalendarCheckbox: false,
      completedDateTime: null,
      timeUntilComplete: null,


      defaultDueDateCheckbox: false,
      defaultDueDateDate: null,
      defaultDueDateTime: null,
      defaultTaskTimeEstimate: 0,
      defaultRecurringTask: false,
      defaultRecurringTaskEndDate: null,
      defaultAddToCalendarCheckbox: false,
      defaultCompletedDateTime: null,
    };
  },
  created() {
    // Call a method to load initial data
    this.clearStorage();
    this.loadInitialData();
  },
  components: {
    DateInput,
    CheckedBox,
    CheckBoxOneWay,
    TimeInput,
    MinuteInput,
  },
  computed: {

  },
  watch: {
    initialMinutes(newValue) {
      console.log("initialMinutes changed to: ", newValue); // Check if this is called
      if (newValue > 0) {
        handleUpdateTimeEstimate(newValue);
      }
    },
    initialDate(newDate) {
      handleDateChange(newDate); // Update the selected date when prop changes
    },
    initialDateTime(newDateTime) {
      handleTimeChange(newDateTime); // Update the selected date when prop changes
    },
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

      // Ensure itemsArray has at least one valid item
      if (!this.itemsArray || this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem('')); // Initialize with an empty item
      }
    },
    handleDateChange(date) {
      this.dueDateDate = date; // Update the parent component's selectedDate
      this.itemsArray[this.selectedItemIndex].dueDateDate = date;
    },
    handleCheckboxToggled() {
      this.dueDateCheckbox = !this.dueDateCheckbox;
      this.itemsArray[this.selectedItemIndex].dueDateCheckbox = this.dueDateCheckbox; // Update the checkbox state in the items array
    },
    handleRecurringTask() {
      this.recurringTask = !this.recurringTask;
      this.itemsArray[this.selectedItemIndex].recurringTask = this.recurringTask; // Update the recurring task state in the items array
    },

    handleTimeChange(time) {
      this.dueDateTime = time;
      this.itemsArray[this.selectedItemIndex].dueDateTime = time; // Update the time in the items array
    },

    handleUpdateTimeEstimate(newMinutes) {
      this.taskTimeEstimate = newMinutes;
      this.itemsArray[this.selectedItemIndex].taskTimeEstimate = newMinutes;
      console.log('time updated: ' + this.taskTimeEstimate + " for index " + this.selectedItemIndex);
    },
    handleCalendarVisible() {
      //needs implementation
    },
    swapItemValues(index) {
      const item = this.itemsArray[index];
      this.dueDateDate = item.dueDateDate;
      this.dueDateTime = item.dueDateTime;
      this.dueDateCheckbox = item.dueDateCheckbox;
      this.recurringTask = item.recurringTask;
      this.taskTimeEstimate = item.taskTimeEstimate;
    },
    completeItem(index) {
      if (this.itemsArray[index].textString != '') {
        this.completedItemsArray.push(this.itemsArray[index]);
      }
      this.removeItemByIndex(index);
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
      //localStorage.setItem(this.title) needs to retrieve previous items
    },
    saveTitlesArray() {
      localStorage.setItem('titlesArray', JSON.stringify(this.titlesArray));
    },
    loadDefaultItemValues() {
      //future makes api call to get this user's default values
    },
    createNewItem(text) {
      console.log('newitem created');
      return {
        textString: text,
        dueDateCheckbox: false,
        dueDateDate: null,
        dueDateTime: null,
        taskTimeEstimate: 0, 
        recurringTask: false,
        recurringTaskEndDate: null,
        addToCalendarCheckbox: false,
      };
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
     // if (this.selectedItemIndex != index) {
     console.log('focusing on index:' + index);
        this.swapItemValues(index);
   //   }
      this.selectedItemIndex = index;
      this.$nextTick(() => {
        const element = this.$refs.itemSpan[index];
        if (element) {
          element.focus();
          if (position !== null) {
            this.setCaretPosition(element, position);
          }
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
        console.log('focusing from enter');
      });
      this.saveList();
    },
    handleBackspace(index, event) {
      if (window.getSelection().anchorOffset === 0 && index > 0) {

        const currentText = event.target.innerText;
        const previousText = this.itemsArray[index - 1].textString;
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
        console.log('focusing on arrow up and length = 0');
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
        console.log('focusing on arrow up and length = 0 + its top row');
      }
    },
    handleArrowDown(index, event) {
      if (event.target.innerText.length === 0 && index + 1 < this.itemsArray.length) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
        console.log('focusing on arrow down and length = 0');
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elementRect = event.target.getBoundingClientRect();

      const isBottomRow = Math.abs(rect.bottom - elementRect.bottom) < 1;

      if ((isBottomRow || event.target.innerText.length === 0) && index + 1 < this.itemsArray.length) {
        event.preventDefault(); // Prevent default arrow key behavior
        this.focusEditable(index + 1, 0);
        console.log('focusing on arrow down and length = 0 and is bottom row');
      }
    },
    removeItem() {
      this.itemsArray.splice(this.selectedItemIndex, 1);
      this.saveList();

      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem('')); // Add an empty item as a base case
      }

      // Check if the array is not empty and the index is valid before focusing
      if (this.itemsArray.length > 0) {
        const newIndex = this.selectedItemIndex === this.itemsArray.length ? this.selectedItemIndex - 1 : this.selectedItemIndex;
        this.$nextTick(() => {
          this.focusEditable(newIndex);
          console.log('focusing on remove normal');
        });
      }
    },
    removeItemByIndex(index) {
      this.saveList();

      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem(''));
      }

      if (this.itemsArray.length > 0) {
        let newIndex = index >= this.itemsArray.length ? this.itemsArray.length - 1 : index;
        if (newIndex < 0) newIndex = 0;

        this.$nextTick(() => {
          this.focusEditable(newIndex);
          console.log('focusing on remove by index');
        });
        this.itemsArray.splice(index, 1);
        if (this.itemsArray.length === 0) {
          this.itemsArray.push(this.createNewItem('')); // Add an empty item as a base case
        }
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
    selectOption(index) {
      this.itemsArray.push(this.completedItemsArray[index]);
      this.completedItemsArray.splice(index, 1);
      this.saveList();
    }
  }
}
</script>