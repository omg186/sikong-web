<template>
  <div class="r-body pb-20px">
    <div class="h-874px r-bg relative">
      <img
        src="@/assets/images/evaluation/excellent.png"
        class="absolute right-36"
        alt=""
      />
      <img
        class="absolute right-0 top-[-26px]"
        src="@/assets/images/evaluation/hechong.png"
        alt=""
      />
      <div class="text-light-50 text-center">
        <div class="text-32px font-bold pt-56px pb-10px">
          国家学生体质健康标准测评
        </div>
        <div class="text-16px font-medium">(1-2年级版))</div>
      </div>
      <div class="pb-20px">
        <div class="mt-11px px-20px">
          <div class="text-light-50 flex items-center">
            <img
              src="@/assets/images/avatar-boy.png"
              class="w-34px h-34px rounded-40"
            />
            <span class="text-sm ml-10px font-medium"
              >李睿曦（男·5岁11月）</span
            >
            <span class="ml-220px text-xs">测试时间：2022.3.25</span>
          </div>
          <div
            class="text-center w-full h-118px rounded-16px bg-light-50 mt-10px p-10px"
          >
            <div
              class="text-left h-97px rounded-16px bg-[#F6F7FB] text-[#2D3A2F] px-20px py-12px text-xs leading-21px"
            >
              按照测试者现年龄阶段的国家体制健康标准，分数<span
                class="text-[#2EE094] font-medium text-xl"
                >26</span
              >，等级为<span class="text-[#2EE094] font-medium text-xl"
                >优秀</span
              >。整体发展不均衡，总分稍有回落(前次为27分)。尤其要加强 走平衡木
              的练习。八项测试中，六项测评结果与前次持平或略有下降，需要增加体育活动，推荐每天进行至少60分钟的中等强度的体育活动和锻炼。根据系统分析，受试者的年龄已经进入
              速度、柔韧
              的窗口期，应增强这部分素质训练；同时，随着小学阶段临近，需加强
              <span class="text-[#2EE094] font-medium text-xl"
                >跳绳、坐位体前屈、跑步</span
              >
              等权重和技术较高的项目。
            </div>
          </div>
          <div
            class="h-570px w-full rounded-16px bg-light-50 mt-10px p-10px flex justify-between"
          >
            <RadarChartGrade class="w-500px"></RadarChartGrade>
            <div class="mr-10px">
              <div
                class="w-352px h-310px r-shadow rounded-16px pt-40px relative pl-32px"
              >
                <div
                  class="w-218px h-51px absolute top-[-16px] left-[67px] text-[#1F311F] font-500 bg-title flex items-center justify-center"
                >
                  标题名字预留空间
                </div>
                <div
                  class="w-300px h-64px border-1 border-[#2EE094] rounded-12px relative"
                >
                  <div
                    class="w-24px h-41px border-1 border-[#2EE094] rounded-7px text-xs bg-[#5BFBB7] text-light-50 absolute left-[-12px] top-8px text-center"
                  >
                    上升
                  </div>
                  <div class="flex p-10px">
                    <div
                      class="w-48px h-44px bg-[#F7FEFB] text-center flex justify-center items-center rounded-10px"
                    >
                      <img
                        src="@/assets/images/evaluation/up.png"
                        alt=""
                        class="h-17px"
                      />
                    </div>
                    <div
                      class="text-[#2EE094] flex items-center font-bold r-border w-50px ml-11px"
                    >
                      2项目
                    </div>
                    <div class="pl-15px text-xs flex grid">
                      <div>体重指数BMI</div>
                      <div>坐位体前屈</div>
                    </div>
                  </div>
                </div>

                <div
                  class="w-300px h-83px border-1 border-[#F4274E] rounded-12px relative mt-10px"
                >
                  <div
                    class="w-24px h-41px border-1 border-[#F4274E] rounded-7px text-xs bg-[#FE6490] text-light-50 absolute left-[-12px] top-18px text-center"
                  >
                    下降
                  </div>
                  <div class="flex p-10px">
                    <div
                      class="w-48px h-63px bg-[#FFF8FA] text-center flex justify-center items-center rounded-10px"
                    >
                      <img
                        src="@/assets/images/evaluation/down.png"
                        alt=""
                        class="h-17px"
                      />
                    </div>
                    <div
                      class="text-[#F4274E] flex items-center font-bold r-border w-50px ml-11px"
                    >
                      0项目
                    </div>
                    <div class="pl-15px"></div>
                  </div>
                </div>

                <div
                  class="w-300px h-83px border-1 border-[#A5A8B4] rounded-12px relative mt-10px"
                >
                  <div
                    class="w-24px h-41px border-1 border-[#A5A8B4] rounded-7px text-xs bg-[#C0C0D2] text-light-50 absolute left-[-12px] top-18px text-center"
                  >
                    持平
                  </div>
                  <div class="flex p-10px">
                    <div
                      class="w-48px h-63px bg-[#FBFBFF] text-center flex justify-center items-center rounded-10px"
                    >
                      <img
                        src="@/assets/images/evaluation/keep.png"
                        alt=""
                        class="h-8px"
                      />
                    </div>
                    <div
                      class="text-[#A5A8B4] flex items-center font-bold r-border w-50px ml-11px"
                    >
                      3项目
                    </div>
                    <div class="pl-15px text-xs flex grid">
                      <div>肺活量</div>
                      <div>50米跑</div>
                      <div>1分钟跳绳</div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="w-352px h-201px r-shadow rounded-16px pt-40px relative pl-32px mt-14px"
                style="box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05)"
              >
                <div
                  class="w-218px h-51px absolute top-[-16px] left-[67px] text-[#1F311F] font-500 bg-title flex items-center justify-center"
                >
                  体制健康成绩等级对照表
                </div>
                <div
                  class="w-300px h-142px rounded-16px border-1 border-[#F8F8F8] flex p-15px leading-[22px] text-xs"
                >
                  <div class="text-center r-border">
                    <div class="text-[#1F311F] font-bold w-126px text-sm">
                      综合分数
                    </div>
                    <div class="text-[#2EE094]">>=90.0</div>
                    <div class="text-[#2EE094]">80.0-89.9</div>
                    <div class="text-[#2EE094]">60.0-79.9</div>
                    <div class="text-[#2EE094]">&lt;=59.9</div>
                  </div>

                  <div class="pl-57px text-center">
                    <div class="text-[#1F311F] font-bold h-25px text-sm">
                      等级
                    </div>
                    <div>一级优秀</div>
                    <div>二级 良好</div>
                    <div>三级 合格</div>
                    <div>四级 不合格</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="r-bg-gray px-20px">
      <div class="h-full rounded-16px bg-light-50 px-20px pt-25px pb-61px">
        <h1 class="text-[18px] text-[#1F311F] mb-27px">身体素质单项发展分析</h1>
        <div class="w-full h-full grid grid-cols-3 gap-30px">
          <div v-for="(item, index) in physicalQuality">
            <GaugeChart :charts-list="item"></GaugeChart>
          </div>
        </div>
      </div>
      <div class="mt-68px pb-113px text-[#2D3A2F] text-xs">
        《国民体质测定标准(幼儿版)》运用科学的方法，对3-6周岁的中国幼儿进行个体的形态、机能和身体素质等的测试与评定。所有测评项目，都按性别和年龄分组，3-5岁每0.5岁为一组，6岁为一个组。是目前国内最权威的，针对学龄前儿童的身体素质类测试。
      </div>
    </div>

    <div
      class="flex justify-between w-full h-155px r-footer pt-31px pb-36px px-35px text-xs text-[#fff] font-light"
    >
      <div class="flex justify-center items-center">
        <div class="w-80px h-80px bg-slate-100 border-4 border-[#33DD97]"></div>
        <div class="w-133px mx-24px leading-14px">
          扫描二维码，关注公众号，输入专属ID，或扫描条形码查看孩子的健康成长档案
        </div>
        <div
          class="w-189px h-80px bg-slate-100 border-4 border-[#33DD97]"
        ></div>
      </div>
      <div class="flex h-80px items-end">技术支持：北京白河狸科技有限公司</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Avatar } from 'ant-design-vue'
