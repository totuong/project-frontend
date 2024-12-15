<template>
  <div>
    <div
      class="profile-page container mx-auto bg-white p-4 rounded-lg shadow-lg"
    >
      <Bio :data="profile" class="mb-5" @on-update="onGetProfile(userStore.profileCode)" />
      <el-row :gutter="24" class="flex-wrap">
        <el-col :span="8">
          <InfoTable :data="profile" @on-update="onGetProfile(userStore.profileCode)"
        /></el-col>
        <el-col :span="16">
          <el-container> <Tab :data="profile" /> </el-container
        ></el-col>
      </el-row>
    </div>
    <ChatBox />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import Bio from "./components/Bio.vue";
import InfoTable from "./components/InfoTable.vue";
import Tab from "./components/Tab.vue";
import ChatBox from "@/components/ChatBox/index.vue";
import { useProfile } from "./hookProfile";
import { useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
const route = useRoute(); // Lấy thông tin route hiện tại
const code = Array.isArray(route.params.id)
  ? route.params.id[0]
  : route.params.id;

const { profile, onGetProfile } = useProfile();

onBeforeMount(() => {
  if (code) {
    onGetProfile(code); // Gọi hàm lấy thông tin profile
  } else {
    onGetProfile(userStore.profileCode);
  }
});
watch(
  () => route.params.id,
  (newId) => {
    const validId = Array.isArray(newId) ? newId[0] : newId;
    onGetProfile(validId);
  },
  { immediate: true } 
);
</script>

<style lang="scss" scoped></style>
