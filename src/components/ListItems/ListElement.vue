<template>
  <!-- ListElement.vue -->
  <div>
    <button @click="togglePopup">Toggle Popup</button>
    <div class="popup-overlay" v-if="showPopup">
      <div class="popup">
        <span class="close" @click="closePopup">X</span>
        <div class="popup-content">
          <!--<PopupList :items="items" />-->
        </div>
      </div>
    </div>
    <button @click="setList">Execute</button>
    <div class="ListContainer">
      <ul class="ListItem">
      </ul>
    </div>
  </div>
</template>

<script>
//import PopupList from './PopupList.vue';

const testArray = ["Obamna", 52]
localStorage.setItem('user', JSON.stringify(testArray));

export default {
  name: 'ListElement',
  components: {
    //PopupList
  },
  data() {
    return {
    };
  },
  methods: {
    setList() {
      const li = document.createElement('li')
      li.textContent = localStorage.getItem('user');
      const ul = document.querySelector('ul');
      ul.appendChild(li);
    }
  }
}
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
  background-color: blue;
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
  background-color: green;
}
</style>
