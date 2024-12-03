import { getProfile } from "@/api/user";
import type { Profile } from "@/types/module/User";
import type { Result } from "@/types/api/base";
import { ref } from "vue";

export function useProfile() {
  const defaultProfile: Profile = {
    id: "",
    userId: "",
    email: "",
    mobile: "",
    avatar: "/logo.png",
    coverPhoto: "/taylor-swift-inc.webp",
    role: "",
    fullName: "Anonymous",
    friendsCount: 0,
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    isFollowing: false,
  };

  const profile = ref<Profile>(defaultProfile);

  async function onGetProfile(id?: string) {
    const result: Result = await getProfile(id);
    profile.value = result.data ?? {};
  }

  return { defaultProfile, onGetProfile, profile };
}
