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
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
  {
    userName: "John Doe",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
]);
</script>
<style lang="scss"></style>
