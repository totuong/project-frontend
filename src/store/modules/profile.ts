import { defineStore } from "pinia";
import { getProfile} from "@/api/user";
import type {

} from "@/types/api/user";
import type { Profile } from "@/types/module/User";

const useUserStore = defineStore("profile", {
  state: (): Profile => {
    return {
        id: "",
        userId: "",
        email: "",
        mobile: "",
        avatar: "",
        role: "",
        fullName: "",
        friendsCount: 0,
        followersCount: 0,
        followingCount: 0,
        postsCount: 0,
        isFollowing: false
    };
  },
  actions: {
  



    async getProfile() {

      const res: UserResult = await getProfile();
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

export default useUserStore;
