import request from "@/utils/request";
import type { Result } from "@/types/apis/base";
import type { Bank, Profile } from "@/types/modules/User";
import type { ChangePasswordForm } from "@/types/apis/user";

enum API {
  CHANGE_PASSWORD_URL = "/user/change-password",

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

export const changePassword = (data: ChangePasswordForm) =>
  request.post<any, Result>(API.CHANGE_PASSWORD_URL, data);

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
