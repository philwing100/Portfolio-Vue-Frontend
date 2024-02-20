<template>
    <div class="popup-overlay">
      <div class="popup">
        <span class="close" @click="$emit('close')">X</span>
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'PopupContainer',
    setup() {

      return {
      };
    },

    }
</script>

<style>
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