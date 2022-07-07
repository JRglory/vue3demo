import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/components/Index.vue"),
      beforeEnter(to, from, next) {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next({ name: "login" });
        }
      },
      children: [
        {
          path: "",
          redirect: "addOrDeleteGoods",
        },
        {
          path: "addOrDeleteGoods",
          name: "addOrDeleteGoods",
          component: () => import("@/views/AddOrDeleteGoods.vue"),
        },
        {
          path: "updateProperty",
          name: "updateProperty",
          component: () => import("@/views/UpdateProperty.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/LoginOrRegister.vue"),
      beforeEnter(to, from, next) {
        if (localStorage.getItem("token")) {
          next({ name: "addOrDeleteGoods" });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
