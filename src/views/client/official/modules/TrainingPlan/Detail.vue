<template>
  <div>
    <p class="flex items-center">
      <SvgIcon name="back" class="w-20px h-12px fill-[#A5A8B4]"></SvgIcon>
      <span s:font="bold">返回</span>
    </p>
    <div class="flex justify-between pt-10px">
      <p s:text="sm" s:font="bold">立定跳远训练计划</p>
      <div class="flex gap-x-20px items-center">
        <p
          class="underline underline-[#A9ACA4] underline-offset-2 cursor-pointer mb-0"
          s:text="xs [#A9ACA4]"
          s:font="400"
        >
          历史计划
        </p>
        <Button type="primary" class="rounded-full">
          <template #icon>
            <SvgIcon
              name="add"
              class="inline-block w-24px h-24px fill-white mr-2px"
            ></SvgIcon>
          </template>
          添加训练计划
        </Button>
      </div>
    </div>
    <div s:border="3px solid [#C1F6DF] rounded-sm" class="p-20px my-20px">
      <p s:font="bold">立定跳远2022年暑期锻炼计划(四年级)</p>
      <div class="grid grid-cols-[261px,261px] gap-x-20px mt-20px">
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-primary"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="primary sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F7FEFB]">
            <span s:text="sm" s:font="bold">1次训练/周二</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
              <div class="flex" s:text="xs [#A9ACA4]">
                <SvgIcon
                  name="modify"
                  class="w-24px h-17px fill-[#A9ACA4]"
                ></SvgIcon>
                <span>修改</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="min-h-235px pr-20px rounded-sm"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div class="grid grid-cols-[3px,auto] gap-x-10px">
            <i
              class="h-65px bg-primary"
              style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
            ></i>
            <div s:text="xs [#999]" class="flex flex-col gap-y-5px">
              <span s:text="primary sm">立定跳远基础训练计划</span>
              <span>《白河狸冠军体能》</span>
              <span>时长: 12分30秒 完成度: 100% </span>
            </div>
          </div>

          <div class="h-50px flex items-center pl-13px bg-[#F7FEFB]">
            <span s:text="sm" s:font="bold">1次训练/周日</span>
          </div>
          <div class="flex flex-col gap-y-10px pt-10px pl-13px">
            <TextItem title="执行时间" contents="2022.7.1-2022.8.31"></TextItem>
            <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
            <div class="flex justify-between cursor-pointer">
              <TextItem title="创建时间" contents="2022.6.28"></TextItem>
              <div class="flex" s:text="xs [#A9ACA4]">
                <SvgIcon
                  name="modify"
                  class="w-24px h-17px fill-[#A9ACA4]"
                ></SvgIcon>
                <span>修改</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between pt-10px">
      <p s:text="sm" s:font="bold">立定跳远训练计划集合</p>
    </div>
    <div
      class="w-468px h-32px grid grid-cols-3 mt-20px"
      s:border="rounded-40 1px solid #EDEFED"
    >
      <div
        class="flex items-center justify-center cursor-pointer"
        s:text="xs"
        :class="{ 'bg-[#525A64] text-white': activeIndex === 0 }"
        @click="activeIndex = 0"
        s:border="rounded-40"
      >
        立定跳远基础训练计划
      </div>
      <div
        class="flex items-center justify-center cursor-pointer"
        :class="{ 'bg-[#525A64] text-white': activeIndex === 1 }"
        s:border="rounded-40"
        @click="activeIndex = 1"
      >
        立定跳远提升训练计划
      </div>
      <div
        class="flex items-center justify-center cursor-pointer"
        :class="{ 'bg-[#525A64] text-white': activeIndex === 2 }"
        s:border="rounded-40"
        @click="activeIndex = 2"
      >
        立定跳远进阶训练计划
      </div>
    </div>
    <div class="grid grid-cols-[172px,auto] gap-x-20px mt-20px">
      <div class="h-98px" s:border="rounded-8px 3px solid [#C1F6DF]"></div>
      <div class="flex flex-col justify-center gap-y-10px">
        <span s:font="bold">对应课程：立定跳远基础训练课-掌握关键技术动作</span>
        <span s:text="xs [#999999]">时长: 12分30秒 完成度: 100% </span>
        <span s:text="xs [#F3AB51]"
          >适合没有立定跳远基础和基础薄弱的学生，课程和训练目标是掌握立定跳远关键技术动作的训练方法
        </span>
      </div>
    </div>
    <div class="pt-20px">
      <Table
        class="sikong-table-2"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
      >
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { Button, Table, TableColumnsType } from 'ant-design-vue'
import TextItem from '@/components/TextItem.vue'
import { ref } from 'vue'
const activeIndex = ref(0)

