import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TeamView from "@/views/TeamView.vue";
import NotFoundView from "@/views/errors/404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      meta: {
        layout: "guest",
      },
      component: () => AboutView,
    },
    {
      path: "/team",
      name: "team",
      meta: {
        layout: "guest",
      },
      component: () => TeamView,
    },
    {
      path: "/",
      name: "login",
      meta: {
        layout: "guest",
      },
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      meta: {
        layout: "guest",
      },
      component: RegisterView,
    },
    // 404 catch-all route - MUST be last
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      meta: {
        layout: "guest",
      },
      component: NotFoundView,
    },
  ],
});

export default router;
