<template>
    <div
      class="post bg-slate-50 p-4 mb-4 shadow-md rounded relative w-full h-auto"
    >
      <div class="post-header flex items-center mb-2">
        <el-avatar :src="data.avatar" size="large" />
        <div class="ml-2">
          <div class="font-semibold">{{ data.userName }}</div>
          <div class="text-gray-500 text-sm">{{ data.timestamp }}</div>
        </div>
      </div>
      <div class="post-content mb-2">
        {{ data.content }}
      </div>
      <div class="post-media mb-2">
        <!-- Example image/video -->
        <img
          :src="data.media"
          alt="Post media"
          class="w-full rounded object-cover h-72"
        />
      </div>
      <div class="post-stats flex justify-between mb-2 text-gray-500 text-sm">
        <div>{{ data.likes }} Likes</div>
        <div>{{ data.comments.length }} Comments</div>
      </div>
      <div class="post-actions flex justify-between mb-2">
        <el-button icon="Pointer">Like</el-button>
        <el-button icon="Comment">Comment</el-button>
        <el-button icon="Share">Share</el-button>
      </div>
      <div class="post-comments bg-gray-100 p-4 rounded">
        <div
          v-for="(comment, idx) in data.comments"
          :key="idx"
          class="comment-item mb-2"
        >
          <div class="flex items-center mb-1">
            <el-avatar :src="comment.avatar" size="small" />
            <div class="ml-2">
              <div class="font-semibold">{{ comment.userName }}</div>
              <div class="text-gray-500 text-xs">{{ comment.timestamp }}</div>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
      
    </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss"></style>
