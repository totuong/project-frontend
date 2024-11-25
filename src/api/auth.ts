import request from "@/utils/request";
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
} from "@/types/api/auth";
import type { Result } from "@/types/api/base";

enum API {
  LOGIN_URL = "/auth/login",
  REGISTER_URL = "/auth/register",
  USER_INFO_URL = "/auth/info",
  LOGOUT_URL = "/auth/logout",
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, TokenResult>(API.LOGIN_URL, data);

export const reqRegister = (data: RegisterFormData) =>
  request.post<any, Result>(API.REGISTER_URL, data);

export const reqUserInfo = () => request.get<any, UserResult>(API.USER_INFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
