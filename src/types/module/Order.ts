import type { Profile } from "./User";

export type Order = {
  id: string;
  bookerId: string;
  artistId: string;
  booker: Profile;
  artist: Profile;
  company: string;
  from: Date;
  to: Date;
  totalTime: string;
  status: string;
  address: string;
  note: string;
  price: number;
};

