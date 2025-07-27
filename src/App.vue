<!-- filepath: /C:/WebDev/.Outside project/Readify/src/App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed, onMounted, watch, nextTick } from "vue";
import GuestLayout from "./layouts/GuestLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

import { useSoftUI } from "./composables/useSoftUI";

// Get current route
const route = useRoute();

// Define the layout to be used for the view based of meta information
const Layout = computed(() => {
  const layout = route.meta.layout || "guest";
  if (layout === "auth") {
    return AuthLayout;
  }
  return GuestLayout;
});

// Initialize SoftUI when app mounts
onMounted(() => {
  const { reinitialize } = useSoftUI();
  reinitialize();
});

// Re-initialize when layout changes
watch(Layout, async () => {
  await nextTick(); // Wait for new layout to be rendered
  const { reinitialize } = useSoftUI();
  reinitialize();
});
</script>

<template>
  <component :is="Layout" />
</template>
