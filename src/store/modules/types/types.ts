/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-20 16:28:00
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 11:27:45
 */
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
