<template>
  <div class="offer-chart">
    <el-row :gutter="24" class="show-top">
      <el-col :span="12">
        <show-top-component :loading="loading" :data="data" />
      </el-col>
      <el-col :span="12">
        <show-top-component :loading="loading" :data="data" type="pie" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { ShowTop } from "@/types/modules/Order";
import { type PropType } from "vue";
import ShowTopComponent from "./ShowTop.vue";

defineProps({
  data: {
    type: Array as PropType<ShowTop[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
