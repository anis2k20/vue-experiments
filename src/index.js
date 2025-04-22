import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "test",
      component: () => import("./views/Test.vue"),
    },
    {
      path: "/posts/:id",
      name: "post.show",
      component: () => import("./views/PostDetails.vue"),
    },
    {
      path: "/form",
      name: "form",
      component: () => import("./views/Form.vue"),
    },
    {
      path: "/crud",
      name: "crud",
      component: () => import("./views/CRUD.vue"),
    },
  ],
});

export default router;
