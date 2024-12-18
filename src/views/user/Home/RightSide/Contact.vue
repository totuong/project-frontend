<template>
  <div class="flex-4 w-full">
    <div class="header flex items-center space-x-2 bg-gray-100 p-2 rounded">
      <Icon icon="bi:people-fill" class="text-black" />
      <span class="font-semibold">Liên hệ</span>
    </div>
    <div class="suggested-friends-list mt-2 px-1">
      <el-popover
        placement="right"
        :width="360"
        v-for="item in friends"
        :key="item.id"
      >
        <template #reference>
          <div
            class="profile-item flex items-center space-x-2 py-2 cursor-pointer"
          >
            <img
              :src="
                convertLocalPathToUrl(item.avatar) ??
                '/logo.png'
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
import { Icon } from "@iconify/vue";
import { useUserHome } from "../hook";
import { onBeforeMount, ref } from "vue";
import Tag from "@/components/Tag/index.vue";
import BookForm from "@/components/BookForm/index.vue";
import { convertLocalPathToUrl } from "@/utils/image";

const { onGetFriends, friends } = useUserHome();
const bookFormRef = ref<InstanceType<typeof BookForm>>();

// Hàm mở dialog
const onShow = (id: string) => {
  bookFormRef.value?.showModel("save", id);
};
onBeforeMount(() => {
  onGetFriends();
});
</script>
<style lang="scss"></style>
