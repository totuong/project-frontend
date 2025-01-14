import type { Result } from "@/types/apis/base";
import type { SearchForm } from "@/types/apis/user";
import request from "@/utils/request";

const PREDIX = "/user/search";

enum API {
  SEARCH_URL = `${PREDIX}`,
  SEARCH_HISTORY_URL = `${PREDIX}-history`,
  SEARCH_CREATE_URL = `${PREDIX}/save-history`,
  SEARCH_DELETE_URL = `${PREDIX}`,
}

export const search = (param: any) =>
  request.get<any, Result>(API.SEARCH_URL, param);

export const getHistories = () => request.get<any, Result>(API.SEARCH_URL);

export const saveHistory = (data: SearchForm) =>
  request.post<any, Result>(API.SEARCH_CREATE_URL, data);

export const deleteHistory = (id: string) => {
  return request.delete<any, Result>(`${API.SEARCH_DELETE_URL}/${id}`);
};
