<template>
  <div>
    <p class="flex items-center cursor-pointer" @click="onBack">
      <SvgIcon name="back" class="w-20px h-12px fill-[#A5A8B4]"></SvgIcon>
      <span s:font="bold">返回</span>
    </p>

    <p s:font="bold">历史训练计划</p>
    <div
      s:border="3px solid [#F6F7FA] rounded-sm"
      class="relative p-20px my-20px overflow-hidden"
    >
      <p s:font="bold">立定跳远2022年暑期锻炼计划(四年级)</p>
      <div class="grid grid-cols-[261px,261px] gap-x-20px mt-20px">
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-[#A5A8B4]"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="black sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F6F7FA]">
            <span s:text="sm" s:font="bold">1次训练/周二</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
            </div>
          </div>
        </div>
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-[#A5A8B4]"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="black sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F6F7FA]">
            <span s:text="sm" s:font="bold">1次训练/周二</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      s:border="3px solid [#F6F7FA] rounded-sm"
      class="relative p-20px my-20px overflow-hidden"
    >
      <p s:font="bold">立定跳远2022年暑期锻炼计划(四年级)</p>
      <div class="grid grid-cols-[261px,261px] gap-x-20px mt-20px">
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-[#A5A8B4]"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="black sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F6F7FA]">
            <span s:text="sm" s:font="bold">1次训练/周二</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
            </div>
          </div>
        </div>
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-[#A5A8B4]"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="black sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F6F7FA]">
            <span s:text="sm" s:font="bold">1次训练/周二</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TextItem from '@/components/TextItem.vue'
const emits = defineEmits(['back'])
function onBack() {
  emits('back')
}
</script>