const columns = ref<TableColumnsType>([
  {
    title: '动作顺序',
    dataIndex: 'order',
    align: 'left',
    key: 'order',
    customRender: ({ text, record, index, column }) => {
      console.log('text', text, record)
      const obj = {
        children: text,
        attrs: { colSpan: 1 },
      }
      if (!text) {
        obj.children = record.title
        obj.attrs.colSpan = 4
      }
      return obj
    },
  },
  {
    title: '动作名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '动作次数/时长',
    dataIndex: 'time',
    align: 'center',
    key: 'time',
  },
  {
    title: '动作间休息',
    dataIndex: 'sleep',
    align: 'center',
    key: 'sleep',
  },
])
const dataSource = ref([
  {
    title: '热身运动',
    order: '',
    name: '',
    time: '',
    sleep: '',
  },
  {
    title: '热身运动',
    order: 'No.1',
    name: '脚踝环绕',
    time: '左脚，重复10次',
    sleep: '0秒',
  },
  {
    title: '热身运动',
    order: 'No.2',
    name: '脚踝环绕',
    time: '右脚，重复10次',
    sleep: '0秒',
  },
  {
    title: '热身运动',
    order: 'No.3',
    name: '抱脚尖蹲起',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '第1组',
    order: '',
    name: '',
    time: '',
    sleep: '',
  },
  {
    title: '第1组',
    order: 'No.4',
    name: '下坠跳',
    time: '重复15次',
    sleep: '0秒',
  },
  {
    title: '第1组',
    order: 'No.5',
    name: '肘碰膝垫步跳',
    time: '重复15次',
    sleep: '60秒',
  },
  {
    title: '第1组',
    order: 'No.6',
    name: '原地纵跳',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '第1组',
    order: 'No.7',
    name: '挺身跳',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '第1组',
    order: 'No.8',
    name: '横向蹲步走',
    time: '重复8次',
    sleep: '60秒',
  },
  {
    title: '第2组',
  },
  {
    title: '第2组',
    order: 'No.9',
    name: '下坠跳',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '第2组',
    order: 'No.10',
    name: '肘碰膝垫步跳',
    time: '重复15次',
    sleep: '0秒',
  },
  {
    title: '第2组',
    order: 'No.11',
    name: '原地纵跳',
    time: '重复15次',
    sleep: '60秒',
  },
  {
    title: '第2组',
    order: 'No.12',
    name: '挺身跳',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '第2组',
    order: 'No.13',
    name: '横向蹲步走',
    time: '重复10次',
    sleep: '0秒',
  },
  {
    title: '拉伸运动',
  },
  {
    title: '拉伸运动',
    order: 'No.14',
    name: '肩部拉伸',
    time: '',
    sleep: '',
  },
  {
    title: '拉伸运动',
    order: 'No.15',
    name: '大腿拉伸',
    time: '左腿25秒',
    sleep: '0秒',
  },
  ,
  {
    title: '拉伸运动',
    order: 'No.16',
    name: '大腿拉伸',
    time: '右腿25秒',
    sleep: '0秒',
  },
])
</script>
