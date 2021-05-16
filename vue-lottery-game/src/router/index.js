import { createRouter, createWebHistory } from "vue-router";

const ifNotAuthenticated = (to, from, next) => {
  let authenticated = false;
  if (!authenticated) {
    next("/Login");
    return;
  }
  next();
};

const ifAuthenticated = (to, from, next) => {
  let authenticated = false;
  if (authenticated) {
    next("/");
    return;
  }
  next();
};

const routes = [
  {
    path: "/Login",
    component: () => import("@/views/Login"),
    name: "Login",
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/",
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
