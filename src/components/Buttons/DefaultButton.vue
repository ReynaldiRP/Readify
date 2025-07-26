<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

// Props
interface Props {
  text?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  class?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: "Default Text",
  type: "button",
  disabled: false,
  class: "",
  loading: false,
});
</script>

<template>
  <button
    :id="id"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center uppercase align-middle transition-all border rounded-lg cursor-pointer bg-x-25 bg-150 leading-pro text-xs ease-soft-in tracking-tight-soft text-white !bg-gradient-to-tl !from-blue-600 !to-cyan-400 hover:scale-102 hover:shadow-soft-xs active:opacity-85',
      props.class,
    ]"
  >
    <template v-if="loading">
      <div class="loader text-base"></div>
    </template>
    <template v-else>
      {{ text }}
    </template>
  </button>
</template>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
button .loader {
  margin: 6.5px auto;
  scale: 0.7;
  color: #fff;
  width: 4px;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
  transform: translateX(-38px);
  animation: l21 0.5s infinite alternate linear;
}

@keyframes l21 {
  50% {
    box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;
  }
  100% {
    box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;
  }
}
button:disabled:hover {
  background-color: transparent;
}
</style>
