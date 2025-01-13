<template>
  <div>
    <div class="mb-4">
      <el-button
        type="primary"
        size="small"
        @click="toggleShowBusyDays"
        class="mb-2"
      >
        {{
          showBusyDaysOnly ? "Hiển thị tất cả ngày" : "Chỉ hiển thị ngày bận"
        }}
      </el-button>
    </div>
    <!-- Calendar -->
    <el-calendar v-if="!showBusyDaysOnly" v-model="selectedDate">
      <!-- Slot tùy chỉnh cách hiển thị từng ô ngày -->
      <template #date-cell="{ data }">
        <div
          :class="[
            'p-2 transition duration-300 flex flex-row justify-between h-full custom-date-cell',
            hasSchedulesForDate(data.date) ? 'bg-red-100 text-red-600' : '',
            data.isCurrent ? 'border border-blue-500' : '',
          ]"
        >
          <!-- Hiển thị số ngày -->
          <div class="font-bold">{{ data.date.getDate() }}</div>

          <!-- Hiển thị tag nếu có lịch -->
          <div
            v-if="hasSchedulesForDate(data.date)"
            class="space-y-1 flex flex-col"
          >
            <el-popover
              v-for="schedule in getSchedulesForDate(data.date)"
              :key="schedule.id"
              placement="right"
              :width="360"
            >
              <template #reference>
                <el-tag type="primary">
                  {{ formatTime(schedule.from) }} -
                  {{ formatTime(schedule.to) }}
                </el-tag>
              </template>
              <div>Địa điểm: {{ schedule.address }}</div>
              <div>Giá: {{ formatCurrency(schedule.price) }}</div>
              <div>Ghi chú: {{ schedule.note }}</div>
            </el-popover>
          </div>
        </div>
      </template>
    </el-calendar>

    <!-- Hiển thị danh sách ngày bận -->
    <div v-else>
      <div v-if="busyDays.length > 0" class="grid grid-cols-1 gap-4">
        <el-card
          v-for="busyDay in busyDays"
          :key="busyDay.date"
          class="border rounded-md shadow-md"
        >
          <!-- Ngày -->
          <h3 class="text-lg font-bold text-blue-500">{{ busyDay.date }}</h3>
          <ul>
            <!-- Lịch trình -->
            <li
              v-for="schedule in busyDay.schedules"
              :key="schedule.id"
              class="text-sm text-gray-700 mb-2"
            >
              <div>
                <strong>Thời gian:</strong> {{ formatTime(schedule.from) }} -
                {{ formatTime(schedule.to) }}
              </div>
              <div><strong>Địa điểm:</strong> {{ schedule.address }}</div>
              <div>
                <strong>Người đặt:</strong> {{ schedule.booker.fullName }}
              </div>
              <div>
                <strong>Số điện thoại:</strong> {{ schedule.booker.mobile }}
              </div>
              <div><strong>Ghi chú:</strong> {{ schedule.note }}</div>
            </li>
          </ul>
        </el-card>
      </div>
      <div v-else class="text-center text-gray-500">Không có ngày bận.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from "@/types/modules/Order";
import { ref, computed, type PropType } from "vue";

// Định nghĩa props
const props = defineProps({
  data: {
    type: Array as PropType<Order[]>,
    default: () => [],
  },
});

// Biến trạng thái
const selectedDate = ref(new Date());
const showBusyDaysOnly = ref(false);

// Hàm định dạng thời gian và tiền tệ
const formatTime = (time: string) =>
  new Date(time).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

// Lấy lịch trình theo ngày
const getSchedulesForDate = (date: Date | undefined) => {
  if (!date) return [];
  const formattedDate = date.toISOString().split("T")[0];
  return props.data.filter(
    (schedule) => schedule.from.split("T")[0] === formattedDate
  );
};

// Kiểm tra ngày có lịch trình không
const hasSchedulesForDate = (date: Date | undefined) =>
  getSchedulesForDate(date).length > 0;

// Tính toán danh sách ngày bận
const busyDays = computed(() => {
  const busyMap: Record<string, Order[]> = {};
  props.data.forEach((order) => {
    const date = order.from.split("T")[0];
    if (!busyMap[date]) busyMap[date] = [];
    busyMap[date].push(order);
  });
  return Object.entries(busyMap).map(([date, schedules]) => ({
    date,
    schedules,
  }));
});

// Chuyển đổi trạng thái hiển thị
const toggleShowBusyDays = () => {
  showBusyDaysOnly.value = !showBusyDaysOnly.value;
};
</script>

<style scoped>
::v-deep(.el-calendar-table .el-calendar-day) {
  padding: 0px;
  border: 0px;
}
.custom-date-cell:hover {
  cursor: default;
  background-color: unset;
}
::v-deep(.el-calendar-table td.is-selected) {
  background-color: unset;
}
</style>
