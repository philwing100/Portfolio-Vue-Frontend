<template>
  <div class="about-me">
    <div class="section">
      <h2>Personality</h2>
      <p>
        I'm a passionate and innovative software developer who loves diving deep into complex problems and finding elegant solutions. I thrive in collaborative environments and enjoy brainstorming ideas with team members to create impactful software solutions.
      </p>
    </div>

    <div class="section">
      <h2>Skills</h2>
      <ul>
        <li>Proficient in Vue.js, JavaScript, HTML, and CSS</li>
        <li>Experience with front-end frameworks like React.js and Angular</li>
        <li>Familiarity with back-end technologies such as Node.js and Express.js</li>
        <li>Strong understanding of database management systems, including SQL and NoSQL</li>
        <li>Knowledgeable in version control systems like Git</li>
        <li>Ability to design responsive and user-friendly interfaces</li>
      </ul>
    </div>

    <div class="section">
      <h2>Projects</h2>
      <div class="project">
        <h3>Project 1: E-commerce Website</h3>
        <p>A full-stack e-commerce website built with Vue.js and Node.js, featuring user authentication, product catalog, shopping cart functionality, and secure payment processing.</p>
      </div>
      <div class="project">
        <h3>Project 2: Task Management App</h3>
        <p>A task management application developed with Vue.js and Firebase, allowing users to create, update, and prioritize tasks in real-time.</p>
      </div>
      <div class="project">
        <h3>Project 3: Portfolio Website</h3>
        <p>My personal portfolio website showcasing my skills, projects, and contact information. Built using Vue.js, HTML, and CSS.</p>
      </div>
    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>
        Feel free to reach out to me via email at example@example.com or connect with me on LinkedIn <a href="https://www.linkedin.com/">here</a>. I'm always open to new opportunities and collaborations.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe'
}
</script>

<style scoped>
.about-me {
  max-width: 800px;
  margin: 0 auto;
}

.section {
  margin-bottom: 40px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.project h3 {
  margin-bottom: 10px;
}

.project p {
  margin-bottom: 20px;
}
</style>
