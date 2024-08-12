<template>
    <div class="fullpage-container" @wheel="handleScroll">
      <div
        class="section"
        v-for="(section, index) in sections"
        :key="section.id"
        :ref="`section-${index}`"
      >
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
      </div>
      <div class="scroll-indicator" v-if="showIndicator">
        <button v-for="(section, index) in sections" :key="index" @click="scrollToSection(index)">
          {{ section.title }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      sections: {
        type: Array,
        required: true
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        activeSection: 0,
        isScrolling: false,
      };
    },
    methods: {
      scrollToSection(index) {
        const section = this.$refs[`section-${index}`][0];
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
  
          // Set a delay after the animation to prevent accepting new inputs too soon
          setTimeout(() => {
            this.isScrolling = false;
          }, 1200); // Delay for accepting new scroll inputs
        }
      },
      handleScroll(event) {
        if (this.isScrolling) return;
  
        this.isScrolling = true;
        
        const direction = event.deltaY > 0 ? 1 : -1;
        this.activeSection += direction;
  
        if (this.activeSection < 0) {
          this.activeSection = 0;
        } else if (this.activeSection >= this.sections.length) {
          this.activeSection = this.sections.length - 1;
        }
        setTimeout(() => {
            this.scrollToSection(this.activeSection);
        }, 100);

      }
    },
    mounted() {
      this.$nextTick(() => {
        this.scrollToSection(this.activeSection);
      });
    }
  };
  </script>
  
  <style scoped>
  .fullpage-container {
    overflow: hidden;
    height: 100vh;
    position: relative;
  }
  
  .section {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    border-bottom: 1px solid #ccc;
  }
  
  .scroll-indicator {
    position: fixed;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
  }
  
  .scroll-indicator button {
    margin-bottom: 10px;
  }
  </style>
  