export type ReviewForm = {
  id: string;
  artistId: string;
  orderId: string;
  userId: string;
  comment: string;
  rate: number;
};

export const defaultForm: ReviewForm = {
  id: "",
  artistId: "",
  orderId: "",
  userId: "",
  comment: "",
  rate: 0,
};
