import type { ReviewForm } from "./review";

export type OrderRequest = {
  bookerId: string;
  artistId: string;
  from: Date;
  to: Date;
  status: string;
};

export type OrderForm = {
  id: string;
  artistId: string;
  company: string;
  from?: Date;
  to?: Date;
  address: string;
  note: string;
  price: number;
  review: ReviewForm;
};

export type ShowTop = {
  key: string;
  value: number;
};

export const defaultOrderForm: OrderForm = {
  id: "",
  artistId: "",
  company: "",
  from: null,
  to: null,
  address: "",
  note: "",
  price: null,
  review: {},
};
