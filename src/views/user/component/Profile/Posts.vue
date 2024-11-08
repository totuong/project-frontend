<template>
  <div v-for="post in posts" :key="post.id" class="post mb-4">
    <el-card>
      <template v-slot:header>
        <div class="post-header flex items-center">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="Avatar"
            class="post-avatar w-10 h-10 rounded-full mr-3"
          />
          <div class="post-info">
            <span class="post-username font-semibold">User Name</span>
            <span class="post-date text-gray-500 text-sm">{{ post.date }}</span>
          </div>
        </div>
      </template>
      <div class="post-content">{{ post.content }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const posts = ref([
  { id: 1, content: "This is the first post.", date: "2024-11-07" },
  { id: 2, content: "Here’s another post.", date: "2024-11-06" },
]);
</script>

<style></style>
