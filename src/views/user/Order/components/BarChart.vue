<template>
  <div :class="className" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, watch, nextTick, shallowRef, PropType } from 'vue'
import * as echarts from 'echarts'
import resize from './mixins/resize'
import { numberFormatter } from '@/utils/filter' 
import 'echarts/theme/macarons' // echarts theme

const animationDuration = 100

export default defineComponent({
  name: 'BarChartAmOkr',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart-show-top-am-okr'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '340px'
    },
    values: {
      type: Array as PropType<{ key: string; value: number; target: number }[]>,
      default: () => []
    }
  },
  setup(props) {
    const chartAmOkr = shallowRef<echarts.ECharts | null>(null)
    const labels = shallowRef<string[]>([])
    const columnValues = shallowRef<number[]>([])
    const columnTargets = shallowRef<number[]>([])

    const generateData = () => {
      labels.value = props.values.map((v) => v.key)
      columnValues.value = props.values.map((v) => v.value)
      columnTargets.value = props.values.map((v) => v.target)
    }

    const updateChart = () => {
      if (!chartAmOkr.value) {
        return
      }
      chartAmOkr.value.setOption({
        tooltip: {
          backgroundColor: 'rgb(255,255,255)',
          textStyle: {
            color: 'rgba(0, 0, 0, 0.6)'
          },
          trigger: 'axis',
       
          formatter(params: any) {
            let result = '<div style="text-align: left;">'
            params.forEach((param: any, index: any) => {
              if (index === 0) {
                result += `${param.name}<br>`
              }
              const value = `${Math.round(param.value).toLocaleString('de-DE')} VND`
              const color = `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color: ${param.color}"></span>`
              result += `${color} ${param.seriesName}: ${value} <br>`
            })
            result += '</div>'
            return result
          }
        },
        legend: {
          data: ['Revenue'],
          bottom: 'auto'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: [
          {
            type: 'category',
            data: labels.value,
            axisLabel: {
              color: 'rgb(102, 102, 102)',
              fontStyle: 'italic', 
            }
          }
        ],
        xAxis: [
          {
            boundaryGap: [0, 0.02],
            type: 'value',

            axisLabel: {
              color: 'rgb(102, 102, 102)',
              formatter(value: number) {
                return numberFormatter(value)
              }
            },
            splitArea: {
              show: false
            }
          }
        ],
        color: ['#546ec6', '#fac859'],
        series: [
          {
            name: 'Revenue',
            type: 'bar',
            stack: 'vistors',
            data: columnValues.value,
            showBackground: false,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.1)'
            },
            animationDuration,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true,
              formatter(params: any) {
                return numberFormatter(params.value)
              }
            }
          },
         
        ]
      })
    }

    const initChart = () => {
      const chartDom = document.querySelector(`.${props.className}`) as HTMLElement
      if (!chartDom) {
        console.error('Chart container element not found')
        return
      }

      if (chartAmOkr.value) {
        chartAmOkr.value.dispose()
      }

      chartAmOkr.value = echarts.init(chartDom, 'macarons')
      updateChart()
    }

    watch(
      () => props.values,
      () => {
        nextTick(() => {
          generateData()
          if (chartAmOkr.value) {
            updateChart()
          } else {
            initChart()
          }
        })
      },
      { deep: true }
    )

    onMounted(() => {
      nextTick(() => {
        generateData()
        initChart()
      })
    })

    onBeforeUnmount(() => {
      if (chartAmOkr.value) {
        chartAmOkr.value.dispose()
        chartAmOkr.value = null
      }
    })

    return {}
  }
})
</script>

<style scoped></style>
