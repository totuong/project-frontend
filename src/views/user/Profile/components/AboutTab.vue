<template>
  <div class="about-section mt-4">
    <p><strong>Tham gia vào :</strong> {{ profile.joinDay }}</p>
    <p v-if=" profile.role === 'ARTIST'"><strong>Rate:</strong> {{ profile.rate }}</p>
    <p>
      <strong>Vai trò:</strong>
      {{ profile.role === "ARTIST" ? "Nghệ sĩ tự do" : "Người dùng" }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { type Profile } from "@/types/modules/User"; // Đảm bảo kiểu Profile được import từ đúng file

defineProps({
  profile: {
    type: Object as PropType<Profile>, // Định nghĩa kiểu của prop
    required: true, // Yêu cầu bắt buộc prop này
  },
});
</script>

<style scoped>
.about-section {
  margin-top: 16px;
}
</style>
