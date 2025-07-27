<script setup lang="ts">
import { onMounted, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

import { APP_NAME } from "@/config/app";
import { Icon } from "@iconify/vue";
import { FwbDropdown } from "flowbite-vue";

import DefaultButton from "@/components/Buttons/DefaultButton.vue";

import { useAuth } from "@/composables/useAuth"; // You'll need to create this

// Define the app name as a reactive variable
const appName = APP_NAME;
// Use the authentication composable
const { isAuthenticated, user, logout } = useAuth();
</script>

<template>
  <div
    class="m-0 font-sans antialiased font-normal bg-white text-start text-base leading-default text-slate-500 h-screen overflow-hidden"
  >
    <div class="container sticky top-0 z-sticky">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full max-w-full px-3 flex-0">
          <!-- Navbar -->
          <div
            class="navbar-backdrop hidden fixed top-0 left-0 z-30 w-screen h-screen"
          ></div>
          <nav
            class="absolute top-0 left-0 right-0 z-50 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start"
          >
            <div
              class="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit"
            >
              <RouterLink
                to="/"
                class="py-2.375 text-sm mr-4 ml-4 whitespace-nowrap font-bold text-slate-700 lg:ml-0"
              >
                {{ appName }}
              </RouterLink>
              <button
                navbar-trigger
                class="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                type="button"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span
                  class="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none"
                >
                  <span
                    bar1
                    class="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  ></span>
                  <span
                    bar2
                    class="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  ></span>
                  <span
                    bar3
                    class="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  ></span>
                </span>
              </button>

              <div
                navbar-menu
                class="items-center flex-grow transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto"
              >
                <ul
                  id="navbar-pills"
                  class="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto"
                ></ul>
                <!-- online builder btn  -->
                <li class="relative flex items-center gap-3">
                  <fwb-dropdown placement="bottom" text="Top">
                    <nav class="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Dashboard</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Settings</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Earnings</a
                      >
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >Sign out</a
                      >
                    </nav>
                  </fwb-dropdown>
                  <div class="cursor-pointer hover:opacity-75">
                    <Icon
                      :icon="'bi:chevron-down'"
                      class="w-4 h-4 mb-0.5 text-gray-500"
                    />
                    <span @click="logout" class="ml-2">{{ user?.name }}</span>
                  </div>
                  <img
                    class="w-8 h-8 rounded-full border"
                    :src="'/assets/img/curved-images/curved1.jpg'"
                    alt=""
                  />
                </li>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <div class="mt-0 transition-all duration-200 ease-soft-in-out">
      <section>
        <div
          class="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen"
        >
          <div class="container z-10">
            <div class="flex flex-wrap mt-0 -mx-3">
              <div
                class="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12"
              >
                <RouterView />
              </div>
              <div class="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                <div
                  class="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block"
                >
                  <div
                    class="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                    style="
                      background-image: url('/assets/img/curved-images/curved8.jpg');
                    "
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer class="py-12"></footer>
  </div>
</template>

<style scoped>
#navbar-pills .router-link-active {
  color: #3b82f6; /* Tailwind's blue-500 */
  opacity: 0.75;
}
</style>
