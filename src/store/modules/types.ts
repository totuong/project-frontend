import { RouteRecordName } from "vue-router";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
  sortSwap: boolean;
  error: {
    show: boolean,
    data: any
  },
  gutter: number
};

export type multiType = {
  path: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = {
  username?: string;
  roles?: Array<string>;
  verifyCode?: string;
  currentPage?: number;
  isRemembered?: boolean;
  loginDay?: number;
  phone?: string;
  email?: string;
};

export type dashboardFilterType = {
 query: {
   from: string
   to: string
   groupBy: Array<string>
 }
}

export type filterType = {
  from: Date;
  to: Date;
  offerIds?: Array<string>;
  categories?: Array<string>;
  status?: Array<string>;
  events?: Array<string>;
  keyword?: string
};
