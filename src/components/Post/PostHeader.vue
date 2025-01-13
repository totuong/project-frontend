<template>
  <div class="post-header flex items-center mb-1">
    <el-popover
        placement="right"
        :width="360"
      >
      <template #reference>
        <router-link :to="`/user/profile/${data.profile.profileCode}`">
          <img
            :src="
              convertLocalPathToUrl(data.profile.avatar) ??
              (data.profile.role === 'ARTIST'
                ? '/default-artist-avatar.jpg'
                : '/logo.png')
            "
            class="w-14 h-14 rounded-full object-cover border-2 border-y-stone-200"
          />
        </router-link>
      </template>
        <Tag :data="data.profile" @show-form="onShow" />
      </el-popover>
  

    <div class="ml-4 flex flex-col">
      <router-link :to="`/user/profile/${data?.profile.profileCode}`">
        <div class="font-bold">{{ data?.profile?.fullName ?? `Tô Tường` }}</div>
      </router-link>
      <div class="flex flex-row items-center">
        <el-tooltip class="box-item" effect="dark" placement="bottom">
          <template #content>
            {{ data.createdAt }}
          </template>
          <div class="text-gray-500 text-sm mr-1">
            {{ formatTimeAgo(data.createdAt) }}
          </div>
        </el-tooltip>
        <Icon class="mt-1" icon="uiw:global" width="1em" height="1em" />
      </div>
    </div>
    <div class="absolute top-4 right-4 flex flex-row space-x-3">
      <el-dropdown @command="handleCommand">
        <el-icon size="large"><More /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="care"
              ><div class="flex flex-row space-x-3 items-center">
                <div class="w-3 items-start">
                  <Icon icon="gridicons:add" width="1.2em" height="1.2em" />
                </div>
                <div>Quan tâm</div>
              </div></el-dropdown-item
            >
            <el-dropdown-item command="hide"
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
            <el-dropdown-item command="report" divided
              ><div class="flex flex-row space-x-3 items-center">
                <div class="w-3 items-start">
                  <Icon icon="ic:sharp-report" width="1.2em" height="1.2em" />
                </div>
                <div>Báo cáo</div>
              </div></el-dropdown-item
            >
            <el-dropdown-item command="block" divided
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
      <el-popconfirm
        v-if="!detail"
        title="Are you sure to delete this?"
        @confirm="deletePost"
      >
        <template #reference>
          <button>
            <el-icon size="large"><Close /></el-icon>
          </button>
        </template>
      </el-popconfirm>
    </div>
    <BookForm ref="bookFormRef" />
  </div>
</template>

<script setup lang="ts">
import type { Post } from "@/types/modules/Post";
import { convertLocalPathToUrl } from "@/utils/image";
import { formatTimeAgo } from "@/utils/time";
import { Icon } from "@iconify/vue";
import useUserStore from "@/store/modules/user";
import { usePostHook } from "@/views/user/Home/hookPost";
import { ElMessage } from "element-plus";
const { onDeletePost } = usePostHook();
import Tag from "@/components/Tag/index.vue";
import BookForm from "@/components/BookForm/index.vue";
import { ref } from "vue";
const bookFormRef = ref<InstanceType<typeof BookForm>>();

// Hàm mở dialog
const onShow = () => {
  bookFormRef.value?.showModel("save", props.data.profile.id);
};

const props = withDefaults(
  defineProps<{
    data: Post;
    detail?: boolean;
  }>(),
  {
    detail: false, // Giá trị mặc định
  }
);
const emit = defineEmits(["onHidePost", "onDeletePost"]);
const deletePost = () => {
  if (props.data.profile.profileCode === useUserStore().profileCode) {
    onDeletePost(props.data.id);
    emit("onDeletePost");
    ElMessage.success("Xoá bài viết thành công");
  } else {
    emit("onHidePost");
    ElMessage.success("ẨN bài viết thành công");
  }
};
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case "care":
      ElMessage.success("Bạn đã quan tâm bài viết.");
      break;
    case "hide":
      emit("onHidePost");
      ElMessage.success("Ẩn bài viết thành công");
      break;
    case "unfriend":
      break;
    case "block":
      ElMessage.warning("Người dùng đã bị chặn.");
      break;
    default:
      ElMessage.error("Lệnh không hợp lệ.");
      break;
  }
};
</script>

<style></style>
