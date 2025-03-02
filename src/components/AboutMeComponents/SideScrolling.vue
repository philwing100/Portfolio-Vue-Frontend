<template>
  <div id="scroll-container">
    <div id="scroll-track">
      <!-- Original Set of Icons -->
      <font-awesome-icon
        v-for="(icon, index) in icons"
        :key="index"
        :icon="['fab', icon.name]"
        :style="{ color: icon.color }"
        class="scroll-icon"
      />
      <!-- Duplicate Set for Smooth Looping -->
      <font-awesome-icon
        v-for="(icon, index) in icons"
        :key="'duplicate-' + index"
        :icon="['fab', icon.name]"
        :style="{ color: icon.color }"
        class="scroll-icon"
      />

      <font-awesome-icon
        v-for="(icon, index) in icons"
        :key="'triplicate-' + index"
        :icon="['fab', icon.name]"
        :style="{ color: icon.color }"
        class="scroll-icon"
      />

      <font-awesome-icon
        v-for="(icon, index) in icons"
        :key="'quadriplicate-' + index"
        :icon="['fab', icon.name]"
        :style="{ color: icon.color }"
        class="scroll-icon"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faJs,
  faHtml5,
  faCss3,
  faNodeJs,
  faVuejs,
  faJava,
  faGithub,
  faGitAlt,
  faMicrosoft,
  faLinux
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faJs,
  faHtml5,
  faCss3,
  faNodeJs,
  faVuejs,
  faJava,
  faGithub,
  faGitAlt,
  faMicrosoft,
  faLinux
);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      icons: [
        { name: "js", color: "#f7df1e" },
        { name: "html5", color: "#e34f26" },
        { name: "css3", color: "#1572b6" },
        { name: "node-js", color: "#83cd29" },
        { name: "vuejs", color: "#42b883" },
        { name: "java", color: "#f89820" },
        { name: "git-alt", color: "#f34f29" },
        { name: "github", color: "#000000" },
        { name: "linux", color: "#000000" },
      ]
    };
  }
};
</script>

<style>
/* Scrolling bar container */
#scroll-container {
  width: 100vw; /* Full width of window */
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  padding: 10px 0;
}

/* Moving icons track */
#scroll-track {
  display: flex;
  gap: 40px; /* Spacing between icons */
  width: max-content;
  animation: scroll-animation 10s linear infinite;
}

/* Styling for individual icons */
.scroll-icon {
  font-size: 3rem;
  opacity: 0.9;
}

/* Animation for infinite scrolling */
@keyframes scroll-animation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
