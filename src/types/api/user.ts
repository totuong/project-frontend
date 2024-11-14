export type User = {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  email: string;
  mobile: string;
  role: number;
};
export type UserResult = {
  success: boolean;
  statusCode?: number;
  data: User;
};
