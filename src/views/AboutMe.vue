<template>
  <div class="about-me">
    <div class="section">
      <h2>Hi I'm Phillip Ring</h2>
      <p>
         I crave efficiency and finding new ways to improve. I'm a honors senior year computer science student attending UT Tyler.
      </p>
    </div>

    <div class="section">
      <h2>Skills</h2>
      <ul>
        <li>Technologies: Javascript HTML/CSS, MySQL Vue.js, Node, Express.js, BASH </li>
        <li>Familiarity with other systems such as Git, Vscode, Wireshark</li>
        <li>Knowledgeable in version control systems like Git</li>
      </ul>
    </div>

    <div class="section">
      <h2>Projects</h2>

    </div>

    <div class="section">
      <h2>Contact</h2>
      <p>
        Feel free to reach out to me via email philwing100@gmail.com or connect with me on <a href="https://www.linkedin.com/in/ring-phillip">LinkedIn</a>. I'm always open to new connections and collaboration.
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
  background-color: white;
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
