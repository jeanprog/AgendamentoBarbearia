<script setup lang="ts"></script>

<template>
  <!-- ROUTER OUTLET -->
  <div class="router-container">
    <RouterView />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,700;1,700&family=Quicksand:wght@600&display=swap');

.router-container {
  width: 100%;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  overflow: hidden !important;
  background-color: #19181f;
}
</style>
