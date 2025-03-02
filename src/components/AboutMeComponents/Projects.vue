<!-- eslint-disable -->
<template>
    <div class="projects-container">
      <div class="projects-grid">
        <div v-for="(project, index) in activeProjects" :key="index" class="project-card">
          <img :src="project.image" :alt="project.title" class="project-image" />
          <div class="project-details">
            <h3 class="project-title">{{ project.title }}</h3>
            <ul class="project-bullets">
              <li v-for="(point, i) in project.bullets" :key="i">{{ point }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        projects: [
          {
            title: "Full Stack Productivity Website",
            image: require('@/assets/Images/ProductivityImage.jpeg'),// "C:\\Git Projects\\Portfolio-Vue-Frontend\\src\\assets\\Images",
            bullets: [ "Persistent data with google login", "Calendar enabled todo lists", "Vue.js, Express.js, Mysql", 
            "Deployed live on dashboard page"
            ],
            enabled: true,
          },
          {
            title: "Data Upload Automation",
            image: require("@/assets/Images/winformsexample.png"),
            bullets: ["Improved worker efficiency uploading invoice documents", "Saved 140 Hours per year", "C# and WinForms",
                "Communicated with external teams for tool integration"
            ],
            enabled: true,
          },
          {
            title: "Project Three",
            image: "path/to/image3.jpg",
            bullets: ["Functionality 1", "Functionality 2"],
            enabled: false, // Disabled but still keeps grid structure
          },
          {
            title: "Project Four",
            image: "path/to/image4.jpg",
            bullets: ["Benefit A", "Benefit B", "Benefit C"],
            enabled: false,
          },
        ],
      };
    },
    computed: {
      activeProjects() {
        return this.projects.filter(project => project.enabled);
      }
    }
  };
  </script>
  
  <style scoped>
  .projects-container {
    width: 100%;
    padding: 20px;
    background: #111;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Keeps grid structure even if some are disabled */
    gap: 20px;
    justify-content: center;
  }
  
  .project-card {
    display: flex;
    background: #222;
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease-in-out;
  }
  
  .project-card:hover {
    transform: scale(1.05);
  }
  
  .project-image {
    width: 40%;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .project-details {
    flex: 1;
    padding: 0 15px;
  }
  
  .project-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #fff;
  }
  
  .project-bullets {
    list-style-type: disc;
    padding-left: 20px;
    color: #ccc;
  }
  
  .project-bullets li {
    margin-bottom: 5px;
  }
  </style>
  