<template>
  <div class="post-header flex items-center mb-1">
    <el-popover
      :width="300"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <router-link :to="`/user/profile/${data.profileCode}`">
          <img
            :src="
              convertLocalPathToUrl(data.avatar) ?? data.role === 'ARTIST'
                ? '/default-artist-avatar.jpg'
                : '/logo.png'
            "
            class="w-14 h-14 rounded-full object-cover border-2 border-y-stone-200"
          />
        </router-link>
      </template>
      <template #default>
        <div
          class="demo-rich-conent"
          style="display: flex; gap: 16px; flex-direction: column"
        >
          <!-- <Tag :data="data.user" @show-form="onShow" /> -->
        </div>
      </template>
    </el-popover>

    <div class="ml-4 flex flex-col">
      <router-link :to="`/user/profile/${data?.profileCode}`">
        <div class="font-bold">{{ data?.user?.fullName ?? `Tô Tường` }}</div>
      </router-link>
      <div class="flex flex-row items-center">
        <el-tooltip class="box-item" effect="dark" placement="bottom">
          <template #content>
            {{ data.createtAt }}
          </template>
          <div class="text-gray-500 text-sm mr-1">
            <!-- {{ formatTimeAgo(data?.createtAt) ?? `2 giờ trước` }} -->
            {{ data?.createtAt ?? `2 giờ trước` }}
          </div>
        </el-tooltip>
        <Icon class="mt-1" icon="uiw:global" width="1em" height="1em" />
      </div>
    </div>
    <div class="absolute top-4 right-4 flex flex-row space-x-3">
      <el-dropdown>
        <el-icon size="large"><More /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              ><div class="flex flex-row space-x-3 items-center">
                <div class="w-3 items-start">
                  <Icon icon="gridicons:add" width="1.2em" height="1.2em" />
                </div>
                <div>Quan tâm</div>
              </div></el-dropdown-item
            >
            <el-dropdown-item
              ><div class="flex flex-row space-x-3 items-center">
                <div class="w-3 items-start">
                  <Icon
                    icon="carbon:close-filled"
                    width="1.2em"
                    height="1.2em"
                  />
                </div>
                <div>Ẩn bài viết</div>
              </div></el-dropdown-item
            >
            <el-dropdown-item divided
              ><div class="flex flex-row space-x-3 items-center">
                <div class="w-3 items-start">
                  <Icon icon="ic:sharp-report" width="1.2em" height="1.2em" />
                </div>
                <div>Báo cáo</div>
              </div></el-dropdown-item
            >
            <el-dropdown-item divided
              ><div
                class="flex flex-row space-x-3 items-centerr justify-between"
              >
                <div class="w-3 items-start">
                  <Icon
                    icon="solar:user-block-rounded-bold"
                    width="1.2em"
                    height="1.2em"
                  />
                </div>
                <div>Chặn người này</div>
              </div></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <button>
        <el-icon size="large"><Close /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertLocalPathToUrl } from "@/utils/image";
import { formatTimeAgo } from "@/utils/time";
import { Icon } from "@iconify/vue";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
