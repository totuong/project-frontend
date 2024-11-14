<template>
  <div v-for="data in datas" :key="data.id" class="post mb-4">
    <el-card>
      <template v-slot:header>
        <div class="post-header flex items-center">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="Avatar"
            class="post-avatar w-10 h-10 rounded-full mr-3"
          />
          <div class="ml-2">
            <div class="font-semibold">{{ data.username }}</div>
            <div class="text-gray-500 text-sm">{{ data.date }}</div>
          </div>
        </div>
      </template>
      <div class="post-content">{{ data.content }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const datas = ref([
  {
    id: 1,
    username: "Account 1",
    content: "Hát hay okeee phết",
    date: "2024-11-07",
  },
  {
    id: 2,
    username: "Account 2",
    content: "Nhiệt tình, tròn vai",
    date: "2024-11-06",
  },
]);
</script>

<style></style>
