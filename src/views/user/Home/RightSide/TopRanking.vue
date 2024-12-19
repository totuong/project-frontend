<template>
  <div class="flex-1 w-full">
    <div class="header flex items-center space-x-2 bg-gray-100 p-2 rounded">
      <Icon icon="ph:ranking-duotone" width="1.2em" height="1.2em"  />
      <span class="font-semibold">Top nghệ sĩ</span>
    </div>
    <div class="suggested-friends-list mt-2 px-1">
      <el-popover
        placement="right"
        :width="360"
        v-for="item in topArtists"
        :key="item.id"
      >
        <template #reference>
          <div
            class="profile-item flex items-center space-x-2 py-2 cursor-pointer"
          >
            <img
              :src="
                convertLocalPathToUrl(item.avatar) ??
                '/default-artist-avatar.jpg'
              "
              alt="Avatar"
              class="w-8 h-8 rounded-full object-cover"
            />
            <span>{{ item.fullName }}</span>
          </div>
        </template>
        <Tag :data="item" @show-form="onShow" />
      </el-popover>
      <BookForm ref="bookFormRef" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useUserHome } from "../hook";
import { Icon } from "@iconify/vue";
import Tag from "@/components/Tag/index.vue";
import BookForm from "@/components/BookForm/index.vue";
import { convertLocalPathToUrl } from "@/utils/image";

const { onGetTopArtists, topArtists } = useUserHome();

const bookFormRef = ref<InstanceType<typeof BookForm>>();

// Hàm mở dialog
const onShow = (id: string) => {
  bookFormRef.value?.showModel("save", id);
};

onBeforeMount(() => {
  onGetTopArtists();
});
</script>
<style lang="scss" scoped></style>
