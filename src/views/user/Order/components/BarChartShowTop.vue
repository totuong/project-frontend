<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, defineProps } from "vue";
import * as echarts from "echarts";
import { numberFormatter } from "@/utils/filter";  // Giả sử bạn đã có filter `numberFormatter`
import "echarts/theme/macarons";  // ECharts theme

const props = defineProps({
  className: {
    type: String,
    default: "chart-show-top",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "340px",
  },
  values: {
    type: Array as PropType<{ key: string; value: number }[]>,
    default: () => [],
  },
  lines: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});

const chart = ref<echarts.ECharts | null>(null);
const labels = ref<string[]>([]);
const columnValues = ref<number[]>([]);

const generateData = () => {
  labels.value = props.values.map((v) => v.key);
  columnValues.value = props.values.map((v) => v.value);
};

const updateChart = () => {
  if (!chart.value) return;

  chart.value.setOption({
    tooltip: {
      backgroundColor: "rgb(255,255,255)",
      textStyle: {
        color: "rgba(0, 0, 0, 0.6)",
      },
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
      formatter(params: any) {
        let result = '<div style="text-align: left;">';
        params.forEach((param: any, index: any) => {
          if (index === 0) {
            result += `${param.name}<br>`;
          }
          const value =
            param.seriesName === "Revenue"
              ? `${Math.round(param.value).toLocaleString("de-DE")} VND`
              : param.value;
          const color = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color: ${param.color}"></span>`;
          result += `${color} ${param.seriesName}: ${value} <br>`;
        });
        result += "</div>";
        return result;
      },
    },
    legend: {
      data: ["Revenue"],
      bottom: "auto",
    },
    grid: {
      top: 30,
      left: "2%",
      right: "2%",
      bottom: "2%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: labels.value,
        inverse: true,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "rgb(102, 102, 102)",
          formatter(value: number) {
            return numberFormatter(value);
          },
        },
        splitArea: {
          show: false,
        },
      },
     
    ],
    color: ["#546ec6", "#fac859"],
    series: [
      {
        name: "Revenue",
        type: "bar",
        stack: "vistors",
        barWidth: "60%",
        data: columnValues.value.map((value) => ({
          value,
          label: {
            position: value < 100000000 ? "top" : "inside",
          },
        })),
        showBackground: false,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.1)",
        },
        animationDuration: 100,
        label: {
          show: true,
          valueAnimation: true,
          formatter(params: any) {
            return numberFormatter(params.value);
          },
        },
      },
    
    ],
  });
};

const initChart = () => {
  const chartDom = document.querySelector(`.${props.className}`) as HTMLElement;
  if (!chartDom) {
    console.error("Chart container element not found");
    return;
  }

  if (chart.value) {
    chart.value.dispose();
  }

  chart.value = echarts.init(chartDom, "macarons");
  updateChart();
};

watch(
  () => props.values,
  () => {
    nextTick(() => {
      generateData();
      if (chart.value) {
        updateChart();
      } else {
        initChart();
      }
    });
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => {
    generateData();
    initChart();
  });
});

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose();
    chart.value = null;
  }
});
</script>

<style scoped></style>
