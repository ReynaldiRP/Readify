<script setup lang="ts">
// Add displayName for functional components
import { defineComponent } from "vue";

// If this is a functional component, add displayName
const AboutView = defineComponent({
  name: "AboutView", // Add this
  setup() {
    // Your component logic
  },
});
</script>
<template>
  <div
    class="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
  >
    <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
      <h3 class="relative z-10 font-bold bg-clip-text">About Page</h3>
    </div>
  </div>
</template>
