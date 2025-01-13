<template>
  <div class="container mx-auto mt-4">
    <!-- Grid layout -->
    <div class="grid grid-cols-4 gap-4">
      <!-- Lặp qua danh sách bạn bè -->
      <el-card v-for="friend in data" :key="friend.id">
        <div class="flex flex-row relative">
          <el-popover :width="360" placement="left">
            <template #reference>
              <router-link :to="`/user/profile/${friend?.profileCode}`">
                <div class="flex flex-col items-center">
                  <img
                    :src="convertLocalPathToUrl(friend.avatar) ?? '/logo.png'"
                    :alt="friend.fullName"
                    class="w-16 h-16 object-cover rounded-full mb-2"
                  />
                  <p class="text-center font-medium">{{ friend.fullName }}</p>
                </div></router-link
              ></template
            >
            <Tag :data="friend" />
          </el-popover>
          <div class="absolute top-0 right-0 flex flex-row space-x-3">
            <el-dropdown>
              <el-icon size="large"><More /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><div class="flex flex-row space-x-3 items-center">
                      <div>Hủy kết bạn</div>
                    </div></el-dropdown-item
                  >
                  <el-dropdown-item divided
                    ><div
                      class="flex flex-row space-x-3 items-centerr justify-between"
                    >
                      <div>Chặn người này</div>
                    </div></el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div></div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import Tag from "@/components/Tag/index.vue";
import type { Profile } from "@/types/modules/User";
import { convertLocalPathToUrl } from "@/utils/image";
defineProps({
  data: {
    type: Array as PropType<Profile[]>, // Xác định kiểu cho data
    default: () => [], // Giá trị mặc định là một mảng rỗng
  },
});
</script>
<style></style>
