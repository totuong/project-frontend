import { defineStore } from "pinia";
import { getProfile } from "@/apis/user";
import type {} from "@/types/apis/user";
import type { Profile } from "@/types/modules/User";
import type { Result } from "@/types/apis/base";
import useUserStore from "./user";


const userStore = useUserStore();
const useProfileStore = defineStore("profile", {
  state: (): Profile => {
    return {
      id: "",
      userId: "",
      email: "",
      nickname: "",
      mobile: "",
      avatar: "",
      coverPhoto: "",
      role: "user",
      birthday: new Date(),
      age: 0,
      gender: "",
      address: "",
      fullName: "",
      friendsCount: 0,
      followersCount: 0,
      followingCount: 0,
      postsCount: 0,
      isFollowing: false,
      bio: "",
      genre: [],
    };
  },
  actions: {
    async getProfile() {
      const res: Result = await getProfile(userStore.profileCode);
      const user: User = res.data;
      if (res.success === true) {
        this.$state = user;
        return "ok";
      } else {
        return Promise.reject(new Error(res.statusCode as unknown as string));
      }
    },
  },

  getters: {},
});

export default useProfileStore;
