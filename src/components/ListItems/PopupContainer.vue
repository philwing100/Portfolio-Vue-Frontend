<template>
  <div>
    <button @click="showListPage">Open List</button>
    <div v-if="showList">
      <list />
    </div>
    <div v-if="showPopup">
      <div class="popup-overlay">
        <div class="popup">
          <span class="close" @click="closePopup">X</span>
          <input type="text" v-model="newItem" placeholder="Enter new item">
          <button @click="addNewItem">Add</button>
          <ListBruh />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ListBruh from './List.vue';

export default {
  name: 'PopupContainer',
  components: {
    ListBruh
  },
  data() {
    return {
      newItem: '',
      showList: false,
      showPopup: false
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.newItem = '';
    },
    addNewItem() {
      if (this.newItem.trim() !== '') {
        this.$emit('add', this.newItem.trim());
        this.newItem = '';
        this.closePopup();
      }
    },
    showListPage() {
      this.showList = true;
    }
  }
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}

.popup-content {
  /* Add additional styles for popup content */
}

</style>
