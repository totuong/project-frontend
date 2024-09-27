/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:15:57
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-23 21:32:57
 */
// 统一管理用户相关接口
import request from '@/utils/request'
import type {
  LoginFormData,
  RegisterFormData,
  TokenResult,
  UserResult,
  ResponseData
} from './type'

enum API {
  LOGIN_URL = '/auth/login',
  REGISTER_URL = '/auth/register',
  USERINFO_URL = '/auth/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, TokenResult>(API.LOGIN_URL, data)

export const reqRegister = (data: RegisterFormData) =>
  request.post<any, ResponseData>(API.REGISTER_URL, data)

export const reqUserInfo = () =>
  request.get<any, UserResult>(API.USERINFO_URL)

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)