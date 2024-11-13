<template>
  <div>
    <el-popover
      v-model:visible="isNotificationVisible"
      width="300"
      trigger="click"
      placement="bottom-end"
    >
      <template #reference>
        <el-badge :value="3" class="item">
          <el-tooltip content="Thông báo" placement="bottom" effect="light">
            <el-button :icon="BellFilled" circle />
          </el-tooltip>
        </el-badge>
      </template>

      <div class="notification-content">
        <p
          class="notification-item"
          v-for="(notification, index) in notifications"
          :key="index"
        >
          {{ notification }}
        </p>
        <div v-if="notifications.length === 0" class="no-notifications">
          No new notifications
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { BellFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

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
