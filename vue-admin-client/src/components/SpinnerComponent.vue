<template>
  <div class="spinner"></div>
</template>

<script>
export default {
  name: "SpinnerComponent",
};
</script>

<style scoped>
.spinner {
  width: 80px;
  height: 40px;
  --c: linear-gradient(#ffd412 25%, #abd406 0 50%, #ff821c 0 75%, #ffd412 0);
  background: var(--c), var(--c), var(--c), var(--c);
  background-size: 26% 400%;
  background-position: calc(0 * 100% / 3) 100%, calc(1 * 100% / 3) 100%,
    calc(2 * 100% / 3) 100%, calc(3 * 100% / 3) 100%;
  background-repeat: no-repeat;
  animation: co10 2s infinite;
}

@keyframes co10 {
  0% {
    background-position: calc(0 * 100% / 3) calc(3 * 100% / 3),
      calc(1 * 100% / 3) calc(3 * 100% / 3),
      calc(2 * 100% / 3) calc(3 * 100% / 3),
      calc(3 * 100% / 3) calc(3 * 100% / 3);
  }
  8.33% {
    background-position: calc(0 * 100% / 3) calc(2 * 100% / 3),
      calc(1 * 100% / 3) calc(3 * 100% / 3),
      calc(2 * 100% / 3) calc(3 * 100% / 3),
      calc(3 * 100% / 3) calc(3 * 100% / 3);
  }
  16.67% {
    background-position: calc(0 * 100% / 3) calc(2 * 100% / 3),
      calc(1 * 100% / 3) calc(2 * 100% / 3),
      calc(2 * 100% / 3) calc(3 * 100% / 3),
      calc(3 * 100% / 3) calc(3 * 100% / 3);
  }
  25% {
    background-position: calc(0 * 100% / 3) calc(2 * 100% / 3),
      calc(1 * 100% / 3) calc(2 * 100% / 3),
      calc(2 * 100% / 3) calc(2 * 100% / 3),
      calc(3 * 100% / 3) calc(3 * 100% / 3);
  }
  30%,
  33.33% {
    background-position: calc(0 * 100% / 3) calc(2 * 100% / 3),
      calc(1 * 100% / 3) calc(2 * 100% / 3),
      calc(2 * 100% / 3) calc(2 * 100% / 3),
      calc(3 * 100% / 3) calc(2 * 100% / 3);
  }
  41.67% {
    background-position: calc(0 * 100% / 3) calc(1 * 100% / 3),
      calc(1 * 100% / 3) calc(2 * 100% / 3),
      calc(2 * 100% / 3) calc(2 * 100% / 3),
      calc(3 * 100% / 3) calc(2 * 100% / 3);
  }
  50% {
    background-position: calc(0 * 100% / 3) calc(1 * 100% / 3),
      calc(1 * 100% / 3) calc(1 * 100% / 3),
      calc(2 * 100% / 3) calc(2 * 100% / 3),
      calc(3 * 100% / 3) calc(2 * 100% / 3);
  }
  58.33% {
    background-position: calc(0 * 100% / 3) calc(1 * 100% / 3),
      calc(1 * 100% / 3) calc(1 * 100% / 3),
      calc(2 * 100% / 3) calc(1 * 100% / 3),
      calc(3 * 100% / 3) calc(2 * 100% / 3);
  }
  63%,
  66.67% {
    background-position: calc(0 * 100% / 3) calc(1 * 100% / 3),
      calc(1 * 100% / 3) calc(1 * 100% / 3),
      calc(2 * 100% / 3) calc(1 * 100% / 3),
      calc(3 * 100% / 3) calc(1 * 100% / 3);
  }
  75% {
    background-position: calc(0 * 100% / 3) calc(0 * 100% / 3),
      calc(1 * 100% / 3) calc(1 * 100% / 3),
      calc(2 * 100% / 3) calc(1 * 100% / 3),
      calc(3 * 100% / 3) calc(1 * 100% / 3);
  }
  83.33% {
    background-position: calc(0 * 100% / 3) calc(0 * 100% / 3),
      calc(1 * 100% / 3) calc(0 * 100% / 3),
      calc(2 * 100% / 3) calc(1 * 100% / 3),
      calc(3 * 100% / 3) calc(1 * 100% / 3);
  }
  91.67% {
    background-position: calc(0 * 100% / 3) calc(0 * 100% / 3),
      calc(1 * 100% / 3) calc(0 * 100% / 3),
      calc(2 * 100% / 3) calc(0 * 100% / 3),
      calc(3 * 100% / 3) calc(1 * 100% / 3);
  }
  97%,
  100% {
    background-position: calc(0 * 100% / 3) calc(0 * 100% / 3),
      calc(1 * 100% / 3) calc(0 * 100% / 3),
      calc(2 * 100% / 3) calc(0 * 100% / 3),
      calc(3 * 100% / 3) calc(0 * 100% / 3);
  }
}
</style>
