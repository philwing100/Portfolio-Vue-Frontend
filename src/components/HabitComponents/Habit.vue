<template>
  <div class="habit-card" :class="{ inactive: !isActiveToday }" @click="handleCardClick">
    <div class="habit-left">
      <span class="current-streak">🔥 {{ habit.currentStreak }}</span>
      <span class="habit-title">{{ habit.title }}</span>
    </div>

    <div class="habit-bar-container">
      <div class="habit-bar-background">
        <div class="habit-bar-fill" :class="{ animate: shouldAnimate }" :style="{
          width: barPercentage + '%',
          backgroundColor: habit.color,
        }" @animationend="shouldAnimate = false">
          <div v-for="(wave, index) in 3" :key="index" class="wave" :style="{
            background: waveColors[index],
            animationDelay: (index * 0.3) + 's',
          }"></div>
        </div>
        <div class="tick-marks">
          <span v-for="n in (habit.goal || 1) + 1" :key="n" class="tick"
            :style="{ left: (n / (habit.goal || 1)) * 100 + '%' }">
            |
          </span>
        </div>
      </div>
    </div>

    <div class="habit-right">
      <span class="highest-streak">🏆 {{ habit.highestStreak }}</span>
      <button class="gear-btn" @click.stop="$emit('edit', habit)">
        <font-awesome-icon :icon="gearIcon" />
      </button>
    </div>
  </div>
</template>

<script>
import { getTodayDate } from "../../date.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { axiosPost } from '../../api.js';

function lightenDarkenColor(rgb, amount) {
  const parts = rgb.match(/\d+/g).map(Number);
  return `rgb(${parts.map((c) => Math.min(255, Math.max(0, c + amount))).join(",")})`;
}

export default {
  name: "Habit",
  components: { FontAwesomeIcon },
  props: {
    habit: Object,
  },
  data() {
    return {
      shouldAnimate: false,
    };
  },
  computed: {
    todayBit() {
      const today = new Date().getDay();
      return [64, 1, 2, 4, 8, 16, 32][today];
    },
    isActiveToday() {
      return (this.habit.days & this.todayBit) > 0;
    },
    barPercentage() {
      const pct = (this.habit.currentStreak / (this.habit.goal || 1)) * 100;
      return Math.min(pct, 100);
    },
    lastUpdatedToday() {
      return this.habit.lastUpdated === getTodayDate();
    },
    gearIcon() {
      return faCog;
    },
    waveColors() {
      return [
        this.habit.color
      ];//Later can add this back correctly to have waves going along the bars. 
    },//Perhaps a wave from left to right along the progress bar.
  },
  methods: {
    handleCardClick() {
      if (!this.isActiveToday || this.lastUpdatedToday) return;
      //Update the ui values immediately without waiting
      let temp = this.habit.highestStreak;

      this.habit.currentStreak = this.habit.currentStreak + 1;
      this.habit.highestStreak = Math.max(this.habit.currentStreak, this.habit.highestStreak);
      this.habit.lastUpdated = getTodayDate();

      //Send to backend since it does its own increment calculation from internal date
      if(this.$store.state.isAuthenticated){
        axiosPost('/streaks/', 'incrementStreak', this.habit).then(result => {
        if (!result.success) {
          //If backend doesnt agree then send values back down
          this.habit.currentStreak = this.habit.currentStreak -1;
          this.habit.highestStreak = temp;
          console.log("Can't increment again today");
        }
      });
    }
      this.shouldAnimate = true;
    },
  },
};
</script>

<style scoped>
.habit-card {
  display: flex;
  align-items: center;
  background-color: var(--primary);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: var(--accentColor);
  cursor: pointer;
  transition: opacity 0.3s;
}

.habit-card.inactive {
  opacity: 0.4;
  cursor: default;
}

.habit-left {
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 1rem;
}

.current-streak {
  font-weight: bold;
}

.habit-title {
  font-size: 1.1rem;
  color: var(--accentColor);
}

.habit-bar-container {
  flex: 1;
  position: relative;
  height: 3.125rem;
  /* increased thickness */
  margin: 0 1rem;
}

.habit-bar-background {
  width: 100%;
  height: 100%;
  background-color: var(--secondaryColor);
  border-radius: 1.5625rem;
  overflow: hidden;
  position: relative;
}

.habit-bar-fill {
  height: 100%;
  position: relative;
  border-top-right-radius: 1.5625rem;
  border-bottom-right-radius: 1.5625rem;
  transition: width 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.habit-bar-fill.animate {
  animation: pop-in 0.4s ease-out;
}

@keyframes pop-in {
  0% {
    transform: scaleY(0.85);
    opacity: 0.6;
  }

  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}

.wave {
  position: absolute;
  top: 0;
  width: 3.75rem;
  height: 100%;
  right: 0;
  border-top-right-radius: 1.5625rem;
  border-bottom-right-radius: 1.5625rem;
  animation: waveAnim 2s infinite ease-in-out;
}

.wave:nth-child(2) {
  animation-duration: 3s;
}

.wave:nth-child(3) {
  animation-duration: 2.5s;
}

@keyframes waveAnim {
  0% {
    transform: translateY(0);
    transform: translateX(0);
  }

  50% {
    transform: translateY(0.375rem);
    transform: translateX(0.375rem);
  }

  100% {
    transform: translateY(0);
    transform: translateX(0);
  }
}

.tick-marks {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

.tick {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  color: var(--accentColor);
}

.habit-right {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.gear-btn {
  background-color: var(--secondaryColor);
  color: var(--accentColor);
  border: none;
  border-radius: 0.375rem;
  padding: 0.375rem 0.625rem;
  cursor: pointer;
}

.gear-btn:hover {
  background-color: var(--accentColor);
  color: var(--primary);
}
</style>
