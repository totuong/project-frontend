import {
  getProfile,
  saveProfile,
  getFriends,
  acceptFriend,
  addFriend,
  unfriend,
  checkFriend,
  saveBankInfo,
} from "@/apis/user";
import { defaultProfile, type Bank, type Profile } from "@/types/modules/User";
import type { Result } from "@/types/apis/base";
import { ref } from "vue";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();

export function useProfile() {
  const profile = ref<Profile>(defaultProfile);
  const myProfileId = userStore.profileId;
  const response = ref();

  async function onGetProfile(code: string) {
    const result: Result = await getProfile(code);
    profile.value = result.data ?? {};
  }
  function onSaveProfile(form: Profile) {
    saveProfile(form);
  }

  function onSaveBankInfo(form: Bank) {
    saveBankInfo(form);
  }

  function isMyProfile(id: string): boolean {
    return id === myProfileId;
  }
  function isArtist(data: Profile): boolean {
    return "ARTIST" === data.role;
  }

  async function onGetFriends() {
    const result: Result = await getFriends();
    response.value = result.data ?? {};
  }

  async function onAddFriend(id: string) {
    try {
      const result: Result = await addFriend(id);
      return result.success;
    } catch (error) {
      return false;
    }
  }

  async function onAcceptFriend(id: string) {
    try {
      const result: Result = await acceptFriend(id);
      return result.success;
    } catch (error) {
      console.error("Failed to send friend request:", error);
      return false;
    }
  }
  async function onUnfriend(id: string) {
    try {
      const result: Result = await unfriend(id);
      return result.success;
    } catch (error) {
      console.error("Failed to send friend request:", error);
      return false;
    }
  }

  async function onCheckFriendStatus(id: string) {
    try {
      const result: Result = await checkFriend(id);
      return result?.data || null;
    } catch (error) {
      return "";
    }
  }

  return {
    onGetProfile,
    onSaveProfile,
    isMyProfile,
    isArtist,
    onGetFriends,
    onAddFriend,
    onAcceptFriend,
    onUnfriend,
    onCheckFriendStatus,
    onSaveBankInfo,
    profile,
  };
}
