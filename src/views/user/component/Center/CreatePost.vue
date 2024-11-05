<template>
  <div>
    <div class="create-post bg-slate-50 p-4 mb-4 shadow-md rounded">
      <div class="flex items-center mb-2">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          size="large"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          class="ml-2 w-full p-2 border rounded"
          @focus="showEditor = true"
        />
      </div>

      <el-dialog
        title="Create Post"
        v-model="showEditor"
        width="60%"
        @close="postContent = ''"
      >
        <quill-editor v-model="postContent" :options="editorOptions" />
        <template #footer>
          <div class="flex space-x-4">
            <el-upload
              action="/upload"
              list-type="picture"
              :multiple="true"
              :accept="acceptedFileTypes"
            >
              <el-button size="small" type="primary">Upload Image/Video</el-button>
            </el-upload>
            <el-button type="primary" @click="submitPost">Post</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill"; // sử dụng Quill Editor

const showEditor = ref(false);
const postContent = ref("<p>Your content here...</p>"); // Khởi tạo với nội dung mặc định
const acceptedFileTypes = "image/*,video/*";

const editorOptions = {
  debug: "info",
  modules: {
    toolbar: ["bold", "italic", "underline"],
  },
  placeholder: "Compose an epic...",
  theme: "snow",
};

function submitPost() {
  console.log("Post content:", postContent.value);
  // Thêm logic để xử lý việc gửi bài viết
}
</script>

<style lang="scss">
.create-post {
  .el-card {
    margin-top: 10px;
  }
  .quill-editor {
    min-height: 200px; // chiều cao tối thiểu cho editor
  }
}
</style>
