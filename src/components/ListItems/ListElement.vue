<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

  <div class="template-container">
    <div v-if="!multiplayer" class="input-grid">
      <div class='title' :contenteditable="parentPage !== 'dashboard'" ref="titleInput" @keydown.enter.prevent=""
        spellcheck="false">
        {{ listName }}
      </div>
      <div>
        <button @click="removeItemByIndex(selectedItemIndex)" class="add-button">Remove Task</button>
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
        <li v-for="(item, index) in incompleteItems" :key="index" draggable="true" @dragstart="dragStart(index)"
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
        <a v-for="(item, index) in completeItems" :key="index" @click="incompleteItem(index)">{{ item.textString
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
import { createList, getList } from '../../api.js';
import './ListElement.css';
import { getTodayDate, normalizeDate } from '../../date.js';
import { mapState } from 'vuex';
import { debounce } from 'lodash';

// Define once, not inline every time!
const debouncedCreateList = debounce((listData) => {
  createList(listData)
    .then((response) => {
      console.log('Created list:', response);
    })
    .catch((error) => {
      console.error('Failed to create list:', error);
    });
}, 750);


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
    },
    multiplayer: {
      type: Boolean,
      required: false
    },
    initialDate: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      //All of these need defaults or some kind of computed properties as defaults maybe
      itemsArray: [], // Initialize from parent data
      selectedItemIndex: 0,
      listType: null,
      listDescription: "",
      parentPage: 'dashboard',
      itemsArray: [],
      completedItemsArray: [],
      recurringTasksArray: [],
      completedItemsCount: 0,
      selectedItemIndex: 0,
      draggedIndex: null,
      isDropdownOpen: false,
      debugMode: false,
      lastCall: 0,

      textString: '',
      scheduledCheckbox: false,
      scheduledDate: "",
      scheduledTime: "",
      timeEstimate: 30,
      recurringTask: false,
      recurringTaskEndDate: null,
      dueDateCheckbox: false,
      dueDate: null,
      debounce: 1000,
      caretPosition: 0
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
    initialDate() {
      if (this.listName != 'Backburner') {
        this.fetchList();
      }
    }
  },
  created() {
    this.itemsArray.push(this.createNewItem(''));
  },
  mounted() {
    this.loadInitialData();
  },
  unmounted() {
    this.emitList();
  },
  components: {
    DateInput,
    BooleanSlider,
    CheckBoxOneWay,
    TimeInput,
    MinuteInput,
  },
  computed: {
    //Need a computed property that eturns the objects which are and arent completed
    completeItems() {
      return this.itemsArray.filter((item) => item.complete);
    },
    incompleteItems() {
      return this.itemsArray.filter((item) => !item.complete);
    }

  },
  methods: {
    saveEditableText(index, event) {
      const el = event.target;
      const newText = el.innerText.trim();

      const current = this.itemsArray[index].textString;
      if (newText !== current) {
        this.itemsArray[index].textString = newText;
        this.saveList();
      }

      // Optionally restore caret after DOM update
      // setTimeout needed to wait until re-render
      const caret = this.getCaretPosition();
      this.$nextTick(() => {
        this.setCaretPosition(el, caret);
      });
    },
    completeItem(index) {
      if (this.incompleteItems[index].textString != null && this.incompleteItems[index].textString != '') {
        this.itemsArray[index].complete = true;
        this.itemsArray.splice(this.itemsArray.length, 0, this.itemsArray[index])
        this.itemsArray.splice(index, 1);
      } else {
        this.removeItemByIndex(index);
      }
      this.saveList();
    },
    getCaretPosition() {
      const selection = window.getSelection();
      return selection && selection.anchorOffset || 0;
    },
    throttle(func, limit) {
      let lastCall = 0; // Stores the timestamp of the last execution

      return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
          lastCall = now;
          func.apply(this, args); // Execute the function
        }
      };
    },
    async saveList() {
      //LATER Need to add some debounce time maybe 750 ms to only call the api once every 3/4s second and not spam the backend.
      let listData = {
        list_title: this.listName + " " + this.initialDate,
        list_description: this.listDescription,
        list_items: JSON.stringify(
          this.itemsArray.length > 0 && (this.itemsArray[0].textString === "" || this.itemsArray[0].textString === null)
            ? this.itemsArray.slice(1) // Remove first element if textString is empty or null
            : this.itemsArray // Otherwise, keep the full array
        )
      };
      console.log(listData.list_items);

      //this.throttle(createList(listData),)
      debouncedCreateList(listData);
      this.emitList()
    },
    emitList() {
      this.$emit("update:modelValue", this.itemsArray);
    },

    async fetchList() {
      await this.$store.dispatch('checkAuth');
      this.itemsArray.length = 1;
      this.selectedItemIndex = 0;
      this.itemsArray.push(this.createNewItem(''));
      this.itemsArray.splice(0, 1);
      getList(this.listName + " " + this.initialDate)
        .then((response) => {
          if (response?.message != "No list items to return") {
            //then load the response into the json data fields
            console.log("FETCH LIST: " + response.data[0]);
            console.dir(response, { depth: null });
            for (const item of response.data[0]) {
              this.loadItemFromGet(item);
            }
          }
        })
        .catch((error) => {
          console.error('Failed to get list:', error);
        });
    },
    loadItemFromGet(item) {
      let newItem = {
        textString: item.textString,
        scheduledCheckbox: item.scheduledCheckbox ? true : false,
        scheduledDate: normalizeDate(item.scheduledDate),
        scheduledTime: item.scheduledTime,
        taskTimeEstimate: item.taskTimeEstimate,
        recurringTask: item.recurringTask,
        recurringTaskEndDate: item.recurringTaskEndDate,
        dueDateCheckbox: item.dueDateCheckbox,
        dueDate: item.dueDate,
        complete: item.complete,
      };
      this.itemsArray.push(newItem);
    },
    loadInitialData() {
      //Ensure there is always at least one empty item.
      if (!this.itemsArray || this.itemsArray.length === 0) {
        this.itemsArray.push(this.createNewItem(''));
      }
      /*this.itemsArray.push(this.createTestItem("Bruh"));
      this.itemsArray.push(this.createTestItem("Bruh1"));
      this.itemsArray.push(this.createTestItem("Bruh2"));*/

      this.fetchList();
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
        scheduledDate: this.initialDate,
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
        scheduledDate: this.initialDate,
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
      this.selectedItemIndex = this.incompleteItems.length <= index ? this.incompleteItems.length - 1 : index;
      console.log('focus');
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
      if (event.target.innerText.length === 0 && index + 1 < this.incompleteItems.length) {
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
    removeItemByIndex(index) {
      // Ensure at least one empty item remains
      if (this.itemsArray.length === 0) {
        console.log('pushing');
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
      console.log(position);
      if (element.firstChild) {
        console.log("firstChild");
        range.setStart(element.firstChild, position);
      } else {
        // Create a text node if the element is empty
        console.log("other case");
        const textNode = document.createTextNode(' ');
        range.setStart(textNode, 1);
        element.appendChild(textNode);
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
    incompleteItem(index) {
      //Needs to be rewritten to put objects back 
      console.log("Index: " + index + " incomplete items:  " + this.incompleteItems.length + " whole index size: " + this.itemsArray.length);
      this.itemsArray.splice(this.incompleteItems.length, 0, this.itemsArray[this.incompleteItems.length + index]);
      this.itemsArray[index + this.incompleteItems.length + 1].complete = false;
      this.itemsArray.splice(this.incompleteItems.length + index - 1, 1);
      this.saveList();
    }
  }
}
</script>