import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  { path: "/:catchAll(.*)", redirect: "/Home" },
  {
    path: "/Authentication",
    component: () => import("@/views/UserAuth"),
    name: "Authentication",
    meta: { authNotRequired: true },
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/views/Home"),
    meta: { authRequired: true },
  },
  {
    path: "/Draw",
    name: "Draw",
    component: () => import("@/views/Draw"),
    meta: { authRequired: true },
  },
  {
    path: "/History",
    name: "History",
    component: () => import("@/views/History"),
    meta: { authRequired: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(function(to, _, next) {
  if (to.meta.authRequired && !store.getters.isAuthenticated) {
    next("/Authentication");
  } else if (to.meta.authNotRequired && store.getters.isAuthenticated) {
    next("/Home");
  } else if (to.name === "Draw" && !store.getters.isReady) {
    next("/Home");
  } else {
    next();
  }
});

export default router;
