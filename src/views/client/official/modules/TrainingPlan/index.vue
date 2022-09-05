<template>
  <div class="training-plan">
    <div class="flex justify-between" style="line-height: 1.1em">
      <p class="mb-0 font-bold" s:text="sm">测评项目成绩与训练计划列表</p>
      <p class="mb-0 flex gap-x-10px items-center" s:text="xs" s:font="400">
        <span class="flex gap-x-5px">
          <i class="w-16px h-16px rounded-6px bg-[#F3F3F3]"></i>
          <span>上次成绩</span>
        </span>
        <!-- 优秀 -->
        <span class="flex gap-x-5px">
          <i class="w-16px h-16px rounded-6px bg-[#C0F5DD]"></i>
          <span>优秀</span>
        </span>
        <!-- 良好 -->
        <span class="flex gap-x-5px">
          <i class="w-16px h-16px rounded-6px bg-[#A1C7FF]"></i>
          <span>良好</span>
        </span>
        <!-- 及格 -->
        <span class="flex gap-x-5px">
          <i class="w-16px h-16px rounded-6px bg-[#F9D3A4]"></i>
          <span>及格</span>
        </span>
        <!-- 不及格 -->
        <span class="flex gap-x-5px">
          <i class="w-16px h-16px rounded-6px bg-[#FFDCDF]"></i>
          <span>不及格</span>
        </span>
      </p>
    </div>
    <Table
      class="sikong-table flex-1 mt-20px"
      bordered
      :dataSource="listData"
      :columns="columns"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'plan'">
          <div
            class="flex flex-col w-full items-center justify-center gap-y-5px"
            s:text="xs"
          >
            <div
              class="relative w-200px h-20px flex items-center overflow-hidden justify-center"
              v-if="record.plan"
              :style="{
                lineHeight: 1,
                color: record.textColor,
              }"
            >
              <span
                class="relative w-full pl-6px z-20 flex items-center gap-1px"
                s:text="left"
              >
                <span>
                  {{
                    (
                      Math.round((record.progress / 100) * 10000) / 100.0
                    ).toFixed(0)
                  }}分

                  <span>{{ record.plan }}</span>
                </span>
              </span>
              <span
                :style="{
                  width:
                    Math.round((record.progress / 100) * 10000) / 100.0 + '%',
                  backgroundColor: record.color,
                }"
                class="h-full absolute left-0 z-1 rounded-sm"
              ></span>
            </div>
            <div
              class="relative w-200px h-20px flex items-center overflow-hidden justify-center rounded-sm"
              v-if="record.plan1"
              :style="{
                lineHeight: 1,
                color: '#A9ACA4',
              }"
            >
              <span
                class="relative w-full pl-6px z-20 flex items-center gap-1px"
                s:text="left"
              >
                <span>
                  {{
                    (
                      Math.round((record.progress1 / 100) * 10000) / 100.0
                    ).toFixed(0)
                  }}分

                  <span>{{ record.plan1 }}</span>
                </span>
              </span>
              <span
                :style="{
                  width:
                    Math.round((record.progress1 / 100) * 10000) / 100.0 + '%',
                  backgroundColor: '#F4F4F4',
                }"
                class="h-full absolute left-0 z-1 rounded-sm"
              ></span>
            </div>
          </div>
        </template>
        <template v-if="column.key === 'option'">
          <div class="flex items-center justify-center gap-10px">
            <span
              class="underline underline-offset-2 underline-primary text-primary"
            >
              {{ record.option }}
            </span>
          </div>
        </template>
      </template>
    </Table>
    <div class="flex gap-x-17px pt-30px">
      <p class="mb-0 font-bold" s:text="sm">当前训练计划</p>
      <div class="grid grid-cols-[24px,auto,24px] gap-8px fill-[#A5A8B4]">
        <span
          class="flex items-center justify-center h-24px rounded-10px cursor-pointer bg-[#EFFFF7] fill-primary"
        >
          <SvgIcon
            name="down"
            class="w-10px h-6px transform rotate-90"
          ></SvgIcon>
        </span>
        <p>8月21日-8月27日</p>
        <span
          class="flex items-center justify-center h-24px rounded-10px cursor-pointer bg-[#EFFFF7] fill-primary"
        >
          <SvgIcon
            name="down"
            class="w-10px h-6px transform rotate-270"
          ></SvgIcon>
        </span>
      </div>
    </div>
    <div
      class="w-738px h-602px rounded-sm bg-[#FCFCFC] mb-30px"
      s:border="1px solid #F3F4F4"
    >
      <div
        class="h-86px grid grid-cols-[99px,540px,97px]"
        v-for="(week, index) in weekDate"
        :key="index"
      >
        <!-- week -->
        <div class="flex flex-col justify-center">
          <div
            class="w-full h-full flex flex-col justify-center items-center gap-y-5px cursor-pointer"
            :class="{
              'bg-primary text-white': activeWeekIndex === index,
            }"
            @click="activeWeekIndex = index"
          >
            <span s:text="sm" s:font="bold">{{ week.name }}</span>
            <span
              s:text="xs [#C8C8C8]"
              s:font="400"
              :class="{ '!text-white': activeWeekIndex === index }"
            >
              {{ week.date }}
            </span>
          </div>
        </div>
        <div
          class="overflow-hidden relative"
          s:border="l r solid #F3F4F4"
          style="transform: translateZ(0); touch-action: pan-y"
        >
          <div v-if="week.count > 2">
            <div
              class="next z-10 absolute left-10px w-70px h-85px flex items-center h-24px rounded-10px cursor-pointer"
              @click="onPrev(week)"
            >
              <SvgIcon
                name="down"
                class="w-10px h-6px transform rotate-90"
              ></SvgIcon>
            </div>
            <div
              class="next z-10 absolute right-10px justify-end w-70px h-85px flex items-center h-24px rounded-10px cursor-pointer"
              @click="onNext(week)"
            >
              <SvgIcon
                name="down"
                class="w-10px h-6px transform rotate-270"
              ></SvgIcon>
            </div>
          </div>
          <div
            class="h-full grid grid-cols-2 transition transition-all duration-500"
            :style="{
              gridTemplateColumns:
                'repeat(' + (week.count > 2 ? week.count : 2) + ',1fr)',
              width: week.count * 270 + 'px',
              minWidth: 2 * 270 + 'px',
              transform: `translate3d(${week.x || 0}px, 0px, 0px)`,
            }"
            s:divide="x-1px [#F3F4F4]"
          >
            <div
              class="w-270px h-full flex-shrink-0 flex justify-center items-center"
              v-for="(item, weekIndex) in Array(
                week.count > 2 ? week.count : 2
              ).fill(0)"
              :key="weekIndex"
              s:border="b solid #F3F4F4"
            >
              <div
                class="box-border w-261px h-77px grid grid-cols-[10px,auto,60px] items-center bg-white p-4px pl-0px rounded-sm"
                v-if="week.items[weekIndex]"
                style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
              >
                <div
                  class="h-full w-3px rounded-40"
                  s:border="2px solid [#A5A8B4]"
                  :class="{
                    '!border-[#FFD13C]':
                      week.items[weekIndex]?.status === '未开启',
                    '!border-primary': activeWeekIndex === index,
                  }"
                  style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
                ></div>
                <div class="grid gap-y-5px h-full">
                  <div class="flex flex-col self-start gap-x-7px">
                    <span class="font-bold" s:text="sm">
                      {{ week.items[weekIndex].title }}
                    </span>
                    <span
                      s:text="xs [#999999]"
                      v-if="week.items[weekIndex].name"
                    >
                      {{ week.items[weekIndex].name }}
                    </span>
                  </div>
                  <div s:text="[#6C766E] xs" class="self-end">
                    {{ week.items[weekIndex].desc }}
                  </div>
                </div>
                <div
                  class="w-56px h-26px flex self-start items-center justify-center rounded-40 text-xs text-center"
                  :class="{
                    'bg-[#FFDCDF] text-[#FF7C7C]':
                      week.items[weekIndex].status === '未完成',
                    'bg-[#E7FFF2] text-[#2FE095]':
                      week.items[weekIndex].status === '已开启',
                    'bg-[#FFFAEC] text-[#FFBB00]':
                      week.items[weekIndex].status === '未开启',
                    'bg-[#F6F7FA] text-[#A5A8B4]':
                      week.items[weekIndex].status === '已完成',
                  }"
                >
                  {{ week.items[weekIndex].status }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center">
          <div
            class="w-full h-full flex flex-col justify-center items-center gap-y-5px"
          >
            <span
              class="underline"
              s:text="xs [#C8C8C8]"
              s:font="400"
              s:underline="offset-2"
            >
              {{ week.process || 0 }}/{{ week.count || 0 }}
            </span>
            <span
              class="underline"
              s:underline="primary offset-2"
              s:text="xs primary"
              s:font="400"
              v-if="week.status === '添加计划'"
              >{{ week.status }}</span
            >
            <span s:text="xs [#C8C8C8]" s:font="400" v-else>
              {{ week.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import {
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Table,
  message,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
interface WeekDateItems {
  title?: string
  name?: string
  status?: string
  desc?: string
}
interface WeekDate {
  name: string
  date: string
  items?: Array<WeekDateItems>
  x?: number
  count?: number
  process?: number
  status?: string
}
const activeWeekIndex = ref(0)
const weekDate = ref<Array<WeekDate>>([
  {
    name: '周日',
    date: '8月21日',
    items: [
      {
        title: '肺活量练习初级课1',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒  完成度: 100%',
        status: '已完成',
      },
      {
        title: '白河狸冠军体能坐位体前屈初级课2',
        name: '',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已完成',
      },
      {
        title: '白河狸冠军体能坐位体前屈初级课3',
        name: '',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已完成',
      },
      {
        title: '白河狸冠军体能坐位体前屈初级课4',
        name: '',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已完成',
      },
    ],
    count: 4,
    process: 2,
    status: '已过期',
  },
  {
    name: '周一',
    date: '8月22日',
    items: [
      {
        title: '800米有氧练习初级课',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '未完成',
      },
    ],
    count: 1,
    process: 0,
    status: '已过期',
  },
  {
    name: '周二',
    date: '8月23日',
    items: [
      {
        title: '800米有氧练习初级课',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已完成',
      },
    ],
    count: 1,
    process: 1,
    status: '已过期',
  },
  {
    name: '周三',
    date: '8月24日',
    items: [
      {
        title: '立定跳远初级课',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已开启',
      },
      {
        title: '立定跳远初级课',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '已开启',
      },
    ],
    count: 2,
    process: 0,
    status: '添加计划',
  },
  {
    name: '周四',
    date: '8月25日',
    items: [
      {
        title: '800米有氧练习初级课1',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '未开启',
      },
      {
        title: '坐位体前屈初级课2',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '未开启',
      },
      {
        title: '坐位体前屈初级课3',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '未开启',
      },
    ],
    count: 3,
    process: 0,
    status: '添加计划',
  },
  { name: '周五', date: '8月26日', items: [], status: '添加计划' },
  {
    name: '周六',
    date: '8月27日',
    items: [
      {
        title: '800米有氧练习初级课',
        name: '《白河狸冠军体能》',
        desc: '时长: 12分30秒 完成度: 100% ',
        status: '未开启',
      },
    ],
    count: 1,
    status: '添加计划',
  },
])
const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number }
  // 其它参数
  // filters: any,
  // sorter: any
) => {
  run({
    pageSize: pag.pageSize!,
    page: pag?.current,
    // 其他参数
    // sortField: sorter.field,
    // sortOrder: sorter.order,
    // ...filters,
  })
}
const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(
  params => {
    return getDemoListApi({ ...params })
  },
  {
    defaultParams: [
      {
        page: 1,
        pageSize: 8,
      },
    ],
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'pageSize',
    },
    manual: false,
  }
)
const listData = computed(() => [
  {
    name: '身高',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    // 分数/等级对比
    progress: 0,
    // 计划
    plan: 0,
    // 操作
    option: '',
  },
  {
    name: '身高',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    // 分数/等级对比
    progress: 0,
    // 分数
    plan: 0,
    // 分数/等级对比
    progress1: 0,
    // 分数
    plan1: 0,
    // 操作
    option: '',
  },
  {
    name: '身体质量指数',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    color: '#C0F5DD',
    textColor: '#2FE095',
    //计划
    planString: '无',
    // 分数/等级对比
    progress: 100,
    // 分数
    plan: 16.8,
    // 分数/等级对比
    progress1: 100,
    // 分数
    plan1: 17.8,
    // 操作
    option: '添加计划',
  },
  {
    name: '肺活量',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    color: '#A1C7FF',
    textColor: '#62A1FF',
    //计划
    planString: '2次/周',
    // 分数/等级对比
    progress: 80,
    // 分数
    plan: '2350ml',
    // 分数/等级对比
    progress1: 76,
    // 分数
    plan1: '2150ml',
    // 操作
    option: '计划详情',
  },
  {
    name: '50米跑',
    date: '2022.5.12',
    source: '司空云平台输入',
    color: '#C0F5DD',
    textColor: '#2FE095',
    //计划
    planString: '无',
    // 分数/等级对比
    progress: 90,
    // 分数
    plan: '8.3s',
    // 分数/等级对比
    progress1: 85,
    // 分数
    plan1: '8.6s',
    // 操作
    option: '添加详情',
  },
  {
    name: '坐位体前屈',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    color: '#F9D3A4',
    textColor: '#F3AB51',
    //计划
    planString: '无',
    // 分数/等级对比
    progress: 70,
    // 分数
    plan: '15.8cm',
    // 分数/等级对比
    progress1: 85,
    // 分数
    plan1: '17.1cm',
    // 操作
    option: '添加详情',
  },
  {
    name: '立定跳远',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',
    color: '#C0F5DD',
    textColor: '#2FE095',
    //计划
    planString: '1次/周',
    // 分数/等级对比
    progress: 90,
    // 分数
    plan: '186cm',
    // 分数/等级对比
    progress1: 100,
    // 分数
    plan1: '16.8cm',
    // 操作
    option: '添加详情',
  },
  {
    name: '800米跑',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',

    color: '#FFDCDF',
    textColor: '#FF7C7C',
    //计划
    planString: '1次/周',
    // 分数/等级对比
    progress: 46,
    // 分数
    plan: '256s',
    // 分数/等级对比
    progress1: 72,
    // 分数
    plan1: '252s',
    // 操作
    option: '添加详情',
  },
  {
    name: '1分钟仰卧起坐',
    date: '2022.5.12',
    source: '白河狸AI陪练输入',

    color: '#C0F5DD',
    textColor: '#2FE095',
    //计划
    planString: '3次/周',
    // 分数/等级对比
    progress: 90,
    // 分数
    plan: '46个',
    // 分数/等级对比
    progress1: 46,
    // 分数
    plan1: '23个',
    // 操作
    option: '添加详情',
  },
])
const columns = ref<TableColumnsType>([
  {
    title: '项目名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '最后测评时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '数据来源',
    dataIndex: 'source',
    key: 'source',
    align: 'center',
  },
  {
    title: '分数/等级对比',
    dataIndex: 'plan',
    key: 'plan',
    width: '200px',
    align: 'center',
  },
  {
    title: '计划',
    dataIndex: 'planString',
    key: 'planString',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
  },
])

function onNext(week: WeekDate) {
  console.log(week)
  // 下一个
  console.log('270', week.x, Math.abs(week.x) / 270)
  if (Math.abs(week.x) / 270 >= Math.floor(week.count / 2)) {
    // 没有下一个了
    message.warn('没有下一个了')
    return
  }
  week.x = (week.x || 0) - 270
}
// 上一个
function onPrev(week: WeekDate) {
  console.log(week)
  if (week.x === 0) {
    message.warn('没有上一个了')
    return
  }
  week.x = (week.x || 0) + 270
}
</script>

<style lang="scss" scoped>
.training-plan {
  .next {
    background: linear-gradient(90deg, #fcfcfc 0%, rgba(251, 251, 251, 0) 100%);
  }
}
</style>
