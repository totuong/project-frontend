import { defineStore } from "pinia";
import router from "@/router";
import { reqLogin, reqUserInfo, reqRegister } from "@/api/auth";
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
  ResponseData,
} from "@/types/api/auth";
import type { User } from "@/types/module/User";
import { setToken, removeToken, getToken } from "@/utils/auth";

const useUserStore = defineStore("user", {
  state: (): User => {
    return {
      username: "",
      avatar: "",
      role: "",
      id: "",
      fullName: "",
    };
  },
  actions: {
    async userLogin(data: LoginFormData) {
      return new Promise<TokenResult>((resolve, reject) => {
        reqLogin(data)
          .then((res) => {
            if (res.success === true) setToken(res.data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
      console.log("🚀 ~ userInfo ~ token:", getToken());

      const res: UserResult = await reqUserInfo();
      const user: User = res.data;
      if (res.success === true) {
        this.$state = user;
        console.log("🚀 ~ userInfo ~ this.$state:", this.$state);

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
      removeToken;
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
