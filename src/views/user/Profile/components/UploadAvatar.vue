<template>
  <el-dialog v-model="showModel" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">Upload avatar</div>
      <hr class="header-divider" />
    </template>
    <div>
      <el-upload
        class="avatar-uploader"
        ref="uploadRef"
        :action="uploadAvatarAction"
        :headers="headers"
        name="avatar"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        method="PUT"
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-change="handleAvatarChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <div class="w-full items-center flex justify-center">
        <el-button type="primary" @click="handleSubmitUpload"> Save </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
import { env } from "@/utils/env";
import { formatToken, getToken } from "@/utils/auth";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, genFileId } from "element-plus";
import type { UploadProps, UploadRawFile } from "element-plus";
// Base URL server

const uploadAvatarAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-avatar";

const headers = {
  Authorization: formatToken(getToken() ?? ""),
};
const uploadRef = ref();
const dialogVisible = ref(false);
const dialogImageUrl = ref<string | null>(null); // URL ảnh hiển thị trong dialog
const imageUrl = ref("");
const showModel = ref(false);
const onShowModel = () => {
  showModel.value = true;
};
defineExpose({ onShowModel });

const emit = defineEmits(["onUpdate"]);

const handleSuccess = () => {
  ElMessage.success({
    message: "Import Success",
  });
  showModel.value = false;
  emit("onUpdate");
};

const handleSubmitUpload = () => {
  uploadRef.value.submit();
};

const handleAvatarChange: UploadProps["onChange"] = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
const handleExceed: UploadProps["onExceed"] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover; /* Đảm bảo ảnh không bị méo */
  border-radius: 6px; /* Tuỳ chỉnh góc bo nếu cần */
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
