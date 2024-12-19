<template>
  <el-card :loading="loading" class="box-card">
    <pie-chart
      v-if="hasData && attributionSource === 'pie'"
      :values="showTopValue"
    />
    <bar-chart-show-top
      v-if="hasData && attributionSource === 'bar'"
      :values="showTopValue"
    />
    <el-empty v-if="!hasData" description="No data" />
  </el-card>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  watch,
  defineProps,
  onBeforeMount,
  onUnmounted,
} from "vue";
import PieChart from "@/views/user/Order/components/PieChart.vue";
import { useOrderHook } from "../hook";
import BarChartShowTop from "./BarChartShowTop.vue";
import SelectSource from "./SelectSource.vue";

const props = defineProps({
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

import { useFilterOrderStore } from "@/store/modules/filterOrder";
const { onGetShowTop, showTopValue } = useOrderHook();

const filterOrderStore = useFilterOrderStore();

watch(filterOrderStore, () => {
  onGetShowTop();
});


showTopValue.value = [
      { key: "2024-12-01", value: 200000 },
      { key: "2024-12-02", value: 250000 },
      { key: "2024-12-03", value: 240000 },
      { key: "2024-12-04", value: 300000 },
     { key: "2024-12-05", value: 700000 },
    ];
const values = ref([]);

const showValues = ref([]);
const sources = ref([
  { label: "BD", value: "bd" },
  { label: "App Name", value: "app_name" },
]);
const attributions = [
  { label: "Conversion Success", value: "conversion_success" },
];
const attributionSource = ref(props.type);
const loading = ref(true);
const sourceValue = ref(props.source);
const attributionValue = ref(props.attribution);
const numberAttributions = ref(5);
const updateAttributionShow = () => {
  numberAttributions.value = numberAttributions.value === 5 ? 15 : 5;
};
const getValues = () => {
  loading.value = true;
  setTimeout(() => {}, 500);
  values.value = showTopValue.value.sort((a: any, b: any) => b.value - a.value);
  loading.value = false;
};
const genData = () => {
  const sortedData = values.value;
  const valuesData = sortedData.slice(0, numberAttributions.value);
  if (values.value.length >= numberAttributions.value) {
    const othersValue = values.value
      .slice(numberAttributions.value)
      .reduce((a, b) => a + Number(b.value), 0);
    valuesData.push({ key: "Others", value: othersValue });
  }
  showValues.value = valuesData;
};
const hasData = computed(() => {
  return values.value.length > 0;
});

watch([values, numberAttributions], () => genData(), { deep: true });
let interval: ReturnType<typeof setInterval>;
onBeforeMount(() => {
  // Start interval to call getValues every 0.5 seconds
  interval = setInterval(() => {
    getValues();
  }, 100); // 0.5 seconds interval
});

onUnmounted(() => {
  // Clear interval when component is destroyed
  if (interval) {
    clearInterval(interval);
  }
});
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
