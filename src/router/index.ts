import { createRouter, createWebHistory } from "vue-router";

import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TeamView from "@/views/TeamView.vue";
import DashboardView from "@/views/auth/DashboardView.vue";

import NotFoundView from "@/views/errors/404.vue";
import { useAuth } from "@/composables/useAuth";

import { APP_NAME } from "@/config/app";

// Define route meta interface for type safety
declare module "vue-router" {
  interface RouteMeta {
    layout?: string;
    requiresAuth?: boolean;
    requiresGuest?: boolean;
    roles?: string[];
    title?: string;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      meta: {
        layout: "guest",
        requiresGuest: true,
        title: "Login",
      },
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      meta: {
        layout: "guest",
        requiresGuest: true,
        title: "Register",
      },
      component: RegisterView,
    },
    {
      path: "/about",
      name: "about",
      meta: {
        layout: "guest",
        title: "About",
      },
      component: () => AboutView,
    },
    {
      path: "/team",
      name: "team",
      meta: {
        layout: "guest",
        title: "Team",
      },
      component: () => TeamView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: {
        layout: "auth",
        requiresAuth: true,
        roles: ["user"],
        title: "Dashboard",
      },
      component: () => DashboardView,
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

const { isAuthenticated, user } = useAuth();

// Global guard - best practice for authentication
router.beforeEach((to, from, next) => {
  try {
    // Check if route requires authentication and not authenticated
    if (to.meta.requiresAuth && !isAuthenticated.value) {
      next({
        name: "login",
        query: {
          error: "authentication_required",
          redirect: to.fullPath,
        },
      });
      return;
    }

    // Check if route is guest-only (redirect authenticated users)
    if (to.meta.requiresGuest && isAuthenticated.value) {
      next({ name: "dashboard" }); // or your main authenticated route
      return;
    }

    // Check user roles if specified
    if (to.meta.roles && isAuthenticated.value) {
      const currentUser = user.value;
      if (!to.meta.roles.includes(currentUser?.role || "")) {
        next({
          name: "login",
          query: { error: "insufficient_permissions" },
        });
        return;
      }
    }
    next();
  } catch (error) {
    console.error("Navigation guard error:", error);
    next({
      name: "login",
      query: { error: "navigation_error" },
    });
  }
});

// Set page titles after navigation
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - ${APP_NAME}` : APP_NAME;
});

export default router;
