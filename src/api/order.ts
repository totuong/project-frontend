import request from "@/utils/request";

const PREDIX = "/user/order";

enum API {
  ORDER_URL = `${PREDIX}`,
  ORDER_UPDATE_URL = `${PREDIX}`,
  ORDER_CREATE_URL = `${PREDIX}/create`,
  ORDER_DELETE_URL = `${PREDIX}/delete`,
}

export const getOrder = (data: LoginFormData) =>
  request.post<any, TokenResult>(API.LOGIN_URL, data);

export const gerOrderDe = (data: RegisterFormData) =>
  request.post<any, ResponseData>(API.REGISTER_URL, data);

export const deleteOrder = () => request.get<any, UserResult>(API.USERINFO_URL);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
