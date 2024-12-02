export type User = {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  role: string;
};
export type Profile = {
  id: string;
  userId: string;
  email: string;
  mobile: string;
  avatar: string;
  coverPhoto: string;
  role: string;
  fullName: string;
  friendsCount: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
};
