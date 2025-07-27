<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { isProduction } from "@/config/app"; // Import your app configuration

import PasswordInput from "@/components/Inputs/PasswordInput.vue";
import GeneralInput from "@/components/Inputs/DefaultInput.vue";
import DefaultButton from "@/components/Buttons/DefaultButton.vue";

import { useNotyf } from "@/composables/useNotyf";

import { useAuth } from "@/composables/useAuth";

// Router
const router = useRouter();

// Form data
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false); // Add loading state

// Get notyf instance from composable
const { success, error, warning, info } = useNotyf();

// Use authentication composable
const { login, logout } = useAuth();

// Form submission
const handleLogin = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  };
  // check for empty fields
  if (!email.value || !password.value) {
    error("Email and password are required");
    return;
  }
  // Set loading to true
  isLoading.value = true;
  // try to login
  try {
    console.log("Login data:", credentials);
    if (isProduction) {
      // Simulate network delay in productions
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
    }
    // Call the login function with credentials
    const user = await login(credentials);

    if (user) {
      // Optionally redirect after successful login
      router.push("/dashboard");
    } else {
      error("Login failed. Invalid credentials.");
    }
  } catch (err) {
    console.error("Login error:", err);
    error("Login failed. Please try again.");
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div
    class="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border"
  >
    <div class="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
      <h3 class="relative z-10 font-bold bg-clip-text">Welcome back</h3>
      <p class="mb-0">Enter your email and password to sign in</p>
    </div>
    <div class="flex-auto p-6">
      <form role="form" @submit.prevent="handleLogin">
        <GeneralInput
          v-model="email"
          type="email"
          label="Email"
          placeholder="Email"
          required
          class="mb-4"
          id="loginEmail"
          :disabled="isLoading"
        />
        <PasswordInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          id="loginPassword"
          :disabled="isLoading"
          required
        />
        <div class="min-h-6 mb-0.5 block pl-12">
          <input
            id="rememberMe"
            v-model="rememberMe"
            :disabled="isLoading"
            class="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:left-5 h-5 relative float-left -ml-12 w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right"
            type="checkbox"
          />
          <label
            class="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"
            for="rememberMe"
            >Remember me</label
          >
        </div>
        <div class="text-center">
          <DefaultButton
            text="Sign In"
            type="submit"
            class=""
            :loading="isLoading"
            :disabled="isLoading || !email || !password"
          />
        </div>
      </form>
    </div>
    <div
      class="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2"
    >
      <p class="mx-auto mb-6 leading-normal text-sm">
        Don't have an account?
        <RouterLink
          to="/register"
          class="relative z-10 font-semibold underline bg-clip-text"
          >Sign up</RouterLink
        >
      </p>
    </div>
  </div>
</template>
