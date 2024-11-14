import request from "@/utils/request";
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
  ResponseData,
} from "@/types/api/auth";

enum API {
  LOGIN_URL = "/auth/login",
  REGISTER_URL = "/auth/register",
  USERINFO_URL = "/auth/info",
  LOGOUT_URL = "/auth/logout",
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, TokenResult>(API.LOGIN_URL, data);

export const reqRegister = (data: RegisterFormData) =>
  request.post<any, ResponseData>(API.REGISTER_URL, data);

export const reqUserInfo = () => request.get<any, UserResult>(API.USERINFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
