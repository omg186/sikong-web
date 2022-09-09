<template>
  <div class="border-[#D2D4DE] border-3 h-490px rounded-16px divide-y">
    <div
      class="h-60px px-20px text-[#1F311F] font-bold flex items-center justify-between"
    >
      <div class="flex items-center">
        {{ list.title }}
        <div>
          <img
            v-if="list.upTrend"
            src="@/assets/images/evaluation/no.png"
            class="h-17.36px pl-5px"
          />
          <img
            v-else
            src="@/assets/images/evaluation/yes.png"
            class="h-17.36px pl-5px"
          />
        </div>
      </div>
      <div>4考核动作</div>
    </div>
    <div class="h-428px px-20px">
      <div class="font-bold pt-19px">
        得分
        <span class="text-[#2EE094] text-24px font-bold"
          >{{ list.value }}/8</span
        >
      </div>
      <div class="text-xs mt-5px" v-for="(item, index) in list.actionList">
        <div class="flex justify-end">
          <span class="text-[#F3AB51]">{{ item.master }}%</span> /<span
            class="text-[#63E8AF]"
            >{{ item.noMaster }}%</span
          >
        </div>
        <div class="flex items-center font-bold">
          <div class="text-sm mr-4px w-32px">动作</div>
          <div
            class="border-1 border-[#A5A8B4] rounded-4px text-xs w-18px h-18px text-center"
          >
            {{ index + 1 }}
          </div>
          <div class="flex ml-4px">
            <div class="w-26px flex justify-center">
              <img
                v-if="item.star[0]"
                src="@/assets/images/evaluation/star.png"
                class=""
              />
              <img
                v-else="item.star[0]"
                src="@/assets/images/evaluation/star-empty.png"
                class=""
              />
            </div>
            <div class="w-26px flex justify-center">
              <img
                v-if="item.star[1]"
                src="@/assets/images/evaluation/star.png"
                class=""
              />
              <img
                v-else="item.star[1]"
                src="@/assets/images/evaluation/star-empty.png"
                class=""
              />
            </div>
          </div>

          <div class="w-140px h-24px flex ml-7px">
            <div
              :style="{ width: item.master + '%' }"
              class="bg-[#F3AB51] rounded-l-4px flex justify-center items-center"
            >
              <div>
                <img src="@/assets/images/evaluation/no-white.png" class="" />
              </div>
            </div>
            <div
              :style="{ width: item.noMaster + '%' }"
              class="bg-[#63E8AF] rounded-r-4px flex justify-end items-center pr-9px"
            >
              <div>
                <img src="@/assets/images/evaluation/yes-white.png" class="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-between h-41px border-1 border-[rgba(226,229,228,0.5000)] rounded-40 pl-14px pr-20px mt-20px"
      >
        <div class="flex items-center">
          <span class="font-medium">上次结果：{{ list.lastValue }}/8</span>
        </div>
        <div class="flex items-center" v-if="list.upTrend">
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

      <div class="text-[#6C766E] mt-12px text-xs mt-16px">
        双脚快速离地，稳定大步向前的能力。此阶段<span class="text-[#2EE094]"
          >54%</span
        >的孩子掌握了此技能。<span class="font-bold text-[#1F311F]">测试者</span
        >的4个考核动作均未掌握。
      </div>
    </div>
    <!-- <div class="px-25px text-[#1F311F] text-xs">
      <div class="flex items-center pt-20px justify-between">
        <div class="text-base font-medium">{{ chartsList.title }}</div>
        <div class="text-xs text-[#83867E]">单位：{{ chartsList.unit }}</div>
      </div>
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
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue' // 主要
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const { list } = props
  },
})
</script>

<style lang="less" scoped></style>
