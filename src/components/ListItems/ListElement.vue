<template>
  <!-- Include Font Awesome CDN in your HTML -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="template-container">
    <div class="input-grid">
      <div class='title' @blur="updateTitle" :contenteditable="parentPage !== 'dashboard'" ref="titleInput"
        @keydown.enter.prevent="" spellcheck="false">
        {{ title }}
      </div>

      <div>
        <button @click="removeItem" class="add-button">Remove Task</button>
      </div>

      <i class="fa-solid fa-gear add-button settings" @click="taskListSettingsPopUp"></i>
      <div class="boolean-slider">
        <BooleanSlider v-model="scheduledCheckbox" label="Scheduled Time?" @checkbox-toggled="handlescheduledToggled"
          :value="scheduledCheckbox" />
        <DateInput v-if="scheduledCheckbox" @date-selected="handleDateChange" :initialDate="scheduledDate" />
        <TimeInput v-if="scheduledCheckbox" @time-changed="handleTimeChange" :initialDateTime="scheduledTime" />
        <MinuteInput v-if="scheduledCheckbox" :initialMinutes="taskTimeEstimate" :key="taskTimeEstimate"
          @time-selected="handleUpdateTimeEstimate" />
      </div>
      <BooleanSlider label="Recurring Task" @checkbox-toggled="handleRecurringTask" :value="recurringTask" />
      <div v-if="recurringTask">Recurring task frequency (days of the week popup)</div>
      <div v-if="recurringTask">Recurring task end date</div>
      <!--<div v-if="pageIsNotDashboard">List type display</div>-->
      <BooleanSlider v-model="dueDateCheckbox" label="Due Day?" @checkbox-toggled="handleDueCheckbox"
        :value="dueDateCheckbox" />
      <DateInput v-if="dueDateCheckbox" @date-selected="handleDueDateChange" :initialDate="dueDate" />
      <button v-if="debugMode" @click="clearStorage">clearStorage</button>
    </div>
    <div class="ListContainer">
      <ul class="ListItem">
        <li v-for="(item, index) in itemsArray" :key="index" draggable="true" @dragstart="dragStart(index)"
          :style="index === selectedItemIndex ? 'border: 3px solid blue; border-radius:5px; transition: border-color 0.1s ease;' : 'border: 3px solid transparent;'"
          @dragover="dragOver" @drop="drop(index)">
          <div class="item-container" @click="focusEditable(index);">
            <CheckBoxOneWay label="" @click.stop @checkbox-toggled="completeItem(index)" />
            <div class="text-cursor item-text" ref="itemSpan" contenteditable="true"
              @keydown.enter.prevent="handleEnter(index, $event)" @keydown.backspace="handleBackspace(index, $event)"
              @keydown.up="handleArrowUp(index, $event)" @keydown.down="handleArrowDown(index, $event)"
              @input="saveEditableText(index, $event)" spellcheck="false">
              {{ item.textString }}
            </div>
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
import BooleanSlider from './BooleanSlider.vue';
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
      listType: null,
      parentPage: 'dashboard',
      itemsArray: [],
      titlesArray: [],
      completedItemsArray: [],
      recurringTasksArray: [],
      selectedItemIndex: 0,
      draggedIndex: null,
      isDropdownOpen: false,
      debugMode: false,

      textString: '',
      listOrigin: '',
      scheduledCheckbox: false,
      scheduledDate: null,
      scheduledTime: null,
      timeEstimate: 30,
      recurringTask: false,
      recurringTaskEndDate: null,
      dueDateCheckbox: false,
      dueDate: null,

      defaultscheduledCheckbox: false,
      defaultscheduledDate: null,
      defaultscheduledTime: null,
      defaultTaskTimeEstimate: 30,
      defaultRecurringTask: false,
      defaultRecurringTaskEndDate: null,
      defaultDueDateCheckbox: false,
      defaultDueDate: null
    };
  },
  created() {
    // Call a method to load initial data
    //this.clearStorage();
    this.loadInitialData();
  },
  components: {
    DateInput,
    BooleanSlider,
    CheckBoxOneWay,
    TimeInput,
    MinuteInput,
  },
  computed: {

  },
  watch: {
    initialMinutes(newValue) {
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
    scheduledToggled(scheduledCheckbox) {
      handlescheduledToggled();
    },
    dueDateCheckToggled() {
      handleDueCheckbox();
    },
    dueDateChange(dueDate) {
      handleDueDateChange(dueDate);
    }

  },
  methods: {
    loadInitialData() {
      const storedTitle = localStorage.getItem('title');
      if (storedTitle) {
        console.log(title);
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
      this.scheduledDate = date; // Update the parent component's selectedDate
      this.itemsArray[this.selectedItemIndex].scheduledDate = date;
    },
    handlescheduledToggled() {
      this.scheduledCheckbox = !this.scheduledCheckbox;
      this.itemsArray[this.selectedItemIndex].scheduledCheckbox = this.scheduledCheckbox; // Update the checkbox state in the items array
    },
    handleRecurringTask() {
      this.recurringTask = !this.recurringTask;
      this.itemsArray[this.selectedItemIndex].recurringTask = this.recurringTask; // Update the recurring task state in the items array
    },

    handleTimeChange(time) {
      this.scheduledTime = time;
      this.itemsArray[this.selectedItemIndex].scheduledTime = time; // Update the time in the items array
    },

    handleUpdateTimeEstimate(newMinutes) {
      this.taskTimeEstimate = newMinutes;
      this.itemsArray[this.selectedItemIndex].taskTimeEstimate = newMinutes;
    },
    handleDueCheckbox() {
      this.dueDateCheckbox = !this.dueDateCheckbox;
      console.log(this.dueDateCheckbox);
      this.itemsArray[this.selectedItemIndex].dueDateCheckbox = this.dueDateCheckbox;
    },
    saveEditableText(index, event) {
      this.itemsArray[index].textString = event.target.innerText;
      this.saveList(); // Persist changes immediately
    },
    handleDueDateChange(dueDate) {
      this.dueDate = dueDate;
      this.itemsArray[this.selectedItemIndex].dueDate = dueDate; // Update the time in the items array
    },
    swapItemValues(index) {
      const item = this.itemsArray[index];

      // Ensure all the required fields are swapped properly
      this.scheduledDate = item.scheduledDate ?? this.defaultscheduledDate;
      this.scheduledTime = item.scheduledTime ?? this.defaultscheduledTime;
      this.scheduledCheckbox = item.scheduledCheckbox ?? this.defaultscheduledCheckbox;
      //console.log(this.scheduledCheckbox);
      this.recurringTask = item.recurringTask ?? this.defaultRecurringTask;
      this.taskTimeEstimate = item.taskTimeEstimate ?? this.defaultTaskTimeEstimate;
      this.dueDateCheckbox = item.dueDateCheckbox ?? this.defaultDueDateCheckbox;
      this.dueDate = item.dueDate ?? this.defaultDueDate;
      this.saveList();
    },
    completeItem(index) {
      if (this.itemsArray[index].textString != '') {
        this.completedItemsArray.push(this.itemsArray[index]);
      }
      this.removeItemByIndex(index);
    },
    updateTitle() {
      //Deprecated method.

      this.saveList();//Save the current list items to the title before changing the title
      const titleElement = this.$refs.titleInput.innerText;
      this.title = titleElement;
      let flag = true;
      this.createNewItem();
      if (this.titlesArray.length !== 0) {
        for (let i = 0; i < this.titlesArray.length; i++) {
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
      //localStorage.setItem(this.title, JSON.stringify(this.itemsArray));
      //localStorage.setItem(this.title) needs to retrieve previous items
      this.emitTaskUpdates();
    },
    emitTaskUpdates() {
      this.$emit('update-tasks', {
        currentTasks: this.itemsArray,
        completedTasks: this.completedItemsArray,
      });
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
        scheduledCheckbox: false,
        scheduledDate: null,
        scheduledTime: null,
        taskTimeEstimate: 0,
        recurringTask: false,
        recurringTaskEndDate: null,
        addToCalendarCheckbox: false,
        dueDateCheckbox: false,
        dueDate: null,
      };
    },
    createItemWithExistingValues(text) {
      return {

        //These could all instead be replaced with 
        textString: text,
        scheduledCheckbox: this.scheduledCheckbox,
        scheduledDate: this.scheduledDate,
        scheduledTime: this.scheduledTime,
        taskTimeEstimate: this.taskTimeEstimate,
        recurringTask: this.recurringTask,
        recurringTaskEndDate: this.recurringTaskEndDate,
        addToCalendarCheckbox: this.addToCalendarCheckbox,
        dueDateCheckbox: this.dueDateCheckbox,
        dueDate: this.dueDate,
      }
    },
    dragStart(index) {
      const element = this.$refs.itemSpan[index];
      if (element) {
        this.itemsArray[index].textString = element.innerText; // Capture the current text
        this.saveList(); // Save the latest changes before drag starts
      }
      this.draggedIndex = index;
    },
    dragOver(event) {
      event.preventDefault();
    },
    drop(index) {
      const draggedItem = this.itemsArray[this.draggedIndex];
      this.swapItemValues(index);
      this.itemsArray.splice(this.draggedIndex, 1);
      this.itemsArray.splice(index, 0, draggedItem);
      this.draggedIndex = null;
      this.saveList();
    },
    /*
    populateCurrentValues(index) {
      this.textString = this.itemsArray.textString[index];
      this.scheduledCheckbox = this.itemsArray.textString[index];
      this.scheduledDate = this.itemsArray[index];
      this.scheduledTime = this.itemsArray[index];
      this.taskTimeEstimate = this.itemsArray[index];
      this.recurringTask = this.itemsArray[index];
      this.recurringTaskEndDate = this.itemsArray[index];
      this.addToCalendarCheckbox = this.itemsArray[index];
    },*/
    focusEditable(index, position = null) {
      this.swapItemValues(index); // Now swap the new values
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
    removeItem() {
      this.itemsArray.splice(this.selectedItemIndex, 1);

      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem('')); // Add an empty item as a base case
      }

      // Check if the array is not empty and the index is valid before focusing
      if (this.itemsArray.length > 0) {
        const newIndex = this.selectedItemIndex === this.itemsArray.length ? this.selectedItemIndex - 1 : this.selectedItemIndex;
        this.$nextTick(() => {
          this.focusEditable(newIndex);
        });
      }
      this.saveList();
    },
    removeItemByIndex(index) {
      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem(''));
      }

      if (this.itemsArray.length > 0) {
        let newIndex = index - 1;

        if (newIndex < 0) newIndex = 0;

        this.$nextTick(() => {
          this.focusEditable(newIndex);
        });
        this.itemsArray.splice(index, 1);
        if (this.itemsArray.length === 0) {
          this.itemsArray.push(this.createNewItem('')); // Add an empty item as a base case
        }
        this.saveList();
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