<template>
  <el-dialog
    v-model="showTemplate"
    :draggable="true"
    :show-close="false"
    overflow
  >
    <template #header>
      <div class="title pb-2 font-bold text-2xl text-center">Tạo bài viết</div>
      <hr class="header-divider" />
    </template>
    <div class="post-header flex items-center mb-2">
      <el-avatar
        src="https://chontruong.edu.vn/wp-content/uploads/2024/09/avatar-facebook-3f7584h.webp"
        size="large"
      />
      <div class="ml-2">
        <div class="font-semibold">Tô Tường</div>
        <div
          class="text-gray-500 text-sm border-red-800 border rounded-md px-1"
        >
          Chỉ mình tôi
        </div>
      </div>
    </div>
    <el-input
      class="w-full mb-2"
      v-model="content"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="Please input"
      @input="updateContent"
    />
    <el-row>
      <el-upload
        action="/upload"
        list-type="picture"
        :multiple="true"
        :accept="acceptedFileTypes"
        class="mr-3"
      >
        <el-button size="large" circle>
          <el-icon size="28px"><PictureFilled /></el-icon>
        </el-button>
      </el-upload>
      <el-button size="large" circle>
        <el-icon size="28px"><Calendar /></el-icon>
      </el-button>
      <el-button size="large" circle>
        <el-icon size="28px"><Plus /></el-icon>
      </el-button>
    </el-row>

    <template #footer>
      <div class="flex px-2.5">
        <el-button type="primary" @click="submitPost" class="w-full"
          >Post</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose } from "vue";
import { Icon } from "@iconify/vue";
import { PictureFilled } from "@element-plus/icons-vue";
const showTemplate = ref(false);
const acceptedFileTypes = "image/*,video/*";
const emit = defineEmits<{
  (event: "update:content", newContent: string): void;
}>();
const content = ref("");
// Định nghĩa hàm showModel để được gọi từ component cha
const showModel = () => {
  showTemplate.value = true;
};
defineExpose({ showModel }); // Expose showModel để có thể gọi từ component cha

const submitPost = () => {
  showTemplate.value = false;
};
const updateContent = (newContent: string) => {
  content.value = newContent;
  emit("update:content", newContent); // Gửi sự thay đổi về component cha
};
</script>

<style lang="scss" scoped>
.header-divider {
  margin-top: 8px;
  border: none;
  padding: 0px;
  margin-right: 0px;
  border-top: 1px solid #ccc;
  width: 100%;
}
</style>
