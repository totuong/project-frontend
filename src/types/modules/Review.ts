import type { Profile } from "./User";

export type Review = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  comment: string;
  orderId: string;
  userId: string;
  artistId: string;
  rate: number;
  user: Profile
};
