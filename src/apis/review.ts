import type { Result } from "@/types/apis/base";
import type { ReviewForm } from "@/types/apis/review";
import request from "@/utils/request";

const PREDIX = "/review";

enum API {
  REVIEW_URL = PREDIX,
  REVIEW_CREATE_URL = `${PREDIX}/create`,
  REVIEW_UPDATE_URL = `${PREDIX}/update`,
  REVIEW_DELETE_URL = `${PREDIX}/delete`,
  REVIEW_BY_ORDER_URL = `${PREDIX}/order`,
}

export const getReviews = (id: string) =>
  request.get<any, Result>(`${API.REVIEW_URL}/${id}`);

export const getByOrder = (id: string) =>
  request.get<any, Result>(`${API.REVIEW_BY_ORDER_URL}/${id}`);

export const createReview = (data: ReviewForm) =>
  request.post<any, Result>(API.REVIEW_CREATE_URL, data);

export const updateReview = (data: ReviewForm) =>
  request.put<any, Result>(API.REVIEW_UPDATE_URL, data);

export const deleteReview = (id: string) => {
  return request.delete<any, Result>(`${API.REVIEW_DELETE_URL}/${id}`);
};
