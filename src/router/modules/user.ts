const Layout = () => import("@/layout/index.vue");

export default {
  path: "/user",
  name: "User",
  component: Layout,
  meta: {
    title: "menus.user"
  },
  children: [
    {
      path: "/user",
      name: "User",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "menus.user",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
