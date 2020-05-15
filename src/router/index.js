import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: () =>
      import(/* webpackChunkName: "createpost" */ "../views/CreatePost.vue")
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue")
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/Profile.vue")
  },
  {
    path: "/post/:id/edit",
    name: "EditPost",
    component: () =>
      import(/* webpackChunkName: "editpost" */ "../views/EditPost.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes
});

export default router;
