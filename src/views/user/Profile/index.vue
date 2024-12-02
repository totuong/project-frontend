<template>
  <div>
    <div
      class="profile-page container mx-auto bg-white p-4 rounded-lg shadow-lg"
    >
      <Bio :data="profile" class="mb-5" />
      <el-row :gutter="24" class="flex-wrap">
        <el-col :span="8"> <BookInfo :data="profile" /></el-col>
        <el-col :span="16">
          <el-container> <Tab :data="profile" /> </el-container
        ></el-col>
      </el-row>
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import Bio from "./components/Bio.vue";
import BookInfo from "./components/BookInfo.vue";
import Tab from "./components/Tab.vue";
import ChatBox from "@/components/ChatBox/index.vue";
import { useProfile } from "./hookProfile";

const { profile, onGetProfile } = useProfile();

onBeforeMount(() => {
  onGetProfile();
});
</script>

<style lang="scss" scoped></style>
