<template>
  <div>
    <div class="create-post bg-slate-50 p-4 mb-4 shadow-md rounded">
      <div class="flex items-center">
        <button>
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            size="large"
          />
        </button>

        <div class="input-container w-full rounded-2xl h-14 border">
          <input
            type="text"
            ref="inputRef"
            v-model="content"
            placeholder="  What's on your mind?"
            @focus="onShow"
            class="w-full h-full rounded-2xl px-4"
          />
        </div>
      </div>
      <hr class="mt-4" />
      <div class="share-box mt-4 flex justify-around">
        <el-button  :icon="PictureFilled">Media</el-button>
        <el-button  :icon="Calendar">Event</el-button>
        <el-button  :icon="Location">Location</el-button>
      </div>
    </div>
    <!-- Reference tới CreatePostTemplate -->
    <CreatePostTemplate
      ref="createPostTemplateRef"
      :content="content"
      @update:content="updateContent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CreatePostTemplate from "./CreatePostTemplate.vue";
import { Calendar, Location, PictureFilled } from "@element-plus/icons-vue";
const inputRef = ref<HTMLInputElement | null>(null); // ref cho input
const createPostTemplateRef = ref<InstanceType<typeof CreatePostTemplate>>();
const content = ref("");

// Hàm mở dialog
const onShow = () => {
  createPostTemplateRef.value?.showModel(); // Gọi showModel() từ CreatePostTemplate
  if (inputRef.value) {
    inputRef.value.blur(); // Lấy focus khỏi input ngay lập tức
  }
};
const updateContent = (newContent: string) => {
  content.value = newContent;
};
</script>

<style lang="scss">
.create-post {
  .el-card {
    margin-top: 10px;
  }
  .quill-editor {
    min-height: 200px;
  }
}
</style>
