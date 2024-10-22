import { defineStore } from "pinia";
import router from "@/router";
import { reqLogin, reqUserInfo, reqLogOut, reqRegister } from "@/api/user";
import type { RouteRecordRaw } from "vue-router";
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
  ResponseData,
} from "@/api/user/type";
import type { UserState } from "./types/types";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoute, asyncRoute, anyRoute } from "@/router/routes";

import cloneDeep from "lodash/cloneDeep";

let dynamicRoutes: RouteRecordRaw[] = [];

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute,
      username: "",
      avatar: "",
      buttons: [],
      role: 1,
    };
  },
  actions: {
    async userLogin(data: LoginFormData) {
      const res: TokenResult = await reqLogin(data);
      if (res.success === true) {
        this.token = res.data as string;
        SET_TOKEN(res.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(res.data as string));
      }
    },

    async userRegister(data: RegisterFormData) {
      const res: ResponseData = await reqRegister(data);
      if (res.statusCode === 200) {
        return "ok";
      } else {
        return Promise.reject(
          new Error(res.data ? JSON.stringify(res.data) : "error")
        );
      }
    },

    async userInfo() {
      const res: UserResult = await await reqUserInfo();

      if (res.success === true) {
        this.username = res.data.username as string;
        this.avatar = res.data.avatar as string;
        this.role = res.data.role;

        this.menuRoutes = [...constantRoute, anyRoute];
        dynamicRoutes = [anyRoute];
        dynamicRoutes.forEach((route) => {
          router.addRoute(route);
        });
        return "ok";
      } else {
        return Promise.reject(new Error(res.statusCode as unknown as string));
      }
    },

    async userLogout() {
      // const res = await reqLogOut();
      // if (res.code === 200) {
      //   this.token = "";
      //   this.username = "";
      //   this.avatar = "";
      REMOVE_TOKEN();
      // dynamicRoutes.forEach((route) => {
      //   if (route.name) {
      router.push("/");
      //       }
      //     });
      //   } else {
      //     return Promise.reject(new Error(res.message));
      //   }
    },
  },

  getters: {},
});

export default useUserStore;
