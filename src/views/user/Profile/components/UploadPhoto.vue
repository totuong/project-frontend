<template>
  <el-dialog v-model="showModel" :draggable="true" :show-close="false" overflow>
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">Upload avatar</div>
      <hr class="header-divider" />
    </template>
    <div>
      <el-upload
        ref="uploadRef"
        :action="uploadAvatarAction"
        :headers="headers"
        name="avatar"
        list-type="picture-card"
        :limit="1"
        method="PUT"
        :auto-upload="false"
        :on-success="handleSuccess"
        :multiple="false"
        :preview-file="previewFile"
      >
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <el-icon><zoom-in /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <el-icon><Download /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <el-icon><Delete /></el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>
      <div class="w-full items-center flex justify-center">
        <el-button type="primary" @click="handleSubmitUpload"> Save </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive } from "vue";
import { env } from "@/utils/env";
import { formatToken, getToken } from "@/utils/auth";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

import { ElMessage, type UploadFile } from "element-plus";
// Base URL server

const uploadAvatarAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-avatar";
const uploadCoverPhotoAction =
  env.VITE_APP_BASE_API + "/v1/user/profile/upload-cover-photo";
const headers = {
  Authorization: formatToken(getToken() ?? ""),
};
const uploadRef = ref()
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const showModel = ref(false);

const onShowModel = () => {
  showModel.value = true;
};
defineExpose({ onShowModel });

const handleSuccess = () => {
  uploadRef.value.submit()
  ElMessage.success({
    message: "Upload Success",
  });
  showModel.value = false;
};
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  console.log(
    "🚀 ~ handlePictureCardPreview ~ dialogImageUrl.value :",
    dialogImageUrl.value
  );
  dialogVisible.value = true;
};

const handleDownload = (file: UploadFile) => {
  console.log(file);
};

const handleSubmitUpload = () => {
  uploadRef.value.submit();
};
const previewFile = (file: File) => {
  return URL.createObjectURL(file); // Trả về blob URL
};
const closeDialog = () => {
  if (dialogImageUrl.value) {
    URL.revokeObjectURL(dialogImageUrl.value); // Giải phóng URL blob
    dialogImageUrl.value = "";
  }
  dialogVisible.value = false;
};

const handleRemove = (file: UploadFile) => {
  console.log(file);
};
</script>

<style></style>
