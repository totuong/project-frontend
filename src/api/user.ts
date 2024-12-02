import request, { camelCaseToUnderScore } from "@/utils/request";
import type { Result } from "@/types/api/base";

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
  PROFILE_UPDATE_URL = "/user/profile",
  PROFILE_UPDATE_AVATAR_URL = "/user/profile-avatar",
  PROFILE_UPDATE_COVER_PHOTO_URL = "/user/profile-cover-photo",

  REGISTER_URL = "/auth/register",
  USERINFO_URL = "/auth/info",
  LOGOUT_URL = "/auth/logout",
}

export const getProfile = (id?: string) => {
  const params = id ? { id } : undefined; 
  return request.get<any, Result>(API.PROFILE_URL, { params });
};
