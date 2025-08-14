<template>
  <v-app>
    <v-main class="dark-color">
      <router-view />
      <GlobalAlert />
    </v-main>
  </v-app>
</template>

<script setup>
import GlobalAlert from "@/components/GlobalAlert.vue";
</script>

<style scoped>
.v-application {
  overflow-y: hidden;
}
</style>
