<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="friend in friends" :key="friend.id">
      <el-card>
        <img
          :src="friend.avatar"
          alt="Friend Avatar"
          class="friend-avatar w-full rounded-md"
        />
        <div class="friend-name text-center mt-2">{{ friend.name }}</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const friends = ref([
  {
    id: 1,
    name: "Friend 1",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
  {
    id: 2,
    name: "Friend 2",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
]);
</script>
<style></style>
