<template>
  <div
    class="calendar-show grid grid-cols-[130px,480px,200px]"
    s:border="rounded-[8px] 1px solid [#C3CAC6] opacity-20"
  >
    <div class="pt-20px pl-20px">
      <p s:text="[26px]" class="font-din font-bold">
        {{ current.format('YYYY.M') }}
      </p>
      <div class="flex gap-5px">
        <span
          class="w-24px h-24px flex justify-center items-center cursor-pointer bg-[#EFFFF7] rounded-8px fill-primary"
          @click="onPrevMonth"
        >
          <SvgIcon
            name="down"
            class="w-12px h-12px transform rotate-90"
          ></SvgIcon>
        </span>
        <span
          class="w-24px h-24px flex justify-center items-center cursor-pointer bg-[#EFFFF7] rounded-8px fill-primary"
          @click="onNextMonth"
        >
          <SvgIcon
            name="down"
            class="w-12px h-12px transform rotate-[-90deg]"
          ></SvgIcon>
        </span>
      </div>
      <div class="flex flex-col gap-20px pt-30px text-xs">
        <div class="flex flex-col gap-5px">
          <span class="w-16px h-16px bg-[#F6F7F6] rounded-6px"></span>
          <span>校历非经营日</span>
        </div>
        <div class="flex flex-col gap-5px">
          <span
            class="w-16px h-16px border-primary border-[1px] rounded-6px"
          ></span>
          <span>被调整的日期</span>
        </div>

        <div class="flex flex-col gap-5px">
          <span class="w-16px h-16px bg-primary rounded-6px"></span>
          <span>今日</span>
        </div>

        <div class="flex flex-col gap-5px">
          <span class="w-16px h-16px bg-[#FFCD27] rounded-full"></span>
          <span>调整说明</span>
        </div>

        <div class="flex flex-col gap-5px">
          <span class="w-16px h-16px bg-[#B5A0FF] rounded-full"></span>
          <span>被调整的说明</span>
        </div>
      </div>
    </div>
    <div class="border-l border-r" s:border="opacity-20">
      <Calendar
        v-model:selectDate="selectDate"
        :adjustData="adjustData"
        @select-change="onSelectChange"
      ></Calendar>
    </div>

    <div class="pt-18px pl-22px pr-30px text-xs">
      <p s:text="sm" class="font-bold">
        {{ current.format('YYYY年M月D日') }}
      </p>
      <p class="font-bold pt-30px">日期类型</p>
      <p class="text-[#6C766E]">{{ currentSelectDate?.type }}</p>
      <p class="font-bold">经营时间</p>
      <p
        class="text-[#6C766E] flex gap-5px"
        v-for="arr in currentSelectDate?.date"
      >
        <span v-for="item in arr" class="">
          {{ dayjs(item).format('hh:mmA') }}
        </span>
      </p>
      <p class="font-bold">调整备注</p>
      <p class="text-[#6C766E]">{{ currentSelectDate?.remark }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import Calendar from './Calendar.vue'
import SvgIcon from '../SvgIcon.vue'
import { ICalendarAdjustProps, ICalendarProps } from './interface'
//选中的时间
const selectDate = ref('2022-7-1')
// 被调整的日期
// const currentSelectDate = ref<ICalendarProps>()
const adjustData = ref<ICalendarAdjustProps>(
  new Map([
    [
      '2022-7-1',
      {
        type: '经营日',
        date: [
          ['2022-7-1 10:20', '2022-7-1 11:30'],
          ['2022-7-1 13:00', '2022-7-1 20:00'],
        ],
        remark: '',
      },
    ],
    [
      '2022-7-2',
      {
        type: '非经营日',
        date: [
          ['2022-7-2 10:20', '2022-7-2 11:30'],
          ['2022-7-2 13:00', '2022-7-2 20:00'],
        ],
        remark: '',
      },
    ],
    [
      '2022-7-3',
      {
        type: '非经营日',
        date: [
          ['2022-7-3 10:20', '2022-7-3 11:30'],
          ['2022-7-3 13:00', '2022-7-3 20:00'],
        ],
        remark: '',
      },
    ],
    [
      '2022-7-4',
      {
        type: '非经营日',
        date: [
          ['2022-7-4 10:20', '2022-7-4 11:30'],
          ['2022-7-4 13:00', '2022-7-4 20:00'],
        ],
        remark: '',
      },
    ],
    [
      '2022-7-5',
      {
        type: '非经营日',
        date: [
          ['2022-7-5 10:20', '2022-7-5 11:30'],
          ['2022-7-5 13:00', '2022-7-5 20:00'],
        ],
        remark: '2022年第一届《司空体能杯》赛事举办！）',
      },
    ],
  ])
)
const current = computed(() => dayjs(selectDate.value))
const currentSelectDate = computed(() => {
  const date = current.value.format('YYYY-M-D')
  return adjustData.value.get(date) || undefined
})
function onNextMonth() {
  const next = dayjs(selectDate.value).add(1, 'month')
  selectDate.value = next.format('YYYY-M-D')
}
function onPrevMonth() {
  const prev = dayjs(selectDate.value).subtract(1, 'month')
  selectDate.value = prev.format('YYYY-M-D')
}
function onSelectChange(day: ICalendarProps) {
  console.log('onSelectChange', day)
  // currentSelectDate.value = day
  // adjustData.value.get(day.date)
}
</script>
<style lang="less" scoped>
// .calendar-show {
//   border: 1px solid #c3cac6;
//   border-radius: 8px;
// }
</style>
