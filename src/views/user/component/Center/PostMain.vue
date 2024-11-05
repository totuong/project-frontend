<template>
  <div>
    <div class="posts">
      <div
        class="post "
        v-for="(post, index) in posts"
        :key="index"
      >
       <Post :data="post"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Post from "./Post.vue";

const posts = ref([
  {
    userName: "John Doe",
    avatar: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
  {
    userName: "John Doe",
    avatar: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar: "https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
]);
</script>
<style lang="scss"></style>
