import request from "@/utils/request";
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
  ResponseData,
} from "@/types/api/auth";

enum API {
  ORDER_URL = "/user/order",
  ORDER_UPDATE_URL = "/user/order",
  ORDER_CREATE_URL = "/user/order/create",
  ORDER_DELETE_URL = "/user/order/delete",

  POST_URL ="/user/post",
  POST_UPDATE_URL ="/user/post",
  POST_DETAIL_URL ="/user/post/detail",
  POST_CREATE_URL ="/user/post/create",
  POST_DELETE_URL ="/user/post/delete",
  
  POST_REPORT_URL ="/user/post/report",

  PROFILE_URL ="/user/profile",
  PROFILE_UPDATE_URL ="/user/profile",
  PROFILE_UPDATE_AVATAR_URL ="/user/profile-avatar",
  PROFILE_UPDATE_COVER_PHOTO_URL ="/user/profile-cover-photo",

  
  REGISTER_URL = "/auth/register",
  USERINFO_URL = "/auth/info",
  LOGOUT_URL = "/auth/logout",
}

export const getProfile = (data: LoginFormData) =>
  request.post<any, TokenResult>(API.PROFILE_URL, data);

export const getPost = (data: RegisterFormData) =>
  request.post<any, ResponseData>(API.REGISTER_URL, data);

export const getQQ = () => request.get<any, UserResult>(API.USERINFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
