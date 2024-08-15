<template class="page">
  <div>
    <AshEffect />
    <FullPage :sections="sections" :showIndicator="true" />
  </div>
</template>

<script>
import FullPage from '../components/AboutMeComponents/FullPage.vue'; 
import AshEffect from '../components/AboutMeComponents/AshEffect.vue';

export default {
  components: {
    FullPage,
    AshEffect,
  },
  data() {
    return {
      sections: [
        { id: 1, title: 'Hi, I\'m Phillip Ring', content: 'I crave efficiency and finding new ways to improve. I\'m an honors senior year computer science student attending UT Tyler.' },
        { id: 2, title: 'Skills', content: 'Technologies: Javascript, HTML/CSS, MySQL, Vue.js, Node, Express.js, BASH. Familiarity with other systems such as Git, Vscode, Wireshark. Knowledgeable in version control systems like Git.' },
        { id: 3, title: 'Projects', content: 'Details about projects.' },
        { id: 4, title: 'Contact', content: 'Feel free to reach out to me via email at philwing100@gmail.com or connect with me on <a href="https://www.linkedin.com/in/ring-phillip">LinkedIn</a>. I\'m always open to new connections and collaboration.' }
      ]
    };
  }
};
</script>

<style>
.page{

}

</style>
