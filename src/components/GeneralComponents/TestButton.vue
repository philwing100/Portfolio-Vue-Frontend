<template>
    <button @click="handleClick" class="test-button">
      {{ label }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: "Test Button",
      },
      onClick: {
        type: Function,
        required: true, // Function to be passed and executed
      },
    },
    methods: {
      handleClick() {
        if (this.onClick) {
          this.onClick(); // Call the passed function
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .test-button {
    padding: 10px 15px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;
  }
  .test-button:hover {
    background-color: #0056b3;
  }
  </style>
  