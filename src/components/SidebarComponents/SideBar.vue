<template>
  <div :style="{ width: sidebarWidth + 'px', 'background-color': colors.sideBar }" class="sidebar">
    <div @click="toggleWidth" class="collapse-icon" :class="{ 'rotate-180': !toggleBar }">></div>
    <nav class="needPadding">
      <router-link v-for="(route, index) in routes" :to="route.path" :key="index"
        ref="routerLinks"
        class="sidebarItem"
        :class="{ 'active': $route.path === route.path }"
        @click="setActiveItem(route.path)">
        {{ route.label }}
      </router-link>
    </nav>
  </div>
  <router-view :class="{ 'paddingWithSidebar': !toggleBar, 'paddingWithoutSidebar': toggleBar }"></router-view>
</template>

<script>
import { ref, onMounted, onUnmounted, inject, nextTick } from 'vue';

export default {
  name: 'SideBar',
  setup() {
    const routes = [
      { path: '/Dashboard', label: 'Dashboard' },
      { path: '/Lists', label: 'Lists' },
      { path: '/Learn', label: 'Learn' },
      { path: '/Type', label: 'Type' },
      { path: '/', label: 'About Me' },
      { path: '/Settings', label: 'Settings' },
      { path: '/Login', label: 'Login' },
    ];

    const colors = inject('colors');
    const toggleBar = ref(false);
    const sidebarWidth = ref(180);
    const activeItem = ref(null);
    const routerLinks = ref([]);

    const toggleWidth = () => {
      toggleBar.value = !toggleBar.value;
      sidebarWidth.value = toggleBar.value ? 30 : 180;
    };

    const setActiveItem = (item) => {
      activeItem.value = item;
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        toggleWidth();
      }
    };

    const handleHover = (link) => {
      link.style.backgroundColor = colors.hover;
    };

    const handleMouseLeave = (link) => {
      link.style.backgroundColor = ''; // Reset to default background color
    };

    onMounted(() => {
      document.addEventListener('keyup', handleEscapeKey);

      nextTick(() => {
        routerLinks.value = Array.from(document.querySelectorAll('.sidebarItem'));

        if (colors) {
          routerLinks.value.forEach((item) => {
            item.style.color = colors.text;
          });
        }

        routerLinks.value.forEach((link) => {
          link.addEventListener('mouseenter', () => handleHover(link));
          link.addEventListener('mouseleave', () => handleMouseLeave(link));
        });
      });
    });

    onUnmounted(() => {
      document.removeEventListener('keyup', handleEscapeKey);
      routerLinks.value.forEach((link) => {
        link.removeEventListener('mouseenter', () => handleHover(link));
        link.removeEventListener('mouseleave', () => handleMouseLeave(link));
      });
    });

    return {
      routes,
      toggleBar,
      sidebarWidth,
      toggleWidth,
      activeItem,
      setActiveItem,
      colors,
      routerLinks
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.setActiveItem(to.path);
    next();
  },
};
</script>

<style>
.sidebar {
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  transition: 0.4s ease-out;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
}

.sidebarItem {
  width: 100%;
  padding: 10px;
  padding-left: 10px;
  white-space: nowrap;
  text-decoration: none;
  font-size: 20px;
  display: block;
  transition: 0.3s ease-out;
}

.sidebarItem.active {
  border-radius: 12px;
  width: 85%;
  padding-left: 15px;
  padding-right: 5px;
}

.needPadding {
  padding-top: 30px;
}

.paddingWithoutSidebar {
  padding-left: 30px;
  transition: 0.4s ease-out;
}

.paddingWithSidebar {
  padding-left: 180px;
  transition: 0.4s ease-out;
}

.collapse-icon {
  cursor: pointer;
  transition: 0.3s linear;
  display: flex;
  justify-content: center;
  font-size: 20px;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
