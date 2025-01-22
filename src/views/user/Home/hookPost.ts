import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  reportPost,
  createComment,
  deleteComment,
  updateComment,
  likePost,
  getComments,
} from "@/apis/post";
import type { Result } from "@/types/apis/base";
import { ref } from "vue";
import type { Comment, Post } from "@/types/modules/Post";
import type { CommentForm, PostForm } from "@/types/apis/post";

export function usePostHook() {
  const posts = ref<Post[]>([]);
  const comments = ref<Comment[]>([]);

  async function onGetPosts(id?: string) {
    const { data } = await getPosts(id);
    posts.value = data;
  }
  async function onCreatePost(data: PostForm, files: File[]) {
    const result: Result = await createPost(data, files);
    return result;
  }
  async function onUpdatePost(data: PostForm) {
    const result = await updatePost(data);
    return result;
  }

  async function onReport(id: string) {
    const result = await reportPost(id);
    return result;
  }

  async function onDeletePost(id: string) {
    const result = await deletePost(id);
    return result;
  }

  async function onGetComments(id: string) {
    const { data } = await getComments(id);
    comments.value = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async function onCreateCommnent(data: CommentForm) {
    const result = await createComment(data);
    return result.data;
  }

  async function onUpdateComment(data: CommentForm) {
    const result = await updateComment(data);
    return result;
  }

  async function onDeleteComment(id: string) {
    const result = await deleteComment(id);
    return result;
  }

  async function onLike(id: string) {
    const result = await likePost(id);
    return result;
  }

  return {
    onCreatePost,
    onGetPosts,
    onUpdatePost,
    onReport,
    onDeletePost,
    onCreateCommnent,
    onUpdateComment,
    onDeleteComment,
    onLike,
    posts,
    comments,
    onGetComments,
  };
}
