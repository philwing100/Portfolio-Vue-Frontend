/* eslint-disable */

<template>
  <div class="fullpage-container" @wheel="handleScroll">
    <div
      class="section"
      v-for="(section, index) in sections"
      :key="section.id"
      :ref="`section-${index}`"
      :class="`section-${index}`"
    >
      <h2 class="content">{{ section.title }}</h2>
      <p class="content">{{ section.content }}</p>
    </div>
    <div class="scroll-indicator" v-if="showIndicator">
      <button v-for="(section, index) in sections" :key="index" @click="scrollToSection(index)">
        {{ section.title }}
      </button>
    </div>
  </div>
</template>

<script>
import AshEffect from './AshEffect.vue';

export default {
  components: {
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
  display: flex;
  flex-direction: column;
}

.scroll-indicator button {
  margin-bottom: 10px;
}
</style>
