<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import GuestLayout from "./layouts/GuestLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

// Get current route
const route = useRoute();

// Define the layout to be used for the view based of meta information
const Layout = computed(() => {
  const layout = route.meta.layout || "guest";
  // Check the layout type and return the corresponding layout component
  if (layout === "auth") {
    return AuthLayout;
  }
  return GuestLayout;
});
</script>

<template>
  <component :is="Layout" />
</template>

<style>
/* Global styles can go here if needed */
</style>
