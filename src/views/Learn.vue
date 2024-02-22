<template>
  <div>
    <div class="learn">
      <h1>Haha quizlet learn</h1>
    </div>

    <div>
      <label for="urlInput">Enter URL:</label>
      <input type="text" id="urlInput" v-model="url">
      <button @click="fetchData">Fetch Data</button>
    </div>
    <div id="dataContainer">
      <div v-if="loading">Loading...</div>
      <div v-else>{{ responseData }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'LearnWorld',
  setup() {
    const url = ref('');
    const responseData = ref('');
    const loading = ref(false);

    const fetchData = async () => {
      try {
        loading.value = true;
        const response = await axios.post('http://your-puppeteer-backend-url/scrape', { url: url.value });
        responseData.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      url,
      responseData,
      loading,
      fetchData
    };
  },
};
</script>

<style>
/* Add your styles here if needed */
</style>
