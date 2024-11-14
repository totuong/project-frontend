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
    <div class="post-media mb-2 max-h-screen">
      <!-- Example image/video -->
      <img
        :src="data.media"
        alt="Post media"
        class="w-full rounded object-cover max-h-[600px] cursor-pointer"
        @click="openImageDialog(data.media)"
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
    <el-dialog
      v-model="isDialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <img :src="selectedImage" alt="Full view" class="w-full h-auto" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const isDialogVisible = ref(false);

// Biến lưu trữ ảnh đã chọn
const selectedImage = ref<string | undefined>(undefined); // Sử dụng undefined thay cho null

const openImageDialog = (imageUrl: string) => {
  selectedImage.value = imageUrl;
  console.log(
    "🚀 ~ openImageDialog ~ selectedImage.value:",
    selectedImage.value
  );
  isDialogVisible.value = true;
  console.log(
    "🚀 ~ openImageDialog ~ isDialogVisible.value:",
    isDialogVisible.value
  );
};

// Hàm đóng dialog
const handleClose = () => {
  isDialogVisible.value = false;
  selectedImage.value = undefined;
};
</script>
<style lang="scss"></style>
