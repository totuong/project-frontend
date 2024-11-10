<template>
  <div class="profile-page container mx-auto bg-white p-4 rounded-lg shadow-lg">
    <Bio class="mb-5" />
    <el-row :gutter="24" class="flex-wrap">
      <el-col :span="8"> <BookInfo /></el-col>
      <el-col :span="16">
        <el-container>
          <Tab /> </el-container
      ></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Bio from "./Bio.vue";
import BookInfo from "./BookInfo.vue";
import Tab from "./Tab.vue";
</script>

<style lang="scss" scoped></style>
