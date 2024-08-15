/* eslint-disable */

<template>
  <div class="fullpage-container" @wheel="handleScroll">
    <div class="section" v-for="(section, index) in sections" :key="section.id" :ref="`section-${index}`"
      :class="`section-${index}`">
      <div class="sidescroll-container">
        <transition name="fade" @before-leave="beforeLeave">
          <SideScrolling v-if="index === 0 && activeSection === 0" />
        </transition>
      </div>
      <h2 class="content">{{ section.title }}</h2>
      <p class="content">{{ section.content }}</p>
    </div>
    <div class="scroll-indicator" v-if="showIndicator">
      <div class="button-container" v-for="(section, index) in sections" :key="index" @click="scrollToSection(index)">
        <div class="box"></div>
        {{ section.title }}
      </div>
    </div>
  </div>
</template>

<script>
import SideScrolling from './SideScrolling.vue';

export default {
  components: {
    SideScrolling,
  },
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
      isLeaving: false
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

    },
    computeGradient(index, totalSections) {
      const step = 255 / (totalSections - 1);
      const rgbValue = Math.round(step * index);
      return `linear-gradient(rgb(${rgbValue}, ${rgbValue}, ${rgbValue}), rgb(${rgbValue + step}, ${rgbValue + step}, ${rgbValue + step}))`;
    },
    applyGradients() {
      this.sections.forEach((_, index) => {
        const section = this.$refs[`section-${index}`][0];
        if (section) {
          section.style.backgroundImage = this.computeGradient(index, this.sections.length);
        }
      });
    },
    beforeLeave(el) {
      // Add a delay before the component is removed
      setTimeout(() => {
        // This will trigger the actual removal
        el.style.opacity = 0;
      }, 500); // Delay in milliseconds (500ms in this example)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.applyGradients();
      this.scrollToSection(this.activeSection);
    });
  }
};
</script>

<style scoped>
.box{
  border: solid black 5px;
  padding: 5px;
  background-color:white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

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
  flex-wrap: wrap;
  flex-direction:column;
}

.section:nth-child(1) .content {
  color: white;
}

.content {
  z-index: 2;
}

.scroll-indicator {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display:inline-block;
  flex-direction: column;
  margin: 0px;
}

.scroll-indicator button {
  margin-bottom: 10px;
}

.button-container{
  display: flex;
  flex-direction:row;
  background:red;
}

.sidescroll-container {
  background-color:green;
  color:white;
  align-items: center;
  justify-content: center;
  display:flex;
  flex-wrap: nowrap;
  width: 80%;
}
</style>
