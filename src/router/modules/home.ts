import { home } from "@/router/enums";
const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/dashboard",
  meta: {
    icon: "menu",
    title: "menus.hshome",
    rank: home
  },
  children: [
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("@/views/artist/index.vue"),
      meta: {
        title: "menus.hshome",
        showLink: VITE_HIDE_HOME === "true" ? false : true
      }
    }
  ]
} as RouteConfigsTable;
