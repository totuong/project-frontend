import request, { camelCaseToUnderScore } from "@/utils/request";
import type { Result } from "@/types/api/base";
import type { Bank, Profile } from "@/types/module/User";

enum API {
  ORDER_URL = "/user/order",
  ORDER_UPDATE_URL = "/user/order",
  ORDER_CREATE_URL = "/user/order/create",
  ORDER_DELETE_URL = "/user/order/delete",

  POST_URL = "/user/post",
  POST_UPDATE_URL = "/user/post",
  POST_DETAIL_URL = "/user/post/detail",
  POST_CREATE_URL = "/user/post/create",
  POST_DELETE_URL = "/user/post/delete",

  POST_REPORT_URL = "/user/post/report",

  PROFILE_URL = "/user/profile",
  PROFILE_UPDATE_URL = "/user/profile/update",
  PROFILE_UPDATE_AVATAR_URL = "/user/profile-avatar",
  PROFILE_UPDATE_COVER_PHOTO_URL = "/user/profile-cover-photo",
  PROFILE_UPDATE_BANK_URL = "/user/profile/update-bank",

  FRIEND_URL = "/friend",
  FRIEND_URL_ADD = "/friend",
  FRIEND_URL_ACCEPT = "/friend/accept",
  FRIEND_URL_UNFRIEND = "/friend/unfriend",
  FRIEND_URL_BLOCKED = "/friend/blocked",
  FRIEND_URL_CHECK = "/friend/check",
}

export const getProfile = (code: string) => {
  return request.get<any, Result>(API.PROFILE_URL + `/${code}`);
};
export const saveProfile = (data: Profile) => {
  return request.put<any, Result>(API.PROFILE_UPDATE_URL, data);
};
export const saveBankInfo = (data: Bank) => {
  return request.put<any, Result>(API.PROFILE_UPDATE_BANK_URL, data);
};
export const getFriends = () => {
  return request.get<any, Result>(API.FRIEND_URL);
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
