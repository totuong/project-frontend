import { getTopArtists } from "@/apis/artist";
import {
  getFriends,
  getPendingFriends,
  getSuggestFriends,
  getFriendsByProfile,
} from "@/apis/friend";
import { type Profile } from "@/types/modules/User";
import type { Result } from "@/types/apis/base";
import { ref } from "vue";

export function useUserHome() {
  const topArtists = ref<Profile[]>();
  const pendingFriends = ref<Profile[]>();
  const suggestFriends = ref<Profile[]>();
  const friends = ref<Profile[]>();

  async function onGetTopArtists() {
    const result: Result = await getTopArtists();
    topArtists.value = result.data ?? [];
  }
  async function onGetPendingFriends() {
    const result: Result = await getPendingFriends();
    pendingFriends.value = result.data ?? [];
  }
  async function onGetSuggestFriends() {
    const result: Result = await getSuggestFriends();
    suggestFriends.value = result.data ?? [];
  }
  async function onGetFriends() {
    const result: Result = await getFriends();
    friends.value = result.data ?? [];
  }

  async function onGetFriendsByProfileId(id: string) {
    const result: Result = await getFriendsByProfile(id);
    friends.value = result.data ?? [];
  }
  return {
    onGetTopArtists,
    onGetPendingFriends,
    onGetSuggestFriends,
    onGetFriendsByProfileId,
    onGetFriends,
    topArtists,
    friends,
    pendingFriends,
    suggestFriends,
  };
}
