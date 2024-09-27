<template>
  <div>
    <H1>Under construction Lists Page</H1>
    <ul>
      <li v-for="list in lists" :key="list.id">{{ list.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListsPage',
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    axios.get('/api/lists', { withCredentials: true })
      .then(response => {
        this.lists = response.data.lists;
      })
      .catch(error => {
        console.error('Error fetching lists:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login page
          this.$router.push('/login');
        }
      });
  }
};
</script>
