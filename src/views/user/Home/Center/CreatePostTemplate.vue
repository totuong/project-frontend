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
        action="#"
        list-type="picture-card"
        :multiple="true"
        :accept="acceptedFileTypes"
        :file-list="imageFiles"
        :auto-upload="false"
        :on-change="handleFileChange"
        class="mr-3"
      >
        <el-button size="large" circle>
          <el-icon size="28px"><PictureFilled /></el-icon>
        </el-button>
      </el-upload>

      <!-- Hiển thị video nếu tệp là video -->
      <div
        v-for="(file, index) in videoFiles"
        :key="file.name"
        class="relative"
      >
        <video
          v-if="file.raw && file.raw.type && file.raw.type.startsWith('video/')"
          controls
          :src="file.url"
          class="uploaded-video h-full"
        ></video>
        <el-button
          text
          class="absolute top-0 right-0"
          @click="removeVideo(index)"
          ><el-icon><Close /></el-icon
        ></el-button>
      </div>
    </el-row>

    <template #footer>
      <div class="flex px-2.5">
        <el-button
          type="primary"
          :disabled="isSubmitting || !content.trim()"
          @click="submitPost"
          class="w-full"
        >
          {{ isSubmitting ? "Đang đăng..." : "Đăng bài" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose } from "vue";
import { PictureFilled } from "@element-plus/icons-vue";
import { ElMessage, type UploadFile } from "element-plus";
import { usePostHook } from "../hookPost";
import type { PostForm } from "@/types/apis/post";

const { onCreatePost } = usePostHook();
const showTemplate = ref(false);
const uploadedFiles = ref<any[]>([]); // Danh sách file đã upload
const imageFiles = ref<any[]>([]);
const videoFiles = ref<any[]>([]);

const acceptedFileTypes = "image/*,video/*";
const emit = defineEmits<{
  (event: "update:content", newContent: string): void;
  (event: "postSuccess", result: any): void;
}>();
const content = ref("");
const isSubmitting = ref(false); // Trạng thái đăng bài
const showModel = () => {
  showTemplate.value = true;
};
defineExpose({ showModel }); // Expose showModel để có thể gọi từ component cha

const updateContent = (newContent: string) => {
  content.value = newContent;
  emit("update:content", newContent); // Gửi sự thay đổi về component cha
};

const handleFileChange = (
  uploadFile: UploadFile,
  uploadFiles: UploadFile[]
) => {
  uploadedFiles.value = uploadFiles;
  imageFiles.value = []; // Clear image files

  // Phân loại ảnh và video
  uploadFiles.forEach((file: UploadFile) => {
    if (file.raw.type.startsWith("image/")) {
      imageFiles.value.push(file);
    } else if (file.raw.type.startsWith("video/")) {
      videoFiles.value.push(file);
    }
  });
};
const removeVideo = (index: number) => {
  videoFiles.value.splice(index, 1); // Xóa video khỏi danh sách
};
const submitPost = async () => {
  if (!content.value.trim()) {
    ElMessage.error("Nội dung bài viết không được để trống!");
    return;
  }

  isSubmitting.value = true;

  try {
    // Tạo dữ liệu và danh sách file
    const data: PostForm = {
      content: content.value,
    };
    const files = uploadedFiles.value.map((file) => ({
      name: file.name,
      url: file.url,
    })) as unknown as File[]; // Cần đảm bảo đây là danh sách `File`

    // Gọi `onCreatePost` với đúng tham số
    const result = await onCreatePost(data, files);

    ElMessage.success("Đăng bài thành công!");
    emit("postSuccess", result); // Gửi sự kiện cho component cha nếu cần

    content.value = "";
    emit("update:content", "");

    uploadedFiles.value = [];
    showTemplate.value = false;
  } catch (error) {
    console.error(error);
    ElMessage.error("Có lỗi xảy ra khi đăng bài!");
  } finally {
    isSubmitting.value = false;
  }
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

.uploaded-image {
  max-width: 200px;
  margin: 5px;
  border-radius: 8px;
}

.uploaded-video {
  max-width: 200px;
  border-radius: 8px;
}
</style>
