import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const ifNotAuthenticated = (to, from, next) => {
  let authenticated = store.getters.isAuthenticated;
  if (!authenticated) {
    next("/authentication");
    return;
  }
  next();
};

const ifAuthenticated = (to, from, next) => {
  let authenticated = store.getters.isAuthenticated;
  if (authenticated) {
    next("/");
    return;
  }
  next();
};

const routes = [
  { path: "/:catchAll(.*)", redirect: "/Home" },
  {
    path: "/Authentication",
    component: () => import("@/views/UserAuth"),
    name: "Authentication",
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("@/views/Home"),
    beforeEnter: ifNotAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
