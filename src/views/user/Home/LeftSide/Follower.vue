<template>
    <div >
      <div class="header flex items-center space-x-2 bg-gray-100 p-4 border-b">
        <Icon icon="mingcute:user-follow-fill" class="text-black" />
        <span class="font-semibold">Follower</span>
      </div>
      <el-scrollbar class="p-2">
        <div class="user flex items-center space-x-2">
          <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
          <span>Diệu Linh</span>
        </div>
        <div class="user flex items-center space-x-2 py-2">
          <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
          <span>Diệu Linh</span>
        </div>
        <div class="user flex items-center space-x-2 py-2">
          <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
          <span>Diệu Linh</span>
        </div>
        <div class="user flex items-center space-x-2 py-2">
          <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
          <span>Diệu Linh</span>
        </div>
        <div class="user flex items-center space-x-2 py-2">
          <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
          <span>Diệu Linh</span>
        </div>
      </el-scrollbar>
    </div>
  </template>
  
<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
<style lang="scss" scoped>
.header {
  background-color: #f5f5f5; /* Light gray background */
  padding: 10px 20px; /* Padding for some breathing room */
}

</style>
