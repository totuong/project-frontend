<template>
  <div class="">
    <div class="cover-photo relative">
      <img
        :src="coverPhotoUrl"
        alt="Cover Photo"
        class="cover-image w-full h-[400px] object-cover rounded-t-lg"
      />
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Chỉnh sửa ảnh bìa"
        placement="top"
      >
        <div class="absolute bottom-4 right-4">
          <el-upload
            ref="upload2"
            :action="uploadCoverPhotoAction"
            :headers="headers"
            name="cover-photo"
            :limit="1"
            method="PUT"
            :auto-upload="true"
            :on-success="handlePhotoSuccess"
            :show-file-list="false"
            :multiple="false"
          >
            <template #trigger>
              <el-button :icon="Edit" class="edit-cover" circle />
            </template>
          </el-upload>
        </div>
      </el-tooltip>
    </div>
    <el-row :gutter="24" class="relative flex flex-row justify-between mb-4">
      <div class="avatar-container ml-12 flex items-center bottom-0 absolute">
        <div class="avatar-image">
          <img
            :src="avatarUrl"
            alt="Avatar"
            class="avatar-image w-44 h-44 rounded-full border-4 border-white"
          />
        </div>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Chỉnh sửa ảnh đại diện"
          placement="top"
        >
          <el-upload
            ref="upload"
            :action="uploadAvatarAction"
            :headers="headers"
            :limit="1"
            method="PUT"
            name="avatar"
            :auto-upload="true"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :multiple="false"
          >
            <template #trigger>
              <el-button
                :icon="Edit"
                class="edit-cover absolute bottom-[25px] right-[10px]"
                circle
              />
            </template>
          </el-upload>
        </el-tooltip>
      </div>
      <el-col :span="4" class="info-avatar ml-60 mt-6 mb-6">
        <h2 class="username text-3xl font-semibold">Tô Tường</h2>
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
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
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
import { ArrowDown, Edit } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import EditInfoForm from "./EditInfoForm.vue";
import { getToken, formatToken } from "@/utils/auth";
import { env } from "@/utils/env";

// Props
const props = defineProps({
  data: Object,
});

// Base URL server
const baseUrl = "http://localhost:3000";

// URL upload
const uploadAvatarAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-avatar";
const uploadCoverPhotoAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-cover-photo";
const headers = {
  Authorization: formatToken(getToken() ?? ""),
};

// Chuyển đổi đường dẫn cục bộ thành URL hợp lệ
const convertLocalPathToUrl = (path: string) => {
  if (!path) return null;
  const relativePath = path
    .replace(/\\/g, "/") // Thay backslash bằng slash
    .split("project-frontend")[1]; // Lấy phần sau "project-frontend"
  return relativePath ? `${baseUrl}${relativePath}` : null;
};

// Profile data
const profileData = computed(() => ({
  coverPhoto: convertLocalPathToUrl(props.data?.coverPhoto),
  avatar: convertLocalPathToUrl(props.data?.avatar),
  name: props.data?.fullName || "Người dùng",
  followers: props.data?.followersCount || 0,
}));

// Bind URL từ computed
const avatarUrl = computed(() => profileData.value.avatar);
const coverPhotoUrl = computed(() => profileData.value.coverPhoto);

// Xử lý khi upload thành công
const handleAvatarSuccess = (response: any) => {
  if (response.success) props.data.avatar = response?.data;
};
const handlePhotoSuccess = (response: any) => {
  if (response.success) props.data.coverPhoto = response?.data;
};

// Form chỉnh sửa
const editInfoFormRef = ref<InstanceType<typeof EditInfoForm>>();
const onShow = () => {
  editInfoFormRef.value?.showModel();
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
