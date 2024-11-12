<template>
  <div class="">
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
    <el-row :gutter="24" class="relative flex flex-row justify-between mb-4">
      <div class="avatar-container ml-12 flex items-center absolute bottom-0">
        <img
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          alt="Avatar"
          class="avatar-image w-30 h-30 rounded-full border-4 border-white"
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
      <el-col :span="4" class="info-avatar ml-60 mt-4">
        <h2 class="username text-2xl font-semibold">Tô Tường</h2>
        <h2 class="follower text-xl font-medium opacity-50">149 followers</h2>
      </el-col>
      <el-col :span="10" class="flex justify-end content-center">
        <div class="w-full flex justify-end space-x-2">
          <el-button type="primary" icon="Edit" @click="onShow"
            >Chỉnh sửa thông tin cá nhân</el-button
          >

          <el-dropdown>
            <el-button
              type="primary"
              class="flex content-center justify-center items-center"
            >
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Video</el-dropdown-item>
                <el-dropdown-item>Ảnh</el-dropdown-item>
                <el-dropdown-item>Chọc</el-dropdown-item>
                <el-dropdown-item>Báo cáo</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <edit-info-form ref="editInfoFormRef" />

    <hr />
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
import { ref } from "vue";
import EditInfoForm from "./EditInfoForm.vue";

const editInfoFormRef = ref<InstanceType<typeof EditInfoForm>>();

// Hàm mở dialog
const onShow = () => {
  editInfoFormRef.value?.showModel(); // Gọi showModel() từ BookForm
};
</script>

<style scoped lang="scss">
.el-col-4 {
  right: 0;
}
.last-component {
  right: 0px;
}
</style>
