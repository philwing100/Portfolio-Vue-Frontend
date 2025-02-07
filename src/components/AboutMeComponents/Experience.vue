<!-- eslint disable -->
<template>
   <!-- eslint disable -->
    <div class="experience-container">
      <h2 class="experience-title">Experience</h2>
      
      <div v-for="(job, index) in experiences" :key="index" class="job-entry">
        <h3 class="job-title">{{ job.title }}</h3>
        <p class="job-company">{{ job.company }} | <span class="job-dates">{{ job.date }}</span></p>
        <ul class="job-description">
          <li v-for="(point, i) in job.bulletPoints" :key="i">{{ point }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      experiences: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .experience-container {
    background-color: #fff;
    color: #000;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 700px;
    margin: 0 auto;
  }
  
  .experience-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    font-weight: bold;
  }
  
  .job-entry {
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #ddd;
  }
  
  .job-title {
    font-size: 1.4rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .job-company {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
  }
  
  .job-dates {
    font-size: 0.9rem;
    color: #777;
  }
  
  .job-description {
    margin-top: 10px;
    padding-left: 20px;
  }
  
  .job-description li {
    font-size: 1rem;
    margin-bottom: 5px;
  }
  </style>
  