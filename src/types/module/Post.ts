import type { Profile } from "./User";

export type Post = {
  id: string;
  title: string;
  createdAt: Date;
  medias: Media[];
  content: string;
  comments: Content[];
  likes: Profile[];
  user: Profile;
};

export type Media = {
  id: string;
  type: string;
  url: string;
};

export type Content = {
  id: string;
  user: Profile;
  content: string;
  createdAt: Date;
};
