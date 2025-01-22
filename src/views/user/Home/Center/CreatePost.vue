<template>
  <div>
    <div class="create-post bg-slate-50 p-4 mb-4 shadow-md rounded">
      <div class="flex items-center">
        <button >
          <el-avatar
            :src="convertLocalPathToUrl(profile.avatar)??(profile.role==='USER'?'/logo.png':'/default-artist-avatar.jpg')"
            size="large"
          />
        </button>

        <div class="input-container w-full rounded-2xl h-14 border ml-2">
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
        <el-button  :icon="PictureFilled" @click="open2">Media</el-button>
        <el-button  :icon="Calendar">Event</el-button>
        <el-button  :icon="Location">Location</el-button>
      </div>
    </div>
    <!-- Reference tới CreatePostTemplate -->
    <CreatePostTemplate
      ref="createPostTemplateRef"
      :profile="profile"
      :content="content"
      @update:content="updateContent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CreatePostTemplate from "./CreatePostTemplate.vue";
import { Calendar, Location, PictureFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

import { useProfile } from "../../Profile/hookProfile";
import useUserStore from "@/store/modules/user";
import { onBeforeMount } from "vue";
import { convertLocalPathToUrl } from "@/utils/image";


const {onGetProfile,profile}=useProfile();
onBeforeMount(()=>{
  onGetProfile(useUserStore().profileCode);
})
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
const open2 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
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
