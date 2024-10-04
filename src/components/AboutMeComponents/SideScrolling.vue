<template>
    <div id="scroll-container">
        <div id="scroll-text">Scrolling text test.</div>
    </div>
</template>

<script>
export default {

}

</script>

<style>
#scroll-container {
  border: 3px solid black;
  border-radius: 5px;
  overflow: hidden;
  flex-direction:column;
  width: 100%;
}

#scroll-text {
  transform: translateX(100%);
  animation: my-animation 2s linear infinite;
}

@keyframes my-animation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
</style>
