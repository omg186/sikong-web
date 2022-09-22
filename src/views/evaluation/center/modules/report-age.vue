<template>
  <div class="r-body pb-20px">
    <div class="h-874px r-bg relative">
      <img
        src="@/assets/images/evaluation/qualified.png"
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
          白河狸少儿粗大动作发展测评
        </div>
        <div class="text-16px font-medium">(TGMD版)</div>
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
              动作发展测评是考察<span class="text-[#2EE094] font-medium text-xl"
                >测试者</span
              >粗大动作的发展水平。粗大动作的模式是所有运动技能的基础，少儿时期是技术动作形成和成熟期，正确的动作直接影响运动效率和表现，还会减少运动损伤的风险。综合看，<span
                class="text-[#2EE094] font-medium text-xl"
                >测试者</span
              >的粗大动作发展属于合格(平均)水平，发展不均衡。身体移动的能力明显优于物体控制能力。随着年龄的发展，应逐步开展一些运动技能的学习，让动作发展更均衡。
            </div>
          </div>
          <div
            class="h-570px w-full rounded-16px bg-light-50 mt-10px p-10px flex justify-between"
          >
            <RadarChartAge class="w-500px"></RadarChartAge>
            <div class="mr-20px">
              <div class="w-352px h-243px r-shadow rounded-16px">
                <div
                  class="w-352px h-56px text-[#1F311F] font-500 flex items-center justify-between px-20px py-16px bg-[#EDEEF2] rounded-t-16px"
                >
                  <div class="text-16px font-bold">身体移动发展子测试</div>
                  <div><span class="text-[#2EE094]">33</span>分</div>
                </div>
                <div class="pt-14px pb-30px pl-19px text-xs">
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-between"
                    >
                      <img
                        src="@/assets/images/evaluation/yes.png"
                        class="w-17px h-13px"
                      /><span>1项</span>
                    </div>
                    <div class="pl-21px">完全掌握</div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-between items-center"
                    >
                      <img
                        src="@/assets/images/evaluation/no.png"
                        class="h-17.36px pl-5px"
                      /><span>5项</span>
                    </div>
                    <div class="pl-21px flex items-center">未完全掌握</div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-center items-center"
                    >
                      <img
                        src="@/assets/images/evaluation/age.png"
                        class="w-54px h-27px"
                      />
                    </div>
                    <div class="pl-21px flex items-center">
                      发展年龄 6岁零3月
                    </div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-start items-end"
                    >
                      <div>
                        <img
                          src="@/assets/images/evaluation/ranking.png"
                          class="ml-15px w-19px h-18px"
                        />
                      </div>
                    </div>
                    <div class="pl-21px flex items-end">同龄人排名37%</div>
                  </div>
                </div>
              </div>
              <div class="w-352px h-243px mt-20px r-shadow rounded-16px">
                <div
                  class="w-352px h-56px text-[#1F311F] font-500 flex items-center justify-between px-20px py-16px bg-[#EDEEF2] rounded-t-16px"
                >
                  <div class="text-16px font-bold">物体控制发展子测试</div>
                  <div><span class="text-[#2EE094]">26</span>分</div>
                </div>
                <div class="pt-14px pb-30px pl-19px text-xs">
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-between"
                    >
                      <img
                        src="@/assets/images/evaluation/yes.png"
                        class="w-17px h-13px"
                      /><span>0项</span>
                    </div>
                    <div class="pl-21px">完全掌握</div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-between items-center"
                    >
                      <img
                        src="@/assets/images/evaluation/no.png"
                        class="h-17.36px pl-5px"
                      /><span>6项</span>
                    </div>
                    <div class="pl-21px flex items-center">未完全掌握</div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-center items-center"
                    >
                      <img
                        src="@/assets/images/evaluation/age-red.png"
                        class="w-54px h-27px"
                      />
                    </div>
                    <div class="pl-21px flex items-center">发展年龄 5岁0月</div>
                  </div>
                  <div class="flex divide-x h-35px">
                    <div
                      class="pr-19px text-sm font-bold w-92px flex justify-start items-end"
                    >
                      <div>
                        <img
                          src="@/assets/images/evaluation/ranking.png"
                          class="ml-15px w-19px h-18px"
                        />
                      </div>
                    </div>
                    <div class="pl-21px flex items-end">同龄人排名37%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="r-bg-gray px-20px pt-15px">
      <div class="h-full rounded-16px bg-light-50 px-20px pt-25px pb-61px">
        <div class="w-full h-full grid grid-cols-3 gap-30px">
          <div v-for="(item, index) in physicalQuality">
            <AssessCard :list="item"></AssessCard>
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
import { ref } from 'vue'
import RadarChartAge from './radar-chart-age.vue'
import AssessCard from './assess-card.vue'
const physicalQuality = ref([
  {
    title: '跑步',
    value: '3',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '马步跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '单脚跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
    ],
    lastValue: '2',
    upTrend: false,
  },
  {
    title: '跑步',
    value: '3',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '马步跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '单脚跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
    ],
    lastValue: '2',
    upTrend: false,
  },
  {
    title: '跑步',
    value: '3',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '马步跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '单脚跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
    ],
    lastValue: '2',
    upTrend: false,
  },
  {
    title: '跑步',
    value: '3',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '马步跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, false] },
      { master: 27, noMaster: 73, star: [false, false] },
      { master: 18, noMaster: 83, star: [true, false] },
    ],
    lastValue: '2',
    upTrend: true,
  },
  {
    title: '单脚跳',
    value: '6',
    actionList: [
      { master: 27, noMaster: 73, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 27, noMaster: 73, star: [true, false] },
      { master: 18, noMaster: 83, star: [true, true] },
      { master: 18, noMaster: 83, star: [true, true] },
    ],
    lastValue: '2',
    upTrend: false,
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
