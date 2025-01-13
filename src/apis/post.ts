import request from "@/utils/request";
import type { Result } from "@/types/apis/base";
import type { CommentForm, PostForm } from "@/types/apis/post";
import type { AxiosRequestConfig } from "axios";

const PREDIX = "/user/post";

enum API {
  POST_URL = PREDIX,
  POST_CREATE_URL = `${PREDIX}/create`,
  POST_UPDATE_URL = `${PREDIX}/update`,
  POST_DELETE_URL = `${PREDIX}/delete`,
  POST_DETAIL_URL = `${PREDIX}/detail`,
  POST_REPORT_URL = `${PREDIX}/report`,

  COMMENT_URL = `${PREDIX}/comment`,
  COMMENT_DELETE = `${PREDIX}/comment/delete`,
  COMMENT_UPDATE = `${PREDIX}/comment/update`,

  LIKE = `${PREDIX}/like`,
}

export const getPosts = (userId?: string) => {
  const config: AxiosRequestConfig = {
    params: userId ? { userId } : {},
  };

  return request.get<any, Result>(API.POST_URL, config);
};


export const createPost = async (data: PostForm, files: File[]) => {
  const formData = new FormData();

  formData.append("request", JSON.stringify(data));

  for (const file of files) {
    const actualFile = await fetchFile(file);
    formData.append("files", actualFile);
  }

  return request.post<any, Result>(API.POST_CREATE_URL, formData);
};

export const updatePost = (data: PostForm) =>
  request.put<any, Result>(API.POST_UPDATE_URL, data);

export const deletePost = (id: string) => {
  return request.delete<any, Result>(`${API.POST_DELETE_URL}/${id}`);
};

export const reportPost = (id: string) => {
  return request.post<any, Result>(`${API.POST_REPORT_URL}/${id}`);
};

export const getDetail = (id: string) => {
  return request.get<any, Result>(`${API.POST_DETAIL_URL}/${id}`);
};
export const getComments = (id: string) => {
  const params = { id };
  return request.get<any, Result>(API.COMMENT_URL, { params });
};
export const createComment = (data: CommentForm) => {
  return request.post<any, Result>(API.COMMENT_URL, data);
};

export const updateComment = (data: CommentForm) => {
  return request.put<any, Result>(API.COMMENT_UPDATE, data);
};

export const deleteComment = (id: string) => {
  return request.delete<any, Result>(`${API.COMMENT_DELETE}/${id}`);
};

export const likePost = (id: string) => {
  return request.get<any, Result>(`${API.LIKE}/${id}`);
};

const fetchFile = async (file: { name: string; url: string }) => {
  const response = await fetch(file.url); // Tải blob từ URL
  const blob = await response.blob(); // Chuyển thành Blob
  return new File([blob], file.name, { type: blob.type }); // Tạo File
};
