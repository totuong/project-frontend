<template>
  <div>
    <div class="header flex items-center space-x-2">
      <el-icon size="18px"><Notification /></el-icon>
      <span class="font-semibold">Notification</span>
    </div>

    <el-scrollbar>
      <div class="flex items-center space-x-2">
        <span>Hôm nay là sinh nhật của Duy Anh</span>
        <Icon icon="openmoji:cake" />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { Notification } from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";
</script>
<style lang="scss" scoped>
.header {
  background-color: #f5f5f5; /* Light gray background */
  padding: 10px 20px; /* Padding for some breathing room */
}

.el-scrollbar {
  height: 150px; /* Adjust height to fit within the parent div */
  padding-left: 10px;
  margin-top: 10px; /* Margin between header and scrollbar area */
}

.el-scrollbar > div {
  display: flex; /* Flexbox for alignment */
  align-items: center; /* Vertically center items */
  padding: 8px 0; /* Vertical padding for each item */
  border-bottom: 1px solid #f0f0f0; /* Subtle bottom border between items */
}

.el-scrollbar > div:last-child {
  border-bottom: none; /* Remove bottom border for the last item */
}

.icon {
  margin-right: 10px; /* Space between icon and text */
}

.font-semibold {
  font-size: 18px; /* Slightly larger font size */
  color: #333; /* Darker font color */
}
</style>
