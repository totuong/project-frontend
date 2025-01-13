<template>
  <el-card class="w-full">
    <el-tabs v-model="activeTab" @tab-change="handleChangeTab">
      <el-tab-pane label="Posts" name="posts">
        <Posts />
      </el-tab-pane>

      <el-tab-pane label="Friends" name="friends">
        <Friend :data="friends" />
      </el-tab-pane>

      <el-tab-pane v-if="data.role === 'ARTIST'" label="Review" name="reviews">
        <Reviews :data="reviews" />
      </el-tab-pane>

      <el-tab-pane label="About" name="about">
        <AboutTab :profile="data" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup lang="ts">
import Friend from "./FriendTab.vue";
import AboutTab from "./AboutTab.vue";
import Posts from "./Posts.vue";
import { ref, watch, type PropType } from "vue";
import Reviews from "./ReviewTab.vue";
import { defaultProfile, type Profile } from "@/types/modules/User";
import type { TabPaneName } from "element-plus";

import { useReviewHook } from "../hookReview";
import { useUserHome } from "@/views/user/Home/hook";

const { onGetReviews, reviews } = useReviewHook();
const { friends, onGetFriendsByProfileId } = useUserHome();

const activeTab = ref("posts");
const props = defineProps({
  data: {
    type: Object as PropType<Profile>, // Định nghĩa kiểu của prop
    required: true, // Yêu cầu bắt buộc prop này
    default: defaultProfile,
  },
});

const handleChangeTab = (name: TabPaneName) => {
  if (name == "reviews") {
    onGetReviews(props.data.id);
    return;
  }
  if (name == "post") {
    return;
  }
  if (name == "friends") {
    onGetFriendsByProfileId(props.data.id);
    return;
  }
};
watch(
  () => props.data,
  (newData) => {
    if (activeTab.value === "reviews") {
      onGetReviews(newData.id);
    }
    if (activeTab.value === "friends") {
      onGetFriendsByProfileId(newData.id);
    }
  },
  { immediate: true, deep: true }
);
</script>

<style></style>
