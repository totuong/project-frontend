<script setup lang="ts">
import { useRouter } from "vue-router";
import noExist from "@/assets/status/404.svg?component";

defineOptions({
  name: "404"
});

const router = useRouter();
</script>

<template>
  <div class="flex justify-center items-center h-[640px]">
    <noExist />
    <div class="ml-12">
      <p
        class="font-medium text-4xl mb-4 dark:text-white"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100
          }
        }"
      >
        404
      </p>
      <p
        class="mb-4 text-gray-500"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        Trang không tồn tại. Quay về trang chủ
      </p>
      <el-button
        type="primary"
        @click="router.push('/')"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500
          }
        }"
      >
        Trang chủ
      </el-button>
    </div>
  </div>
</template>
