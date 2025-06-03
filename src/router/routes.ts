
/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:46:49
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 10:33:35
 */
export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {
      title: "login",
      hidden: true,
      auth: false,
    },
  },
  // {
  //   path: "/",
  //   component: () => import("@/layout/index.vue"),
  //   name: "Home",
  //   meta: {
  //     title: "",
  //     hidden: false,
  //     auth: false,
  //     icon: "",
  //   },
  //   redirect: "/home",
  //   children: [
  //     {
  //       path: "/home",
  //       component: () => import("@/views/home/index.vue"),
  //       meta: {
  //         title: "Home",
  //         hidden: false,
  //         auth: false,
  //         icon: "HomeFilled",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/user",
    component: () => import("@/layout/index.vue"),
    name: "",
    meta: {
      title: "User",
      hidden: false,
      auth: false,
      icon: "",
    },
    redirect: "/",
    children: [
      {
        path: "/",
        component: () => import("@/views/user/index.vue"),
        meta: {
          title: "Trang chủ",
          hidden: false,
          auth: false,
          icon: "HomeFilled",
        },
      },
      {
        path: "/user/profile/:id",
        component: () => import("@/views/user/Profile/index.vue"),
        meta: {
          title: "Profile",
          hidden: false,
          auth: false,
          icon: "HomeFilled",
        },
      },
      {
        path: "/user/change-password",
        component: () => import("@/views/account/ChangePassword.vue"),
        meta: {
          title: "Change Password",
          hidden: false,
          auth: false,
          icon: "HomeFilled",
        },
      },
      {
        path: "/user/order",
        component: () => import("@/views/user/Order/index.vue"),
        meta: {
          title: "Danh sách đơn",
          hidden: false,
          auth: false,
          icon: "HomeFilled",
        },
      }
    ],
  },
  // {
  //   path: "/artist",
  //   meta: {
  //     title: "Artist",
  //     hidden: false,
  //     auth: false,
  //     icon: "",
  //   },
  //   redirect: "/",
  //   children: [
  //     {
  //       path: "/",
  //       component: () => import("@/views/user/index.vue"),
  //       meta: {
  //         title: "Trang chủ",
  //         hidden: false,
  //         auth: true,
  //         icon: "HomeFilled",
  //       },
  //     },
  //   ],
  // },
  {
    path: "/admin",
    meta: {
      title: "Admin",
      icon: "",
    },
    component: () => import("@/layout/index.vue"),
    redirect: "/admin/index",
    children: [
      {
        path: "/admin/index",
        component: () => import("@/views/admin/index.vue"),
        meta: {
          title: "Trang chủ Admin",
          hidden: false,
          auth: false,
          icon: "HomeFilled",
        },
      },
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },
];

export const anyRoute = {
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    title: "任意路由",
    hidden: true,
  },
};
