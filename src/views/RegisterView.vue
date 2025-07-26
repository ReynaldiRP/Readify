<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import PasswordInput from "@/components/Inputs/PasswordInput.vue";
import GeneralInput from "@/components/Inputs/DefaultInput.vue";
import DefaultButton from "@/components/Buttons/DefaultButton.vue";

// Form data
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Validation state
const hasTypedConfirmPassword = ref(false);

// Computed validation
const passwordsMatch = computed(() => {
  if (!hasTypedConfirmPassword.value || !confirmPassword.value) {
    return true; // Don't show error until user starts typing
  }
  return password.value === confirmPassword.value;
});

const confirmPasswordError = computed(() => {
  if (!hasTypedConfirmPassword.value || !confirmPassword.value) {
    return "";
  }
  return passwordsMatch.value ? "" : "Passwords do not match";
});

// Form submission
const handleRegister = () => {
  if (!passwordsMatch.value) {
    console.error("Passwords do not match");
    return;
  }

  console.log("Register attempt:", {
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });
  // Add your register logic here
};

// Track when user starts typing confirm password
const onConfirmPasswordInput = () => {
  hasTypedConfirmPassword.value = true;
};
</script>

<template>
  <div
    class="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
  >
    <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
      <h3 class="relative z-10 font-bold bg-clip-text">Sign Up</h3>
      <p class="mb-0">Create your account to access the platform</p>
    </div>
    <div class="flex-auto p-6">
      <form role="form" @submit.prevent="handleRegister">
        <GeneralInput
          v-model="email"
          type="email"
          label="Email"
          placeholder="Email"
          required
          class="mb-4"
          id="registerEmail"
        />
        <PasswordInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          id="registerPassword"
          required
          class="mb-4"
        />

        <!-- Confirm Password with Error State -->
        <div class="mb-4">
          <PasswordInput
            v-model="confirmPassword"
            label="Confirm Password"
            placeholder="Enter your password again"
            id="confirmPassword"
            required
            @input="onConfirmPasswordInput"
          />
          <!-- Error Message -->
          <div
            v-if="confirmPasswordError"
            class="mt-1 text-sm text-red-500 font-medium"
          >
            {{ confirmPasswordError }}
          </div>
          <!-- Success Message -->
          <div
            v-else-if="
              passwordsMatch &&
              confirmPassword.length > 0 &&
              hasTypedConfirmPassword
            "
            class="mt-1 text-sm text-green-500 font-medium"
          >
            ✓ Passwords match
          </div>
        </div>

        <div class="text-center">
          <DefaultButton
            text="Sign Up"
            type="submit"
            :disabled="
              !passwordsMatch || !email || !password || !confirmPassword
            "
            class=""
          />
        </div>
      </form>
    </div>
    <div
      class="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2"
    >
      <p class="mx-auto mb-6 leading-normal text-sm">
        Already have an account?
        <RouterLink
          to="/"
          class="relative z-10 font-semibold text-blue-600 hover:text-blue-800 underline bg-clip-text"
        >
          Sign in
        </RouterLink>
      </p>
    </div>
  </div>
</template>
