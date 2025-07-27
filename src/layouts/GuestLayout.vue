<script setup lang="ts">
import { onMounted, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";

import { APP_NAME } from "@/config/app";

import { useAuth } from "@/composables/useAuth";

// Define the app name as a reactive variable
const appName = APP_NAME;
// Use the authentication composable
const { isAuthenticated, logout } = useAuth();
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
                class="items-center flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto"
              >
                <ul
                  id="navbar-pills"
                  class="flex flex-col pl-0 mx-auto mb-0 list-none lg:flex-row xl:ml-auto"
                >
                  <li>
                    <RouterLink
                      to="/"
                      class="flex items-center px-4 py-2 mr-2 font-normal transition-all duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2"
                    >
                      Home
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      to="/about"
                      class="flex items-center px-4 py-2 mr-2 font-normal transition-all duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2"
                    >
                      About
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      to="/team"
                      class="flex items-center px-4 py-2 mr-2 font-normal transition-all duration-250 ease-soft-in-out text-sm text-slate-700 lg:px-2"
                    >
                      Teams
                    </RouterLink>
                  </li>
                </ul>
                <!-- online builder btn  -->
                <!-- <li class="flex items-center">
                  <a
                    class="leading-pro ease-soft-in text-fuchsia-500 border-fuchsia-500 text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl hover:border-fuchsia-500 hover:scale-102 hover:text-fuchsia-500 active:hover:border-fuchsia-500 active:hover:scale-102 active:hover:text-fuchsia-500 active:opacity-85 active:shadow-soft-xs active:bg-fuchsia-500 active:border-fuchsia-500 mr-2 mb-0 inline-block cursor-pointer border border-solid bg-transparent py-2 px-8 text-center align-middle font-bold uppercase shadow-none transition-all hover:bg-transparent hover:opacity-75 hover:shadow-none active:scale-100 active:text-white active:hover:bg-transparent active:hover:opacity-75 active:hover:shadow-none"
                    target="_blank"
                    href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053"
                    >Online Builder</a
                  >
                </li> -->
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