import RadarChartGrade from './radar-chart-grade.vue'
import GaugeChart from './gauge-chart.vue'
import { ref } from 'vue'
const physicalQuality = ref([
  {
    title: '体重指数BMI',
    value: '18.1kg(偏瘦)',
    unit: '公斤',
    processColor: '#2EE094',
    processRgbColor: 'rgba(46, 224, 148, 0.25)',
    score: '90',
    lastValue: '18.9s',
    lastScore: '80',
    upTrend: false,
    tag: ['健康体适能-身体成分'],
  },
  {
    title: '肺活量',
    value: '117.3cm',
    unit: '厘米',
    processColor: '#AFA8FF',
    processRgbColor: 'rgba(175,168,255, 0.25)',
    score: '80',
    lastValue: '108cm',
    lastScore: '70',
    upTrend: true,
    tag: ['健康体适能-身体形态'],
  },
  {
    title: '50米跑',
    value: '8.6s',
    unit: '秒',
    processColor: '#F3AB51',
    processRgbColor: 'rgba(243,171,81, 0.25)',
    score: '30',
    lastValue: '5.9s',
    lastScore: '3',
    upTrend: false, //上升
    tag: ['技能体适能-平衡能力'],
  },
  {
    title: '座位体前屈',
    value: '58cm',
    unit: '厘米',
    processRgbColor: 'rgba(255,124,124, 0.25)',
    processColor: '#FF7C7C',
    score: '20',
    lastValue: '59cm',
    lastScore: '30',
    upTrend: false, //上升
    tag: ['技能体适应-爆发力(下肢爆发力)'],
  },
  {
    title: '1分钟跳绳',
    value: '13.2m',
    unit: '米',
    processRgbColor: 'rgba(98,161,255, 0.25)',
    processColor: '#62A1FF',
    score: '100',
    lastValue: '9.9m',
    lastScore: '90',
    upTrend: false, //上升
    tag: [
      '技能体适应-肌肉力量(上肢与核心力量)',
      '技能体适应-爆发力(上肢爆发力)',
    ],
  },
])
</script>
<style lang="less">
#main {
  min-width: 31.25rem;
  min-height: 31.25rem;
  // max-height: 500px;
}
.r-body {
  @apply h-full w-full;
  .r-shadow {
    box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05);
  }
  .bg-title {
    background: url('@/assets/images/evaluation/bg-title.png') no-repeat;
  }
  .r-border {
    border-right: 1px solid #f1f3f2;
  }
  .r-bg-gray {
    background: #f1f3f2;
  }
  .r-footer {
    background: linear-gradient(to right, #02fd7c, #3bd89c);
  }
  .r-bg {
    background: url('@/assets/images/evaluation/ligthning.png') no-repeat top
        right,
      linear-gradient(180deg, #33de99 80%, #d6f1e8, #f1f3f2);
  }
}
</style>
