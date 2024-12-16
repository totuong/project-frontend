import { getTopArtists } from "@/api/artist";
import { getFriends, getPendingFriends, getSuggestFriends } from "@/api/friend";
import { type Profile } from "@/types/module/User";
import type { Result } from "@/types/api/base";
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
  return {
    onGetTopArtists,
    onGetPendingFriends,
    onGetSuggestFriends,
    onGetFriends,
    topArtists,
    friends,
    pendingFriends,
    suggestFriends,
  };
}
