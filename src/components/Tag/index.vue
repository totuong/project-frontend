<template>
  <div>
    <div
      class="w-full h-[140px] relative bg-gradient-to-r from-purple-500 to-pink-500"
    >
      <div class="absolute top-[90px] left-4">
        <router-link :to="`/user/profile/${data.profileCode}`">
          <img
            :src="
              convertLocalPathToUrl(data.avatar)
                ? convertLocalPathToUrl(data.avatar)
                : data.role === 'ARTIST'
                ? '/default-artist-avatar.jpg'
                : '/logo.png'
            "
            alt="Avatar"
            class="w-20 h-20 rounded-full object-cover border-2 border-y-stone-200"
          />
        </router-link>
      </div>
    </div>
    <div class="mt-8">
      <div class="flex justify-between items-center">
        <div class="text-xl font-bold text-black">
          {{ data.fullName }}
        </div>
        <div v-if="data.role === 'ARTIST'">Nghệ sỹ</div>
      </div>
      <div v-if="data.role === 'ARTIST'" class="flex justify-center">
        <el-rate
          value="3"
          disabled
          show-score
          size="small"
          text-color="#ff9900"
          score-template="{value} points"
          class="m-2"
        />
      </div>

      <div class="grid grid-cols-3 gap-x-8 px-5 mt-4">
        <button
          v-if="data.role === 'ARTIST'"
          class="border w-20 r rounded-xl bg-[#f5f6f8]"
          @click="onShow"
        >
          <div class="flex flex-col">
            <div class="flex justify-center">
              <Icon
                icon="material-symbols-light:order-approve-sharp"
                width="24"
                height="24"
                style="color: #000"
              />
            </div>
            <div class="block text-xs text-black">Book</div>
          </div>
        </button>
        <button class="border w-20 r rounded-xl bg-[#f5f6f8]">
          <div class="flex flex-col">
            <div class="flex justify-center">
              <Icon
                icon="mingcute:message-4-fill"
                width="24"
                height="24"
                style="color: #000"
              />
            </div>
            <div class="block text-xs text-black">Message</div>
          </div>
        </button>
        <button class="border w-20 r rounded-xl bg-[#f5f6f8]">
          <div class="flex flex-col">
            <div class="flex justify-center">
              <Icon
                icon="fa-solid:user-friends"
                width="24"
                height="24"
                style="color: #000"
              />
            </div>
            <div class="block text-xs text-black">Add friend</div>
          </div>
        </button>
      </div>
      <el-row :gutter="24" v-if="data.address" class="mt-4">
        <el-col :span="10"> <div class="text-base">Địa chỉ</div></el-col>
        <el-col :span="14">
          <div class="text-base text-indigo-700">{{ data.address }}</div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-4">
        <el-col :span="10"> <div class="text-base">Số lượt book</div></el-col>
        <el-col :span="14">
          <div class="text-base text-indigo-700">
            {{ data.totalBook ?? 0 }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-4">
        <el-col :span="10"> <div class="text-base">Bạn bè</div></el-col>
        <el-col :span="14">
          <div class="text-base text-indigo-700">
            {{ data.totalFriend ?? 0 }}
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24" class="mt-4">
        <el-col :span="10"> <div class="text-base">Người theo dõi</div></el-col>
        <el-col :span="14">
          <div class="text-base text-indigo-700">
            {{ data.totalFollower ?? 0 }}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from "@/types/module/User";
import { convertLocalPathToUrl } from "@/utils/image";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  data: Profile;
}>();
const emit = defineEmits(["showForm"]);
// Hàm mở dialog
const onShow = () => {
  emit("showForm", props.data.id);
};
</script>

<style></style>
