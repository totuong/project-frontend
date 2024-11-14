<template>
  <div>
 
        <el-badge  class="item">
          <el-tooltip content="Danh sách đơn" placement="bottom" effect="light">
            <el-button :icon="Memo" circle @click="handleOrderClick"/>
          </el-tooltip>
        </el-badge>


  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { Memo } from "@element-plus/icons-vue";
import { ref } from "vue";


const handleOrderClick = () => {
  router.push("/user/order"); // Điều hướng tới /user/profile
};
const isNotificationVisible = ref(false);

const notifications = ref([
  "You have a new message",
  "Your post received a new like",
  "Friend request from John Doe",
]);
</script>

<style>
.notification-content {
  max-height: 200px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
}

.no-notifications {
  padding: 10px;
  text-align: center;
  color: #888;
}
</style>
