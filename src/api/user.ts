// import {type Result } from '@/api/base'

export type UserResult = {
  data: {
    id: string;
    name: string
    fullname: string
    username:string
    email: string
    mobile: string
    role: number
  };
};
export type TokenResult = {
  success: boolean
  data: string
}

// export type RefreshTokenResult = {
//   success: boolean;
//   data: {
//     /** `token` */
//     accessToken: string;
//     /** 用于调用刷新`accessToken`的接口时所需的`token` */
//     refreshToken: string;
//     /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
//     expires: Date;
//   };
// };

// export type GoogleRedirectResult = {
//   data:string
// }

// /** 登录 */
// export const getLogin = (data?: object) => {
//   return http.request<TokenResult>('post', '/auth/login', { data })
// }

// export const verifyLoginGoogle = (data?: object) =>{
//   const params = {
//     params: data
//   }
//   return http.request<TokenResult>('get','/auth/login/google/verify', {...params})
// }

// export const loginBySuperUser = (data?: object) => {
//   return http.request<Result>('post', 'auth/login-superuser', { data })
// }

// export const getGoogleRedirectUrl = (data?: object) =>{
//   const params = {
//     params: data
//   }

//   return http.request<GoogleRedirectResult>('get','/auth/login/google/url', {...params})
// }

// export const getUser = (data?: object) => {
//   return http.request<UserResult>('get', 'auth/user', { data })
// }

// export const register = (data?: object) =>{
//   return http.request<Result>('post', 'auth/register', { data })
// }

// export const updateUser = (data?: object) => {
//   return http.request<Result>('put', 'profile/update-profile', { data })
// }

// export const updateInfoPayment = (data?: object) => {
//   return http.request<Result>('put', 'profile/update-payment', { data })
// }

// /** 刷新token */
// export const refreshTokenApi = (data?: object) => {
//   return http.request<RefreshTokenResult>('post', '/refresh-token', { data })
// }

// export const verifyEmail = (data?: object) => {
//   return http.request<Result>('get', 'auth/register/confirm', data)
// }

// export const requestChangePassword = (data?: object) => {
//   return http.request<Result>('post', 'auth/reset-password/forgot', data)
// }
// export const resetPassword = (data?: object) => {
//   return http.request<Result>('post', 'auth/reset-password', data)
// }
