<template>
  <div
    ref="chartContainer"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import * as echarts from "echarts";
import resize from "./mixins/resize";  // Đảm bảo rằng bạn có `resize` mixin
import "echarts/theme/macarons";

// Props
const props = defineProps({
  className: {
    type: String,
    default: "chart-pie",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "340px",
  },
  name: {
    type: String,
    default: "",
  },
  values: {
    type: Array as PropType<{ key: string; value: number }[]>,
    default: () => [],
  },
});

// Refs
const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

// Hàm tính toán tỷ lệ phần trăm cho các mục
const calculatePercentages = (data: { key: string; value: number }[]) => {
  const total = data.reduce((sum, current) => sum + current.value, 0);
  return data
    .map((item) => ({
      ...item,
      percentage: ((item.value / total) * 100).toFixed(2),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
};

// Hàm khởi tạo biểu đồ
const initChart = () => {
  if (!chart && chartContainer.value) {
    chart = echarts.init(chartContainer.value, "macarons");
  }

  if (chart) {
    const columnValues = calculatePercentages(props.values).map((v) => ({
      name: v.key,
      value: v.value,
      percentage: v.percentage,
    }));

    chart.setOption({
      toolbox: {
        show: false,
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        textStyle: { color: "rgba(0, 0, 0, 0.6)" },
        trigger: "item",
        formatter(params: any) {
          let result = '<div style="text-align: left;">';
          result += `${params.name}<br>`;
          const value = `${Math.round(params.value).toLocaleString(
            "de-DE"
          )} VND`;
          result += `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:${params.color}"></span> ${value} <br>`;
          result += "</div>";
          return result;
        },
      },
      legend: {
        top: "bottom",
      },
      color: ["#ff6c77", "#91cb74", "#546fc6", "#fddc60"],
      series: [
        {
          name: props.name,
          type: "pie",

          radius: ["60%", "70%"],
          itemStyle: {
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            alignTo: "edge",
            formatter: (params: any) =>
              `{name|${params.name}}\n{time|${params.percent}%}`,
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: "#999",
              },
            },
          },
          data: columnValues,
          animationEasing: "cubicInOut",
          animationDuration: 2600,
        },
      ],
    });
  }
};

// Theo dõi sự thay đổi của `props.values` và cập nhật lại biểu đồ
watch(
  () => props.values,
  () => {
    nextTick(() => {
      if (chart) {
        const columnValues = calculatePercentages(props.values).map((v) => ({
          name: v.key,
          value: v.value,
          percentage: v.percentage,
        }));

        chart.setOption({
          series: [
            {
              data: columnValues,
            },
          ],
        });
      } else {
        initChart(); // Nếu biểu đồ chưa được khởi tạo, khởi tạo lại.
      }
    });
  },
  { deep: true }
);

// Khởi tạo biểu đồ khi component được mount
onMounted(() => {
  nextTick(() => {
    initChart();
  });
});

// Giải phóng tài nguyên khi component bị unmount
onBeforeUnmount(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
});
</script>

<style scoped></style>
