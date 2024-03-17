<template>
  <div class="Type">
    <div class="quote">
      <span v-for="(word, index) in words" :key="index" :class="{ 'highlighted': index === currentIndex }">
        <span v-for="(char, charIndex) in word" :key="charIndex"
          :class="{ 'correct': isCorrect(index, charIndex), 'active': isActive(index, charIndex), 'incorrect': isIncorrect(index, charIndex) }">
          {{ char }}
        </span>
        <template v-if="index !== words.length - 1 || index === currentIndex">&nbsp;</template>
      </span>
    </div>
    <input type="text" v-model="typedText" @keydown="checkKeyPress" :disabled="isDisabled" autofocus />
    <div v-if="isCompleted">Final Time: {{ formatTime(timer) }} seconds</div>
    <div v-if="isCompleted">Accuracy: {{ accuracy }}%</div>
    <div v-if="isCompleted">WPM: {{ wordsPerMinute }}</div>
  </div>
</template>

<script>
export default {
  name: 'TypeWorld',
  data() {
    return {
      quote: "Life is like",
      typedText: "",
      currentIndex: 0,
      words: [],
      isCompleted: false,
      isTyping: false,
      timer: 0,
      timerInterval: null,
      incorrectInputs: 0,
      totalKeypresses: 0
    };
  },
  created() {
    this.words = this.quote.split(" ");
  },
  computed: {
    isDisabled() {
      return this.currentIndex === this.words.length || this.isCompleted;
    },
    accuracy() {
      const totalCharacters = this.countTotalCharacters(this.quote)*1.0;
      return (totalCharacters / this.totalKeypresses) * 100.0;
    },
    wordsPerMinute(){
      const wpm = (this.countTotalCharacters(this.quote) / 5) * (60 / (this.timer / 100));
      return wpm.toFixed(2)
    }
  },
  methods: {
    isCorrect(wordIndex, charIndex) {
      return wordIndex < this.currentIndex || (wordIndex === this.currentIndex && charIndex < this.typedText.length && this.typedText[charIndex] === this.words[wordIndex][charIndex]);
    },
    isIncorrect(wordIndex, charIndex) {
      return wordIndex === this.currentIndex && charIndex < this.typedText.length && this.typedText[charIndex] !== this.words[wordIndex][charIndex];
    },
    isActive(wordIndex, charIndex) {
      return wordIndex === this.currentIndex && charIndex === this.typedText.length;
    },
    delay() {
      this.isCompleted = true;
      clearInterval(this.timerInterval);
    },
    startTimer() {
      this.isTyping = true;
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 10); // increase the timer every 10 milliseconds for thousandths place precision
    },
    formatTime(milliseconds) {
      return (milliseconds / 100).toFixed(2);
    },
    checkKeyPress(event) {
      if (
        event.key !== "Control" &&
        event.key !== "Alt" &&
        event.key !== "Shift" &&
        event.key !== "CapsLock" &&
        event.key !== "Backspace" &&
        event.key !== "Escape" &&
        event.key !== "Delete" &&
        !event.key.startsWith("Arrow")
      ) {
        this.totalKeypresses++;
        console.log('bruh');
      }

      if (!this.isTyping && event.key.length === 1) {
        this.startTimer();
      }

      if (this.currentIndex === this.words.length - 1 && this.typedText.trim() === this.words[this.currentIndex].substring(0, this.words.length)) {
        setTimeout(this.delay, 1);
      }

      if (event.key === " ") {
        if (this.typedText.trim() === this.words[this.currentIndex]) {
          this.currentIndex++;
          this.typedText = "";
        }
        event.preventDefault(); // Prevent space from being input
      } else if (event.key.length === 1) {
        if (this.currentIndex < this.words.length && this.typedText.trim() === this.words[this.currentIndex].substr(0, this.typedText.length)) {
          // Continue typing current word
        } else if (this.currentIndex < this.words.length - 1 && this.typedText === "" && this.words[this.currentIndex + 1][0] === event.key) {
          // Start typing next word
          this.currentIndex++;
        }
      }
    },
    countTotalCharacters(quote) {
      return quote.length;
    }
  }
}
</script>

<style>
.Type {
  text-align: center;
  padding: 20px;
}

.quote {
  margin-bottom: 20px;
}

.quote .correct {
  color: green;
  /* Color for correctly typed characters */
}

.quote .active {
  color: blue;
  /* Color for currently active letter */
}

.quote .incorrect {
  color: red;
  /* Color for incorrectly typed characters */
}

.quote .highlighted {
  color: #fff;
  /* White color */
}

input[type="text"] {
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input[type="text"]:focus {
  border-color: #ff6347;
  /* Focus color */
}

input[type="text"]:disabled {
  background-color: #f0f0f0;
  /* Disabled color */
}
</style>