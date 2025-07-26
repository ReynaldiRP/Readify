<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

// Props
interface Props {
  modelValue: string;
  placeholder?: string;
  label?: string;
  id?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Default Placeholder",
  label: "Default Label",
  type: "text",
  required: false,
  disabled: false,
  class: "",
});

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="general-input-wrapper">
    <label
      v-if="label"
      :for="id"
      class="mb-2 ml-1 font-bold text-xs text-slate-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative mb-4">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="[
          'focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 pr-12 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow',
          props.class,
        ]"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<style scoped>
.general-input-wrapper {
  width: 100%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: transparent;
}
</style>
