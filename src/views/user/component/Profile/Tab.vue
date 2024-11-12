<template>
  <el-card class="w-full">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="Posts" name="posts">
        <Posts />
      </el-tab-pane>

      <el-tab-pane label="Friends" name="friends">
        <Friend />
      </el-tab-pane>

      <el-tab-pane label="Review" name="reviews">
        <Reviews />
      </el-tab-pane>

      <el-tab-pane label="About" name="about">
        <About />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import Friend from "./Friend.vue";
import About from "./About.vue";
import Posts from "./Posts.vue";
import { ref } from "vue";
import Reviews from "./Reviews.vue";

const activeTab = ref("posts");

const handleTabClick = (tab: any) => {
  console.log("Selected tab:", tab.label);
};
</script>

<style></style>
