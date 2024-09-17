<template>
  <div class="date-input-container">
    <label for="date-input"></label>
    <input type="date" id="date-input" v-model="selectedDate" @change="emitDateChange" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
    };
  },
  methods: {
    emitDateChange() {
      this.$emit('date-selected', this.selectedDate); // Emit the selected date to the parent
    }
  }
};
</script>

<style scoped>
/* Add your styling here */
</style>
