<template>
  <div class="px-25px text-[#1F311F] text-xs">
    <div class="flex items-center pt-20px justify-between">
      <div class="text-base font-medium">身高标准体重</div>
      <div class="text-xs text-[#83867E]">单位：公斤</div>
    </div>
    <div ref="myChart" class="w-full h-200px"></div>
    <div
      class="flex w-243px h-41px border-1 border-[rgba(226,229,228,0.5000)] rounded-40"
    >
      <div>
        <span class="font-medium">上次结果：18.9s</span>
        <span class="text-[#A5A8B4] ml-10px"> 3分</span>
      </div>
      <div class="flex">
        <div>
          <img src="@/assets/images/evaluation/down.png" alt="" />
        </div>
        <span class="text-[#F4274E] font-bold"> 下降</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 主要
import * as echarts from 'echarts'
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
const myCharts = ref<any>()
export default defineComponent({
  setup() {
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
    const myCharts = ref<any>()
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption({
        series: [
          {
            type: 'gauge',
            // center: ['50%', '55%'],
            radius: '56%',
            startAngle: 200,
            endAngle: -20,
            min: 0,
            splitNumber: 5,
            max: 20,
            itemStyle: {
              color: '#2EE094',
              shadowColor: 'rgba(46,224,148,0.5000)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              width: 20,
            },
            pointer: {
              show: false,
            },
            //仪表盘
            axisLine: {
              roundCap: false,
              lineStyle: {
                width: 1,
                color: [[1, '#D2D4DE']],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },

            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
              },
            ],
          },
          {
            type: 'gauge',
            startAngle: 200,
            endAngle: -20,
            radius: '90%',
            min: 0,
            splitNumber: 5,
            max: 20,
            itemStyle: {
              color: '#2EE094',
              shadowColor: '#2EE094',
              shadowBlur: 40,
              shadowOffsetX: 15,
              shadowOffsetY: 0,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 8,
            },
            pointer: {
              show: false,
            },
            //仪表盘
            axisLine: {
              // show: false,
              roundCap: true,
              lineStyle: {
                width: 8,
                color: [[1, '#D2D4DE']],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              //刻度线样式
              length: 8,
              distance: 0,
              lineStyle: {
                width: 1,
                color: '#BEBDC2',
              },
            },
            axisLabel: {
              distance: 15,
              color: '#AAAAAC',
              fontSize: 14,
            },
            title: {
              offsetCenter: [0, '-5%'],
              fontSize: 14,
              fontWeight: 'bold',
            },
            detail: {
              fontSize: 56,
              offsetCenter: [0, '30%'],
              valueAnimation: true,
              // color: 'auto',
              formatter: function (value) {
                console.log(value)
                return '{value|' + value + '}{unit|分}'
              },
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: '#2EE094',
                },
                unit: {
                  fontSize: 16,
                  color: '#1F311F',
                  fontWeight: 'bold',
                  padding: [0, 0, 0, 5],
                },
              },
            },
            data: [
              {
                value: 3,
                name: '18.1kg(偏瘦)',
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
