<template>
  <div class=" flex content-center justify-center">
    <!-- <el-main class="flex-auto"> -->
      <!-- <el-scrollbar class="h-full"> -->
        <div class="mt-4 min-w-[350px] w-4/5 flex-col ">
          <CreatePost/>
          <!-- Posts Section -->
          <PostMain />
        </div>
      <!-- </el-scrollbar> -->
    <!-- </el-main> -->
  </div>
</template>
<script setup lang="ts">
import CreatePost from "./CreatePost.vue";
import PostMain from "./PostMain.vue";

</script>
<style lang="scss"></style>
