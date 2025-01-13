import type { Result } from "@/types/apis/base";
import type { OrderForm } from "@/types/apis/order";
import request from "@/utils/request";

const PREDIX = "/user/order";

enum API {
  ORDER_URL = `${PREDIX}`,
  ORDER_CREATE_URL = `${PREDIX}/create`,
  ORDER_UPDATE_URL = `${PREDIX}/update`,
  ORDER_UPDATE_STATUS_URL = `${PREDIX}/update-status`,
  ORDER_DELETE_URL = `${PREDIX}/delete`,

  ORDER_SCHEDULE =  `${PREDIX}/scheduled`,
  ORDER_SHOW_TOP =  `${PREDIX}/show-top`,
}

export const getOrders = (param: any) =>
  request.get<any, Result>(API.ORDER_URL, param);

export const createOrder = (data: OrderForm) =>
  request.post<any, Result>(API.ORDER_CREATE_URL, data);

export const updateOrder = (data: OrderForm) =>
  request.put<any, Result>(API.ORDER_UPDATE_URL, data);

export const updateStatus = (id: string, status: string, reason?: string) => {
  return request.put<any, Result>(`${API.ORDER_UPDATE_STATUS_URL}?id=${id}&status=${status}&reason=${reason}`);
};

export const deleteOrder = (id: string) => {
  return request.delete<any, Result>(`${API.ORDER_CREATE_URL}/${id}`);
};

export const getScheduledOrder = (id: string) => {
  return request.get<any, Result>(`${API.ORDER_SCHEDULE}/${id}`);
};

export const getShowTop = (param: any) => {
  return request.get<any, Result>(API.ORDER_SHOW_TOP, param);
};
