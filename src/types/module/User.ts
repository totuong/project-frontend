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
  totalFriend: number;
  totalFollower: number;
  totalFollowing: number;
  totalBook: number;
  postsCount: number;
  isFollowing: boolean;
  bio: string;
  genre: string[];
  rate: number;
  bank: Bank;
  profileCode: string;
};
export type Friendship = {
  status: string;
  requester: string;
};

export type Bank = {
  id: string;
  bankNumber: string;
  bankName: string;
  bankAddress: string;
  name: string;
  qr: string;
};
export const defaultBank: Bank = {
  id: "",
  bankNumber: "",
  bankName: "",
  bankAddress: "",
  name: "",
  qr: "",
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
  totalFriend: 0,
  totalFollower: 0,
  totalFollowing: 0,
  totalBook: 0,
  postsCount: 0,
  isFollowing: false,
  bio: "",
  genre: [],
  bank: defaultBank,
  rate: 0,
  profileCode: "",
};
