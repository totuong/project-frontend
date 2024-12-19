/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-22 22:06:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 10:45:52
 */
import router from "@/router";
import setting from "./settings";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "./store";
import { getToken, removeToken } from "./utils/auth";
import useUserStore from "./store/modules/user";
nprogress.configure({ showSpinner: false });
const userStore = useUserStore(pinia);
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`;
  nprogress.start();
  const token = getToken();
  const username=userStore.username
  if (token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        console.log("🚀 ~ router.beforeEach ~ username:", username)
        next();
      } else {
        try {
          await userStore.userInfo();
          next({ ...to });
        } catch (error) {
          removeToken()
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      if (to.query.redirect === "/login") {
        next();
        return;
      }
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
// 全局后置守卫

router.afterEach((route) => {
  nprogress.done();
});
