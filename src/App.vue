<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/assets/base.css";
html,
body,
#app {
  width: 100%;
  height: 100%;
  /* max-width: 1280px; */
  margin: 0 auto;
  font-weight: normal;
}
</style>
