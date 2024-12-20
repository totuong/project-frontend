export interface LoginFormData {
  username?: string;
  password?: string;
}

export interface RegisterFormData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
}

export interface ResponseData {
  code?: number;
  statusCode?: number;
  message?: string;
  meta?: object;
  data?: object;
  ok?: boolean;
}
export type User = {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  profileCode: string;
};

export type UserResult = {
  success: boolean;
  statusCode?: number;
  data: User;
};
export type TokenResult = {
  success: boolean;
  data: string;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expires: Date;
  };
};

export type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type GoogleRedirectResult = {
  data: string;
};
