export type User = {
  id: string;
  username: string;
  avatar: string;
  fullName: string;
  role: string;
  profileId: string;
  profileCode: string;
};
export type Profile = {
  id: string;
  userId: string;
  email: string;
  nickname: string;
  mobile: string;
  avatar: string;
  coverPhoto: string;
  birthday: Date;
  age: number;
  gender: string;
  address: string;
  role: string;
  fullName: string;
  friendsCount: number;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  bio: string;
  genre: string[];
  profileCode: string;
};

export const defaultProfile: Profile = {
  id: "",
  userId: "",
  email: "",
  nickname: "",
  mobile: "",
  avatar: "",
  coverPhoto: "",
  role: "user",
  birthday: new Date(),
  age: 0,
  gender: "",
  address: "",
  fullName: "",
  friendsCount: 0,
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  isFollowing: false,
  bio: "",
  genre: [],
  profileCode: "",
};
