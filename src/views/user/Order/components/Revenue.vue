<template>
  <div class="offer-chart">
    <el-row :gutter="24" class="show-top">
      <el-col :span="12">
        <show-top :loading="loading" />
      </el-col>
      <el-col :span="12">
        <show-top :loading="loading" type="pie" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ShowTop from "./ShowTop.vue";

// State để điều khiển loading
const loading = ref(true);

// Khi component được mounted, bạn có thể bắt đầu quá trình tải dữ liệu (hoặc có thể bắt đầu khi tab được click)
onMounted(() => {
  setTimeout(() => {
    loading.value = false; // Sau 2 giây, loading sẽ biến mất
  }, 2000); // Giả sử sau 2 giây sẽ tải xong
});
</script>

<style scoped>

</style>
