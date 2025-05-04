import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Index.vue"),
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
    // api service practice
    {
      path: "/api-service",
      name: "api.service",
      component: () => import("./views/Services.vue")
    },
    {
      path: "/authorization",
      name: "authorization",
      component: ()=> import("./views/Authorization.vue"),
    },
    {
      path: "/face-auth",
      name: 'face-auth',
      component: ()=> import("./views/FaceAuth.vue"),
    }
  ],
});

export default router;
