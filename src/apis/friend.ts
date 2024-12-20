import request from "@/utils/request";
import type { Result } from "@/types/apis/base";

enum API {
  FRIEND_URL = "/friend",
  FRIEND_URL_ADD = "/friend",
  FRIEND_URL_ACCEPT = "/friend/accept",
  FRIEND_URL_UNFRIEND = "/friend/unfriend",
  FRIEND_URL_BLOCKED = "/friend/blocked",
  FRIEND_URL_CHECK = "/friend/check",

  PENDING_FRIEND = "/friend/pending-friend",
  SUGGEST_FRIEND = "/friend/suggest-friend",

  FRIEND_BY_PROFILE_URL = "/friend/search",
}

export const getFriends = () => {
  return request.get<any, Result>(API.FRIEND_URL);
};
export const getFriendsByProfile = (id: string) => {
  return request.get<any, Result>(`${API.FRIEND_BY_PROFILE_URL}/${id}`);
};

export const addFriend = (id: string) => {
  return request.put<any, Result>(`${API.FRIEND_URL_ADD}?id=${id}`);
};

export const acceptFriend = (id: string) => {
  return request.put<any, Result>(`${API.FRIEND_URL_ACCEPT}?id=${id}`);
};

export const unfriend = (id: string) => {
  return request.put<any, Result>(`${API.FRIEND_URL_UNFRIEND}?id=${id}`);
};

export const checkFriend = (id: string) => {
  return request.get<any, Result>(API.FRIEND_URL_CHECK + `/${id}`);
};

export const getPendingFriends = () => {
  return request.get<any, Result>(API.PENDING_FRIEND);
};

export const getSuggestFriends = () => {
  return request.get<any, Result>(API.SUGGEST_FRIEND);
};
