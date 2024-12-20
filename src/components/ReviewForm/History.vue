<template>
  <div>
    <el-scrollbar v-if="data.length > 0" height="380">
      <div v-for="review in data" :key="review.id" class="post mb-4">
        <el-card>
          <template v-slot:header>
            <div class="post-header flex items-center">
              <img
                :src="
                  review.user.avatar
                    ? convertLocalPathToUrl(review.user.avatar)
                    : '/logo.png'
                "
                alt="Avatar"
                class="post-avatar w-10 h-10 rounded-full mr-3"
              />
              <div class="ml-2">
                <div class="font-semibold">{{ review.user.fullName }}</div>
                <el-rate v-model="review.rate"  disabled show-score  score-template="{value} points"/>
              </div>
            </div>
          </template>
          <div class="relative">
            <div class="post-content">{{ review.comment }}</div>
            <div class="text-gray-500 text-sm absolute bottom-[-16px] right-0">
              {{ formatTimeAgo(review.updatedAt) }}
            </div>
          </div>
        </el-card>
      </div>
    </el-scrollbar>
    <div v-else class="text-red-600 mt-4">Chưa có đánh giá nào</div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from "@/types/modules/Review";
import { convertLocalPathToUrl } from "@/utils/image";
import { formatTimeAgo } from "@/utils/time";
import { useReviewHook } from "@/views/user/Profile/hookReview";
import { dayjs } from "element-plus";
import { ref, type PropType } from "vue";

const props = defineProps({
  data: {
    type: Array as PropType<Review[]>, // Xác định kiểu cho data
    default: () => [], // Giá trị mặc định là một mảng rỗng
  },
});

const formatTime = (datetime: any) => {
  return dayjs(datetime).format("HH:mm, DD/MM/YYYY");
};
const schedules = ref([
  {
    id: "29d978a6-9216-4875-b7e0-0abdd4c76c7d",
    artistId: "7c3c47bb-6b09-469d-84a8-17553ff02dc0",
    bookerId: "20dec2b2-231f-4b29-8e02-7aff953387ed",
    from: "2024-12-25T19:00:00",
    to: "2024-12-25T20:00:00",
    price: 400000.0,
    note: "Có bonus nếu làm tốt",
    address: "Sân vận động Mỹ Đình",
    status: "confirmed",
    reasonReject: "undefined",
    booker: null,
    artist: null,
    review: null,
    createdAt: "2024-12-16T21:35:37.236898",
    updatedAt: "2024-12-21T10:06:08.072751",
    totalTime: "01h00",
  },
  // Có thể thêm các lịch trình khác
]);
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
