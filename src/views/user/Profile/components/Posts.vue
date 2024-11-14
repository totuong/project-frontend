<template>
  <div>
    <el-scrollbar>
      <div class="posts">
        <div class="post" v-for="(post, index) in posts" :key="index">
          <Post :data="post" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Post from "./Post.vue";

const posts = ref([
  {
    userName: "John Doe",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media:
      "https://ss-images.saostar.vn/wwebp1200/2016/03/15/348857/bieber.jpg",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
  {
    userName: "John Doe",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    timestamp: "2 hours ago",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    media:
      "https://ss-images.saostar.vn/wwebp1200/2016/03/15/348857/12806104_1001617166574883_6353793867604984063_n.jpg",
    likes: 123,
    comments: [
      {
        userName: "Jane Smith",
        avatar:
          "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        timestamp: "1 hour ago",
        content: "This is a comment.",
      },
    ],
  },
]);
</script>

<style></style>
