import type { RouteRecordRaw } from "vue-router";
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
  role: number;
}

export interface CategoryState {
  c1Id: string | number;
  c2Id: string | number;
  c3Id: string | number;
}

export type filterType = {
  from: String;
  to: String;
  artistIds: string[];
  bookerIds: string[];
  status?: Array<string>;
};
