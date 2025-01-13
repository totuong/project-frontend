
export type PostRequest = {
  bookerId: string;
  artistId: string;
  from: Date;
  to: Date;
  status: string;
};

export type PostForm = {
  id: string;
  content: string;
  
};

export type CommentForm = {
  id: string;
  postId: string;
  content: string;
}

export const defaultCommentForm: CommentForm = {
  id: "",
  postId: "",
  content: "",
};
