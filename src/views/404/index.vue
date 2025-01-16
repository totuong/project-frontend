<script setup lang="ts">
import { useRouter } from "vue-router";
import image from "@/assets/404_notfound.png";

defineOptions({
  name: "404",
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <img :src="image" />
    <div class="ml-12">
      <p
        v-motion
        class="font-medium text-4xl mb-4 dark:text-white"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 80,
          },
        }"
      >
        404
      </p>
      <p
        v-motion
        class="mb-4 text-gray-500"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 120,
          },
        }"
      >
        Xin lỗi, trang bạn truy cập không tồn tại
      </p>
      <el-button
        v-motion
        type="primary"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 160,
          },
        }"
        @click="router.push('/')"
      >
      Trở về trang chủ
      </el-button>
    </div>
  </div>
</template>
