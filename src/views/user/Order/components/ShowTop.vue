<template>
  <el-card :loading="loading" class="box-card">
    <pie-chart v-if="hasData && attributionSource === 'pie'" :values="values" />
    <bar-chart-show-top
      v-if="hasData && attributionSource === 'bar'"
      :values="values"
    />
    <el-empty v-if="!hasData" description="No data" />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineProps, type PropType } from "vue";
import PieChart from "@/views/user/Order/components/PieChart.vue";
import BarChartShowTop from "./BarChartShowTop.vue";

const props = defineProps({
  data: {
    type: Array as PropType<ShowTop[]>,
    default: () => [],
  },
  source: {
    type: String,
    default: "publisher_id",
  },
  attribution: {
    type: String,
    default: "revenue_estimate",
  },
  type: {
    type: String,
    default: "bar",
  },
});

import type { ShowTop } from "@/types/modules/Order";

const values = ref<ShowTop[]>([{ key: "2024-12-03", value: 240000 }]);
const attributionSource = ref(props.type);
const loading = ref(true);

const hasData = computed(() => {
  return values.value.length > 0;
});

watch(
  () => props.data,
  (newData) => {
    // Sắp xếp theo key từ bé đến lớn
    values.value = [...newData].sort((a, b) => b.key.localeCompare(a.key));
  },
  { immediate: true } // Chạy ngay khi component được mount
);

</script>

<style scoped lang="scss">
.box-header {
  font-size: 13px;
  display: flex;
  align-items: center;
}

.el-card__header {
  padding: 8px 12px;
}

.setting-source {
  float: right;
  transform: rotate(90deg);
  margin-top: 8px;
}

.label {
  display: flex;
  width: 100%;
}

.label-show {
  display: inline-block;
  margin-right: 6px;
  align-content: center;
}

.label-by {
  display: inline-block;
  margin-left: 6px;
  margin-right: 6px;
  align-content: center;
}

.action {
  margin-left: auto;
  float: right;
}

.show-attribution {
  margin-left: 16px;
}
</style>
