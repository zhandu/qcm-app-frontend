import { createRouter, createWebHistory } from "vue-router";
import tokenService from "../services/token.service";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {noAuth: true},
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {noAuth: true},
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/articles",
    name: "Articles",
    meta: {auth: true},
    component: () => import("../views/Articles.vue"),
  },
  {
    path: "/articles/:id",
    name: "Article",
    meta: {auth: true},
    component: () => import("../views/Article.vue"),
  },
  {
    path: '/404',
    name: '404',
    component: () => import("../views/NotFound")
  },
  {
    path: "/:catchAll(.*)",
    name: 'CatchAll',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.auth)
  const isLoggedIn = tokenService.getUser()

  const adminRightsRequired = to.matched.some(record => record.meta.admin)
  const isAdmin = store.getters.isAdmin

  const noAuthRequired = to.matched.some(record => record.meta.noAuth)

  if (authRequired) {
    if (!isLoggedIn) {
      store.dispatch('logout')
    }
    if (adminRightsRequired && !isAdmin) {
      router.push('/404')
    }
  } else {
    if (isLoggedIn && noAuthRequired) {
      router.push('/')
    }
  }
  next()
})

export default router;
