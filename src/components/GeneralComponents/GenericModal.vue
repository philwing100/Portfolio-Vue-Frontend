<template>
    <div v-if="isOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <button @click="$emit('close')">✖</button>
          <slot name="header"></slot>
        </div>
  
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
  
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
    },
  };
  </script>
  
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background: #383444;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    position: relative;
    overflow:auto;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  