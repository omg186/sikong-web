<template>
  <div ref="myChart" class="w-full h-full"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 主要
import * as echarts from 'echarts'
const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
const myCharts = ref<any>()
export default defineComponent({
  setup() {
    const arrList = ref([
      '3/8',
      '6/8',
      '2/8',
      '6/8',
      '4/6',
      '6/8',
      '2/10',
      '6/8',
      '4/8',
      '6/6',
      '8/10',
      '6/8',
    ])
    const valList = ref([
      3 / 8,
      6 / 8,
      2 / 8,
      6 / 8,
      4 / 6,
      6 / 8,
      2 / 10,
      6 / 8,
      4 / 8,
      6 / 6,
      8 / 10,
      6 / 8,
    ])
    const i = ref(0)
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
    const myCharts = ref<any>()
    setTimeout(() => {
      // 绘制图表
      myCharts.value = echarts.init(myChart.value!)
      myCharts.value.setOption({
        title: {
          text: '身体素质综合发展分析',
          color: '#1F311F',
        },

        legend: {
          // data: ['score'],
          show: false,
        },
        tooltip: {
          show: false,
        },

        radar: {
          radius: '65%',
          indicator: [
            { name: '跑姿', max: 1, color: '#6C766E' },
            { name: '手滚球', max: 1, color: '#6C766E' },
            { name: '投球', max: 1, color: '#6C766E' },
            { name: '踢球', max: 1, color: '#6C766E' },
            { name: '抓球', max: 1, color: '#6C766E' },
            { name: '拍球', max: 1, color: '#6C766E' },
            { name: '击打球', max: 1, color: '#6C766E' },
            { name: '侧滑步', max: 1, color: '#6C766E' },
            { name: '水平跳', max: 1, color: '#6C766E' },
            { name: '跨步跳', max: 1, color: '#6C766E' },
            { name: '单脚跳', max: 1, color: '#6C766E' },
            { name: '马步跳', max: 1, color: '#6C766E' },
          ],
          axisName: {
            // 使用回调函数，第一个参数是指示器名称，第二个参数是指示器配置项
            formatter: function (value) {
              i.value++
              return `{a|${arrList.value[i.value - 1]}}\n{b|${value}}`
            },
            rich: {
              a: {
                color: '#1F311F',
                fontSize: 24,
                fontFamily: 'Source Han Sans',
                fontWeight: 'bold',
              },
              b: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#1F311F',
                height: 28,
              },
            },
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: '综合得分',
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
                value: valList.value,
                name: '各项得分',
              },
            ],
            markPoint: {
              clickable: false,
              // symbol: 'diamond', //使用中间是空的图形类型，设置边框为0后，就不显示了
              // symbolSize: 30,
              borderWidth: 0,
              data: [
                {
                  name: '',
                  value: '94',
                  x: '50%',
                  y: '50%',
                  symbolSize: 20,
                  label: {
                    textStyle: {
                      fontSize: 36,
                      color: '#1F311F',
                      fontWeight: 'bold',
                    },
                  },
                },
                {
                  name: '',
                  value: '综合得分',
                  x: '50%',
                  y: '56%',
                  symbolSize: 20,
                  label: {
                    textStyle: {
                      fontSize: 14,
                      color: '#1F311F',
                    },
                  },
                },
              ],

              itemStyle: {
                borderWidth: 0,
                borderColor: 'red',
                color: 'transparent',
              },
            },
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
