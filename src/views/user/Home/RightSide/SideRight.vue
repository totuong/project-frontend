<template>
  <div>
    <el-aside class="h-full border-l" >
   
      <div class="flex-1 w-full">
        <div class="header flex items-center space-x-2 bg-gray-100 p-2 rounded">
          <Icon icon="mdi:account-multiple-plus" class="text-black" />
          <span class="font-semibold">Gợi ý kết bạn</span>
        </div>
        <div class="suggested-friends-list mt-2">
          <div class="suggested-friend-item flex items-center space-x-2 py-2">
            <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
            <span>Hoàng Nam</span>
          </div>
          <div class="suggested-friend-item flex items-center space-x-2 py-2">
            <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
            <span>Phương Anh</span>
          </div>
        </div>
      </div>
      <div class="flex-4 w-full">
        <div class="header flex items-center space-x-2 bg-gray-100 p-2 rounded">
          <Icon icon="bi:people-fill" class="text-black" />
          <span class="font-semibold">Liên hệ</span>
        </div>
        <div class="contacts-list mt-2">
          <div class="contact-item flex items-center space-x-2 py-2">
            <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
            <span>Diệu Linh</span>
          </div>
          <div class="contact-item flex items-center space-x-2 py-2">
            <Icon icon="carbon:user-avatar-filled-alt" class="text-black w-8 h-8" />
            <span>Minh Tuấn</span>
          </div>
        </div>
      </div>
    </el-aside>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<style lang="scss">

.contact-item, .suggested-friend-item {
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Rounded corners */
  padding: 8px; /* Padding inside the item */
  margin-bottom: 4px; /* Space between items */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}
.el-aside{
  max-width: 400px;
  min-width: 360px;
}
</style>
