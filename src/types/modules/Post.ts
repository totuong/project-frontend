import type { Profile } from "./User";

export type Post = {
  id: string;
  title: string;
  createdAt: Date;
  medias: Media[];
  content: string;
  comments: Comment[];
  likePeople: Profile[];
  profile: Profile;
};

export type Media = {
  id: string;
  type: string;
  url: string;
};

export type Comment = {
  id: string;
  profile: Profile;
  content: string;
  postId: string;
  createdAt: Date;
};