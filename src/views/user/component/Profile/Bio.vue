<template>
  <div>
    <div class="cover-photo relative">
      <img
        src="../../../../../public/taylor-swift-inc.webp"
        alt="Cover Photo"
        class="cover-image w-full h-[400px] object-cover rounded-t-lg"
      />
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Chỉnh sửa ảnh bìa"
        placement="top"
      >
        <el-button
          :icon="Edit"
          class="edit-cover absolute bottom-4 right-4"
          circle
        />
      </el-tooltip>
    </div>
    <div class="flex flex-row">
        <div
          class="avatar-container ml-6 flex items-center absolute"
        >
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt="Avatar"
            class="avatar-image w-30  h-30 rounded-full border-4 border-white"
          />
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Chỉnh sửa ảnh đại diện"
            placement="top"
          >
            <el-button
              :icon="Edit"
              class="edit-cover absolute bottom-[25px] right-[10px]"
              circle
            />
          </el-tooltip>
        </div>
        <div class="info-avatar">
          <h2 class="username text-2xl font-semibold">Tô Tường</h2>
          <h2 class="follower text-xl font-medium opacity-50 ">3 followers</h2>
        </div>
        <div class="flex flex-row ">
          <el-button type="primary" :icon="Edit">Chỉnh sửa thông tin cá nhân</el-button>
          <el-button type="primary" :icon="Edit">Chỉnh sửa thông tin cá nhân</el-button>
        </div>
    </div>

    <div class="user-info mt-16 text-center">
      <div class="flex gap-2 justify-center">
        <el-tag type="primary">Ca hát</el-tag>
        <el-tag type="success">Ảo thuật</el-tag>
        <el-tag type="info">Nhảy múa</el-tag>
      </div>
      <p class="bio text-gray-600">Bằng</p>
      <div class="actions mt-4 space-x-2">
        <el-button type="primary" size="small">Add Friend</el-button>
        <el-button size="small">Message</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
</script>

<style scoped lang="scss">
.el-col-4{
  right: 0;
}

</style>
