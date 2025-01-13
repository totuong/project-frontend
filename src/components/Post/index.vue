<template>
  <div
    class="post bg-slate-50 px-4 py-2 mb-4 shadow-md rounded relative w-full h-auto"
  >
    <div v-if="!isDelete">
      <PostHeader
        :data="data"
        :detail="detail"
        @on-delete-post="onDelelePost"
        @on-hide-post="onHidePost"
      />
      <PostContent :data="data" />

      <!-- Thống kê -->
      <div class="post-stats flex justify-between mb-2 text-gray-500 text-sm">
        <div>{{ data.likePeople?.length || 0 }} Likes</div>
        <div>{{ data.comments?.length || 0 }} Comments</div>
      </div>

      <!-- Actions -->
      <div class="post-actions flex justify-between mb-2">
        <el-button @click="onLike(data.id)" class="space-x-1">
          <Icon icon="mdi:thumb-up" class="mr-1" @click="onLike" /> Like
        </el-button>
        <el-button class="space-x-1" @click="onShowDetail">
          <Icon icon="mdi:comment" class="mr-1" /> Comment
        </el-button>
        <el-button class="space-x-1">
          <Icon icon="mdi:share" class="mr-1" /> Share
        </el-button>
      </div>

      <!-- Comments -->
      <PostDetail
        ref="postDetailRef"
        :data="data"
        @on-update="loadPage"
      ></PostDetail>
    </div>
    <div v-else class="replace-post">
      <div>Bài viết đã bị xoá</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostHeader from "./PostHeader.vue";
import PostContent from "./PostContent.vue";
import { Icon } from "@iconify/vue";
import type { Post } from "@/types/modules/Post";
import PostDetail from "./PostDetail.vue";

import { usePostHook } from "@/views/user/Home/hookPost";

const { onLike } = usePostHook();
const postDetailRef = ref<InstanceType<typeof PostDetail>>();
const bookFormRef = ref<InstanceType<typeof BookForm>>();
const emit = defineEmits(["onUpdate"]);
const isDelete=ref(false)
const props = withDefaults(
  defineProps<{
    data: Post;
    detail?: boolean;
  }>(),
  {
    detail: false,
  }
);

const onShowDetail = () => {
  if (props.detail) return;
  postDetailRef.value?.showModel();
};
const loadPage = () => {
  emit("onUpdate");
};
const onDelelePost=()=>{
  isDelete.value=!isDelete.value
}
const onHidePost=()=>{
  isDelete.value=!isDelete.value
}
</script>
