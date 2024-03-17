<template>
  <div class="Type">
    <h1>MonkeyType with Quizlet Sets</h1>
    <div class="quote">
      <span v-for="(word, index) in words" :key="index" :class="{ 'highlighted': index === currentIndex }">
        <span v-for="(char, charIndex) in word" :key="charIndex" :class="{ 'correct': isCorrect(index, charIndex), 'active': isActive(index, charIndex), 'incorrect': isIncorrect(index, charIndex) }">
          {{ char }}
        </span>
        <template v-if="index !== words.length - 1 || index === currentIndex">&nbsp;</template>
      </span>
    </div>
    <input type="text" v-model="typedText" @keydown="checkKeyPress" :disabled="isDisabled" autofocus />
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
      isCompleted: false
    };
  },
  created() {
    this.words = this.quote.split(" ");
  },
  computed: {
    isDisabled() {
      return this.currentIndex === this.words.length || this.isCompleted;
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
    delay(){
        this.isCompleted=true;
    },
    checkKeyPress(event) {
      if (this.currentIndex === this.words.length - 1 && this.typedText.trim() === this.words[this.currentIndex].substring(0,this.words.length)) {
          setTimeout(this.delay,1);
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
  color: green; /* Color for correctly typed characters */
}

.quote .active {
  color: blue; /* Color for currently active letter */
}

.quote .incorrect {
  color: red; /* Color for incorrectly typed characters */
}

.quote .highlighted {
  color: #fff; /* White color */
}

input[type="text"] {
  padding: 10px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
}

input[type="text"]:focus {
  border-color: #ff6347; /* Focus color */
}

input[type="text"]:disabled {
  background-color: #f0f0f0; /* Disabled color */
}
</style>
