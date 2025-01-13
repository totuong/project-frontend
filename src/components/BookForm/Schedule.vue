<template>
  <div>
    <el-scrollbar v-if="scheduledOrders.length > 0" height="380">
      <el-card
        v-for="schedule in scheduledOrders"
        :key="schedule.id"
        shadow="never"
        class="card-item"
      >
        <div class="schedule-time">
          <div class="from-to">Từ: {{ formatTime(schedule.from) }}</div>
          <div class="from-to">Đến: {{ formatTime(schedule.to) }}</div>
        </div>
      </el-card>
    </el-scrollbar>
    <div v-else class="text-blue-700 mt-4">Nghệ sỹ không có lịch trình gì sắp tới</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  artistId: string;
}>();

import { useOrderHook } from "@/views/user/Order/hook";
import { dayjs } from "element-plus";
import { ref, watch } from "vue";

const { onGetScheduledOrders, scheduledOrders } = useOrderHook();

const formatTime = (datetime: any) => {
  return dayjs(datetime).format("HH:mm, DD/MM/YYYY");
};

watch(
  () => props.artistId,
  (newId, oldId) => {
    if (newId !== oldId) {
      onGetScheduledOrders(newId);
    }
  },
  { immediate: true } // Gọi ngay khi component được mount
);
</script>

<style scoped>
.card-item {
  margin-bottom: 10px;
}

.schedule-time {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.from-to {
  font-size: 14px;
  color: #333;
}
</style>
