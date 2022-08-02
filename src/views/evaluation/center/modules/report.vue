<template>
  <div class="r-body">
    <div class="text-light-50 text-center">
      <div class="text-32px font-bold pt-36px pb-10px">
        白河狸少儿体适能发展测评
      </div>
      <div class="text-16px font-medium">(幼儿版)</div>
    </div>
    <div class="mt-11px px-20px">
      <div class="text-light-50 flex items-center">
        <img
          src="@/assets/images/avatar-boy.png"
          class="w-34px h-34px rounded-40"
        />
        <span class="text-sm ml-10px font-medium">李睿曦（男·5岁11月）</span>
        <span class="ml-200px text-xs">测试时间：2022.3.25</span>
      </div>
      <div
        class="text-center w-full h-118px rounded-20px bg-light-50 mt-10px p-10px"
      >
        <div
          class="text-left h-97px rounded-15px bg-[#F6F7FB] text-[#2D3A2F] px-20px py-12px text-xs leading-21px"
        >
          按照测试者现年龄阶段的国家体制健康标准，分数<span
            class="text-[#2EE094] font-medium text-xl"
            >26</span
          >，等级为<span class="text-[#2EE094] font-medium text-xl">合格</span
          >。整体发展不均衡，总分稍有回落(前次为27分)。尤其要加强 走平衡木
          的练习。八项测试中，六项测评结果与前次持平或略有下降，需要增加体育活动，推荐每天进行至少60分钟的中等强度的体育活动和锻炼。根据系统分析，受试者的年龄已经进入
          速度、柔韧
          的窗口期，应增强这部分素质训练；同时，随着小学阶段临近，需加强
          跳绳、坐位体前屈、跑步 等权重和技术较高的项目。
        </div>
      </div>
      <div class="h-570px w-full rounded-20px bg-light-50 mt-10px p-10px flex">
        <RadarChart class="w-440px"></RadarChart>
        <div class="ml-96px">
          <div
            class="w-352px h-310px r-shadow rounded-20px pt-40px relative pl-32px"
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
                  <img src="@/assets/images/evaluation/up.png" alt="" />
                </div>
                <div
                  class="text-[#2EE094] flex items-center font-bold r-border w-50px ml-11px"
                >
                  2项目
                </div>
                <div class="pl-15px">
                  <div>身高</div>
                  <div>双脚连续跳</div>
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
                  <img src="@/assets/images/evaluation/down.png" alt="" />
                </div>
                <div
                  class="text-[#F4274E] flex items-center font-bold r-border w-50px ml-11px"
                >
                  2项目
                </div>
                <div class="pl-15px">
                  <div>身高</div>
                  <div>双脚连续跳</div>
                  <div>双脚连续跳</div>
                </div>
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
                  <img src="@/assets/images/evaluation/keep.png" alt="" />
                </div>
                <div
                  class="text-[#A5A8B4] flex items-center font-bold r-border w-50px ml-11px"
                >
                  3项目
                </div>
                <div class="pl-15px">
                  <div>坐位体前屈</div>
                  <div>十米折返跑</div>
                  <div>网球掷远</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-352px h-201px r-shadow rounded-20px pt-40px relative pl-32px mt-14px"
            style="box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05)"
          >
            <div
              class="w-218px h-51px absolute top-[-16px] left-[67px] text-[#1F311F] font-500 bg-title flex items-center justify-center"
            >
              体制健康成绩等级对照表
            </div>
            <div
              class="w-300px h-142px rounded-20px border-1 border-[#F8F8F8] flex p-15px leading-[22px] text-xs"
            >
              <div class="text-center r-border">
                <div class="text-[#1F311F] font-bold w-126px text-sm">
                  综合分数
                </div>
                <div class="text-[#2EE094]">>31分</div>
                <div class="text-[#2EE094]">28-31分</div>
                <div class="text-[#2EE094]">20-27分</div>
                <div class="text-[#2EE094]">&lt;20分</div>
              </div>

              <div class="pl-57px text-center">
                <div class="text-[#1F311F] font-bold h-25px text-sm">等级</div>
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
</template>
<script lang="ts" setup>
import { Avatar } from 'ant-design-vue'
import RadarChart from './radar-chart.vue'
</script>
<style lang="less">
#main {
  min-width: 31.25rem;
  min-height: 31.25rem;
  // max-height: 500px;
}
.r-body {
  @apply h-859px w-full;
  background: url('@/assets/images/evaluation/ligthning.png') no-repeat top
      right,
    linear-gradient(to right, #3bd89c, #02fd7c);
  .r-shadow {
    box-shadow: 0px 8px 30px 0px rgba(0, 0, 0, 0.05);
  }
  .bg-title {
    background: url('@/assets/images/evaluation/bg-title.png') no-repeat;
  }
  .r-border {
    border-right: 1px solid #f0f2f1;
  }
}
</style>
