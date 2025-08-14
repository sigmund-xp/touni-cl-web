<template>
  <v-snackbar
    v-model="alert.show"
    :timeout="alert.timeout"
    :color="alert.color"
    location="center"
    class="elevation-24"
    multi-line
  >
    <div class="text-subtitle-1 touni-text text-black">
      <v-icon :color="iconColor" size="x-large" class="mr-2">{{ iconName }}</v-icon>
      {{ alert.message }}
    </div>
    <template v-slot:actions>
      <v-btn icon @click="alert.hide">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from "vue";
import { useAlertStore } from "@/stores/alert.store.js";
const alert = useAlertStore();

const iconName = computed(() => {
  switch (alert.type) {
    case "success":
      return "mdi-check-circle";
    case "error":
      return "mdi-alert-circle";
    case "warning":
      return "mdi-alert";
    default:
      return "mdi-information";
  }
});

const iconColor = computed(() => {
  switch (alert.type) {
    case "success":
      return "black";
    case "error":
      return "red";
    case "warning":
      return "orange";
    default:
      return "blue";
  }
});
</script>
