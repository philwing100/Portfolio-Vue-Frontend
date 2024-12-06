<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="template-container">
    <div class="input-grid">
      <div class='title' :contenteditable="parentPage !== 'dashboard'" ref="titleInput" @keydown.enter.prevent=""
        spellcheck="false">
        {{ listName }}
      </div>

      <div>
        <button @click="removeItem" class="add-button">Remove Task</button>
      </div>

      <i class="fa-solid fa-gear add-button settings" @click="taskListSettingsPopUp"></i>
      <div class="boolean-slider">
        <BooleanSlider v-model="itemsArray[selectedItemIndex].scheduledCheckbox" label="Scheduled Time?" />
        <DateInput v-if="itemsArray[selectedItemIndex].scheduledCheckbox"
          v-model="itemsArray[selectedItemIndex].scheduledDate" />
        <TimeInput v-if="itemsArray[selectedItemIndex].scheduledCheckbox"
          v-model="itemsArray[selectedItemIndex].scheduledTime" />
        <MinuteInput v-if="itemsArray[selectedItemIndex].scheduledCheckbox"
          v-model="itemsArray[selectedItemIndex].taskTimeEstimate" />
      </div>
      <!--<BooleanSlider v-model="itemsArray[selectedItemIndex].recurringTask" label="Recurring Task" />-->
      <div v-if="itemsArray[selectedItemIndex].recurringTask">Recurring task frequency (days of the week popup)</div>
      <div v-if="itemsArray[selectedItemIndex].recurringTask">Recurring task end date</div>
      <!--<div v-if="pageIsNotDashboard">List type display</div>-->
      <BooleanSlider v-model="itemsArray[selectedItemIndex].dueDateCheckbox" label="Due Day?" />
      <DateInput v-if="itemsArray[selectedItemIndex].dueDateCheckbox" v-model="itemsArray[selectedItemIndex].dueDate" />
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
        <a v-for="(item, index) in itemsArray" :key="index" @click="selectOption(index)">{{ item.textString
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
import { createList } from '../../api.js';
import './ListElement.css';


export default {
  name: 'ListElement',
  props: {
    modelValue: {
      type: Array,
      required: true,
      default: () => [],
    },
    listName: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      //All of these need defaults or some kind of computed properties as defaults maybe
      title: "Title", //this.listName,
      itemsArray: [], // Initialize from parent data
      selectedItemIndex: 0,
      listType: null,
      listDescription: "",
      parentPage: 'dashboard',
      itemsArray: [],
      completedItemsArray: [],
      recurringTasksArray: [],
      selectedItemIndex: 0,
      draggedIndex: null,
      isDropdownOpen: false,
      debugMode: false,

      textString: '',
      scheduledCheckbox: false,
      scheduledDate: "",
      scheduledTime: "",
      timeEstimate: 30,
      recurringTask: false,
      recurringTaskEndDate: 0,
      dueDateCheckbox: false,
      dueDate: 0,
    };
  },
  watch: {
    modelValue(newValue) {
      this.itemsArray = [...newValue];
    },
    // Emit changes to itemsArray back to the parent
    /*  itemsArray: {
        handler(newItems) {
          this.$emit('update:modelValue', newItems);
        },
        immediate: true,
        deep: true, // Watch deeply for changes in array content
      },*/
  },
  created() {
    this.loadInitialData();

  },
  mounted() {

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
  methods: {
    saveEditableText(index, event) {
      // Get the text content from the contenteditable element
      let newText = event.target.innerText.trim();

      // Optional: Limit the text length to 500 characters
      if (newText.length > 500) {
        newText = newText.substring(0, 500);
      }

      // Update the text in the itemsArray
      this.itemsArray[index].textString = newText;

      // Call saveList to emit the updated itemsArray
      this.saveList();
    },
    completeItem(index) {
      if (this.itemsArray[index].textString != null && this.itemsArray[index].textString != '') {
        this.completedItemsArray.push(this.itemsArray[index]);
      }
      this.removeItemByIndex(index);
    },
    saveList() {
      //LATER Need to add some debounce time maybe 750 ms to only call the api once every 3/4s second and not spam the backend.
      //LATER Should also do the async call to save to the backend
      this.$emit("update:modelValue", this.itemsArray);
    },
    newList() {
      const listData = {
        list_title: this.title,
        list_description: this.listDescription,
        list_items: JSON.stringify([
          {
            item_description: "Example item",
            item_duration: 30,
            recurring_item: false,
          },
        ]),
      }; // Close listData object

      createList(listData)
        .then((response) => {
          console.log('Created list:', response);
        })
        .catch((error) => {
          console.error('Failed to create list:', error);
        });
    },
    deleteList() {

    },
    loadInitialData() {
      //Ensure there is always at least one empty item.
      if (!this.itemsArray || this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem(''));
      }
      this.itemsArray.push(this.createTestItem("Bruh"));
      this.itemsArray.push(this.createTestItem("Bruh1"));
      this.itemsArray.push(this.createTestItem("Bruh2"));

      this.saveList();
      //this.newList();
      //Call api get and load initial list

    },
    loadDefaultItemValues() {
      //future makes api call to get this user's default values 

    },
    createTestItem(text) {
      return {
        textString: text || '',
        scheduledCheckbox: true,
        scheduledDate: '2024-12-06',
        scheduledTime: "9:00 PM",
        taskTimeEstimate: "30",
        recurringTask: false,
        recurringTaskEndDate: null,
        dueDateCheckbox: false,
        dueDate: null,
        complete: false,
      };
    },
    createNewItem(text) {
      return {
        textString: text || '',
        scheduledCheckbox: false,
        scheduledDate: null,
        scheduledTime: null,
        taskTimeEstimate: 0,
        recurringTask: false,
        recurringTaskEndDate: null,
        dueDateCheckbox: false,
        dueDate: null,
        complete: false,
      };
    },
    createItemWithExistingValues(text) {
      return {
        //Will be replaced eventually
        textString: text,
        scheduledCheckbox: this.scheduledCheckbox,
        scheduledDate: this.scheduledDate,
        scheduledTime: this.scheduledTime,
        taskTimeEstimate: this.taskTimeEstimate,
        recurringTask: false,
        recurringTaskEndDate: this.recurringTaskEndDate,
        addToCalendarCheckbox: this.addToCalendarCheckbox,
        dueDateCheckbox: this.dueDateCheckbox,
        dueDate: this.dueDate,
        complete: false,
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
      const focusedItem = this.itemsArray[index];
      this.saveList();
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
        event.preventDefault();

        const currentText = event.target.innerText;
        const previousText = this.itemsArray[index - 1].textString;
        const combinedText = previousText + currentText;

        // Update the previous item with the combined text
        this.itemsArray.splice(index - 1, 1, this.createItemWithExistingValues(combinedText));

        // Remove the current item from itemsArray
        this.itemsArray.splice(index, 1);

        // Update selectedItemIndex to focus on the previous item
        this.selectedItemIndex = index - 1;

        this.$nextTick(() => {
          // Set focus to the previous item and place the caret at the end of the combined text
          const previousElement = this.$refs.itemSpan[this.selectedItemIndex];
          if (previousElement) {
            this.focusEditable(this.selectedItemIndex, previousText.length);
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
          this.itemsArray.splice(index, 1);
          if (this.itemsArray.length === 0) {
            this.itemsArray.push(this.createNewItem('')); // Add an empty item as a base case
            this.saveList();
          }
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
      this.itemsArray = [];
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