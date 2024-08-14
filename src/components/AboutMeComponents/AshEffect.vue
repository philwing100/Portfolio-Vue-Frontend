<template>
  <div class="particle-container" ref="container"></div>
</template>

<script>
export default {
  mounted() {
    this.particles = [];
    this.$nextTick(() => {
      // Ensures DOM is fully rendered before accessing the container
      this.createParticles();
      this.animateParticles();
    });
  },
  methods: {
    createParticles() {
      for (let i = 0; i < 50; i++) {
        this.addParticle();
      }
    },
    addParticle() {
      const container = this.$refs.container;
      if (!container) return; // Prevents error if container isn't available

      const particle = document.createElement('div');
      particle.className = 'particle';
      container.appendChild(particle);

      const size = Math.random() * 5 + 2; // Random size between 2px and 7px
      const x = Math.random() * container.clientWidth;
      const y = -size;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      this.particles.push({ element: particle, x, y, size, velocityY: Math.random() * 2 + 1 });
    },
    animateParticles() {
      const container = this.$refs.container;
      if (!container) return; // Prevents error if container isn't available

      this.particles.forEach(particle => {
        particle.y += particle.velocityY;
        particle.element.style.top = `${particle.y}px`;

        if (particle.y > container.clientHeight) {
          // Reset particle to the top
          particle.y = -particle.size;
          particle.x = Math.random() * container.clientWidth;
          particle.element.style.left = `${particle.x}px`;
        }
      });

      // Bind 'this' to the method to ensure it has the correct context
      requestAnimationFrame(this.animateParticles.bind(this));
    }
  }
}
</script>

<style>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  pointer-events: none;
}
</style>
