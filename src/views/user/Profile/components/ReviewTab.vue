<template>
  <div>
    <el-scrollbar v-if="data.length > 0">
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
                class="post-avatar w-12 h-12 object-cover rounded-full mr-3"
              />
              <div class="ml-2">
                <div class="font-semibold">{{ review.user.fullName }}</div>
                <el-rate
                  v-model="review.rate"
                  disabled
                  show-score
                  size="small"
                  score-template="{value} points"
                />
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
import { ref, type PropType } from "vue";

defineProps({
  data: {
    type: Array as PropType<Review[]>, // Xác định kiểu cho data
    default: () => [], // Giá trị mặc định là một mảng rỗng
  },
});
</script>

<style scoped lang="scss">
::v-deep(.el-card__header) {
  padding: 10px;
}
</style>
