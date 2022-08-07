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
    const arrList = ref([3, 4, 3, 2, 3, 3, 4, 3])
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
          // textVerticalAlign: 'middle',
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
            { name: '身高标准体重', max: 5, color: '#6C766E' },
            { name: '网球掷远', max: 5, color: '#6C766E' },
            { name: '立定跳远', max: 5, color: '#6C766E' },
            { name: '走平衡木', max: 5, color: '#6C766E' },
            { name: '十米折返跑', max: 5, color: '#6C766E' },
            { name: '坐立体前屈', max: 5, color: '#6C766E' },
            { name: '双脚连续跳', max: 5, color: '#6C766E' },
            { name: '身高', max: 5, color: '#6C766E' },
          ],
          axisName: {
            // 使用回调函数，第一个参数是指示器名称，第二个参数是指示器配置项
            formatter: function (value) {
              i.value++
              return `{a|${arrList.value[i.value - 1]}}{b|分}\n{c|${value}}`
            },
            rich: {
              a: {
                color: '#1F311F',
                fontSize: 30,
                fontFamily: 'Source Han Sans',
                fontWeight: 'bold',
              },
              b: {
                fontSize: 14,
                color: '#1F311F',
              },
              c: {
                fontSize: 12,
                color: '#6C766E',
                height: 30,
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
                value: arrList.value,
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
                  value: '26',
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
              // label: {
              //   show: true,
              // },
              // label: {
              //   show: true,
              //   textStyle: {
              //     fontSize: 36,
              //     color: '#1F311F',
              //     fontWeight: 'bold',
              //   },
              // } /*文本字体大小*/,

              itemStyle: {
                // color: '#595959',
                borderWidth: 0,
                borderColor: 'red',
                // label: { textStyle: { fontSize: 30 } } /*文本字体大小*/,
                // opacity: 0.5,
                // normal: {
                // color: '#595959', //整体设置颜色
                color: 'transparent',

                // borderWidth: 'none' /*保证不显示边框*/,
                // },
                // emphasis: {
                //   /*鼠标移上样式*/ borderWidth: 'none',
                //   label: { textStyle: { fontSize: 18 } } /*文本字体大小*/,
                // },
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
