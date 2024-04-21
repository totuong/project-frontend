const Layout = () => import("@/layout/index.vue");

export default [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: $t("menus.hslogin"),
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/login/forgotPassword.vue"),
    meta: {
      title: "menus.forgotPassword",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/login/register.vue"),
    meta: {
      title: "menus.register",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/register/verify",
    name: "RegisterVerify",
    component: () => import("@/views/login/verifyEmail.vue"),
    meta: {
      title: "menus.hslogin",
      showLink: false,
      rank: 102
    }
  },
  {
    path: "/login/google/verify",
    name: "Verify",
    component: () => import("@/views/login/verify.vue"),
    meta: {
      title: "menus.hslogin",
      showLink: false,
      rank: 101
    }
  },
  {
    path: "/redirect",
    component: Layout,
    meta: {
      title: "status.hsLoad",
      showLink: false,
      rank: 102
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "Redirect",
        component: () => import("@/layout/redirect.vue")
      }
    ]
  },
  {
    path: "/external",
    name: "https://old-cpa.adflex.vn",
    meta: {
      icon: 'ri:refresh-line',
      rank: 100,
      title: "Version cũ"
    }
  }
] as Array<RouteConfigsTable>;
