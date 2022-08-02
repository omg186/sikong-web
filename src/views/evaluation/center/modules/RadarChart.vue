<template>
  <div ref="myChart" class="w-full h-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 主要
import * as echarts from 'echarts'
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
const myCharts = ref<any>()
export default defineComponent({
  name: 'RadarChart',
  setup() {
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
    const myCharts = ref<any>()
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption({
        title: {
          text: '身体素质综合发展分析',
          // textVerticalAlign: 'middle',
        },
        legend: {
          data: ['score'],
        },
        radar: {
          indicator: [
            { name: '身高标准体重', max: 5 },
            { name: '网球掷远', max: 5 },
            { name: '立定跳远', max: 5 },
            { name: '走平衡木', max: 5 },
            { name: '十米折返跑', max: 5 },
            { name: '坐立体前屈', max: 5 },
            { name: '双脚连续跳', max: 5 },
            { name: '身高', max: 5 },
          ],
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: 'score',
            type: 'radar',
            symbolSize: 16,
            lineStyle: {
              show: false,
              color: '#D1EDE5',
            },
            itemStyle: {
              color: '#2EE094',
              borderColor: '#fff',
              borderWidth: '2',
            },
            areaStyle: {
              color: '#C1F6DF',
              opacity: 0.5,
            },
            data: [
              {
                value: [3, 4, 3, 2, 3, 3, 4, 4],
                name: 'score',
              },
            ],
          },
        ],
      })
    }, 10)
    return {
      myChart,
    }
  },
})
</script>

<style lang="less" scoped></style>
