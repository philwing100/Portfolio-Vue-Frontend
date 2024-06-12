<template>
  <div class="lists">
    <h1>Theme Adjust</h1>
  
    <button class="button" @click="saveColors"></button>
    <div>
      <div class="colorItem" id="primary" :style="{ backgroundColor: colors.primary, color: colors.text }">Primary</div>
      <div class="colorItem" id="secondary" :style="{ backgroundColor: colors.secondary, color: colors.text }">Secondary</div>
      <div class="colorItem" id="downClick" :style="{ backgroundColor: colors.downClick, color: colors.text }">Depress Click</div>
      <div class="colorItem" id="clicked" :style="{ backgroundColor: colors.clicked, color: colors.text }">Clicked</div>
      <div class="colorItem" id="hover" :style="{ backgroundColor: colors.hover, color: colors.text }">Hover</div>
      <div class="colorItem" id="text" :style="{ backgroundColor: colors.text, color: colors.text }">Text</div>
      <div class="colorItem" id="background" :style="{ backgroundColor: colors.background, color: colors.text }">Background</div>
      <div class="colorItem" id="sideBar" :style="{ backgroundColor: colors.sideBar, color: colors.text }">Sidebar</div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, onUnmounted } from 'vue';

export default {
  name: 'ColorPicker',
  setup() {
    const colors = inject('colors');
    return {
      colors,
    }
  },
  methods: {
    setPrimary(){
      document.querySelector('#primary').style.cssText = `background-color: ${this.colors.primary}; color: ${this.colors.text};`;
    },
    // You can define similar methods for other colors
    
    saveColors() {
      // Define this method if needed
    }
  },
  mounted(){
    if (this.colors) {
      this.setPrimary();
      // You can call other color-setting methods here
    }
  }
}
</script>

<style>
button{
  min-width: 20px;
  min-height:20px;
}

.lists{
  margin:auto;
  text-align:center;
  margin-bottom:300px;
}

.colorItem{
  margin-top:20px;
}
</style>
