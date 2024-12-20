<template>
  <el-dialog
    v-model="visible"
    width="50%"
    :before-close="handleClose"
    draggable
    top="20px"
  >
    <template #header>
      <div class="title pb-4 font-bold text-2xl text-center">
        Bài viết của {{ data?.profile?.fullName ?? "" }}
      </div>
      <hr class="header-divider" />
    </template>
    <el-scrollbar height="600px" class="relative">
      <PostComponent :data="data" :detail="true" />
      <PostComment :data="data" />
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostComponent from "./index.vue";
import PostComment from "./PostComment.vue";
import type { Post } from "@/types/modules/Post";
const props = defineProps<{
  data: Post;
}>();

const visible = ref(false);
const handleClose = () => {
  visible.value = false;
};
const showModel = () => {
  visible.value = true;
};
defineExpose({ showModel });
</script>

<style scoped lang="scss">
::v-deep(.el-dialog) {
  padding: 0;
}
</style>
