<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

// Props
interface Props {
  modelValue: string;
  placeholder?: string;
  label?: string;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Enter password",
  label: "Password",
  required: false,
  disabled: false,
  class: "",
});

// Emits
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

// State
const isPasswordVisible = ref(false);

// Methods
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="password-input-wrapper">
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
        :type="isPasswordVisible ? 'text' : 'password'"
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

      <button
        type="button"
        class="absolute z-10 right-2.5 top-0.5 transform p-1 hover:bg-gray-100 rounded transition-colors"
        @click="togglePasswordVisibility"
        :disabled="disabled"
        :title="isPasswordVisible ? 'Hide password' : 'Show password'"
      >
        <Icon
          :icon="isPasswordVisible ? 'bi:eye-slash-fill' : 'bi:eye-fill'"
          class="w-4 h-4 text-gray-500"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.password-input-wrapper {
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
