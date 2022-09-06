<template>
  <div
    :class="`border-[${chartsList.processColor}] border-opacity-25 border-3 h-490px rounded-16px`"
  >
    <div class="px-25px text-[#1F311F] text-xs">
      <div class="flex items-center pt-20px justify-between">
        <div class="text-base font-medium">{{ chartsList.title }}</div>
        <div class="text-xs text-[#83867E]">单位：{{ chartsList.unit }}</div>
      </div>
      <div ref="myChart" class="w-full h-200px"></div>
      <div
        class="flex justify-between h-41px border-1 border-[rgba(226,229,228,0.5000)] rounded-40 pl-14px pr-20px"
      >
        <div class="flex items-center">
          <span class="font-medium">上次结果：{{ chartsList.lastValue }}</span>
          <span class="text-[#A5A8B4] ml-10px">
            {{ chartsList.lastScore }}分</span
          >
        </div>
        <div class="flex items-center" v-if="chartsList.upTrend">
          <img
            src="@/assets/images/evaluation/up.png"
            class="h-12px w-5px mr-10px"
            alt=""
          />
          <span class="text-[#2EE094] font-bold"> 上升</span>
        </div>
        <div class="flex items-center" v-else>
          <img
            src="@/assets/images/evaluation/down.png"
            class="h-12px w-5px mr-10px"
            alt=""
          />
          <span class="text-[#F4274E] font-bold"> 下降</span>
        </div>
      </div>

      <div class="text-sm font-bold mt-17px">相关身体素质和分析</div>
      <div
        class="h-25px leading-25px bg-[#F5F7FF] text-[#A5A8B4] mt-5px"
        v-for="tag in chartsList.tag"
      >
        {{ tag }}
      </div>
      <div class="text-[#6C766E] mt-12px">
        得分
        <span class="font-bold text-[#1F311F]">3</span>
        分，身高<span class="font-bold text-[#1F311F]">117</span>cm，<span
          class="font-bold text-[#1F311F]"
          >18.5</span
        >kg-<span class="font-bold text-[#1F311F]">229</span>
        kg属于正常范围，和上次 正常
        结果相比有一定的退步，在接下来时间里，要增加运动和饮食
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 主要
import * as echarts from 'echarts'
import { Data } from 'ant-design-vue/lib/_util/type'
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
const myCharts = ref<any>()

export default defineComponent({
  props: {
    chartsList: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { chartsList } = props
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
    const myCharts = ref<any>()
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption({
        series: [
          {
            type: 'gauge',
            // center: ['50%', '65%'],
            // radius: '60%',
            radius: '98%',
            center: ['50%', '65%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            splitNumber: 5,
            max: 20,
            progress: {
              show: true,
              width: 40,
              itemStyle: {
                color: chartsList.processColor,
                opacity: 0.1,
              },
            },
            pointer: {
              show: false,
            },
            //仪表盘
            axisLine: {
              roundCap: false,
              lineStyle: {
                width: 20,
                color: [[1, '#fff']],
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
                value: 3,
              },
            ],
          },
          {
            type: 'gauge',
            radius: '60%',
            center: ['50%', '65%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            splitNumber: 5,
            max: 20,
            pointer: {
              show: false,
            },
            //仪表盘
            axisLine: {
              roundCap: false,
              lineStyle: {
                width: 1,
                color: [[1, '#F0F2F1']],
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
            radius: '100%',
            center: ['50%', '65%'],
            min: 0,
            splitNumber: 5,
            max: 20,
            itemStyle: {
              color: chartsList.processColor,
              shadowColor: chartsList.processColor,
              shadowBlur: 10,
              shadowOffsetX: 0,
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
              //中间显示的字18.1kj
              offsetCenter: [0, '-18%'],
              fontSize: 14,
              fontWeight: 'bold',
            },
            detail: {
              fontSize: 56,
              fontFamily: 'D-DIN',
              offsetCenter: [0, '21%'], //偏移 xy
              valueAnimation: true,
              // color: 'auto',
              formatter: function (value) {
                return '{value|' + value + '}{unit|分}'
              },
              rich: {
                value: {
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: chartsList.processColor,
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
                name: chartsList.value,
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
