<template>
  <div>
    <el-badge class="item">
      <el-tooltip content="Danh sách đơn" placement="bottom" effect="light">
        <el-button :icon="Memo" circle @click="handleOrderClick" />
      </el-tooltip>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { Memo } from "@element-plus/icons-vue";

const handleOrderClick = () => {
  router.push("/user/order"); // Điều hướng tới /user/profile
};
</script>

<style></style>
