<template>
  <div class="calendar-component-body w-480px box-border">
    <div
      class="calendar-component-weeks grid grid-cols-7 gap-10px text-center px-10px"
    >
      <div
        class="calendar-component-weeks-item py-18px text-sm"
        s:text="[#1F311F]"
        v-for="(week, index) in weeks"
      >
        <span class="calendar-component-weeks-item-text">{{ week }}</span>
      </div>
    </div>
    <!-- 这个月 -->
    <div
      class="calendar-component-days grid grid-cols-7 gap-10px text-center px-10px pb-10px"
    >
      <CalendarDayItem
        v-for="day in days"
        :key="day.date"
        :day="day"
        :is-to-day="day.date === today"
        @day-click="onDayClick"
      ></CalendarDayItem>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs'
import pluginWeekDay from 'dayjs/plugin/weekday'
import { computed, PropType, reactive, ref, unref } from 'vue'
import { getLunarFestivals, solarToLunar } from '@/utils'
import {
  CalendarProps,
  ICalendarAdjustProps,
  ICalendarProps,
} from './interface'
import CalendarDayItem from './DayItem.vue'
const params = CalendarProps()
dayjs.extend(pluginWeekDay)
const props = defineProps({
  selectDate: {
    type: String as PropType<string>,
    default: '',
  },
  // 被调整的日期
  adjustData: {
    type: Object as PropType<ICalendarAdjustProps>,
    default: () => [],
  },
})
const emits = defineEmits([
  'update:select-date',
  'select-change',
  'next-month',
  'prev-month',
])
defineExpose({ onNextMonth, onPrevMonth })
const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
// const selectDate = ref('2022-07-01')
const current = computed(() => dayjs(props.selectDate || new Date()))

// 获取这个月几天
const numberOfDaysInMonth = computed(() => current.value.daysInMonth())

const currentMonthDays = computed(() => {
  const c = unref(current).clone()

  return [...Array(numberOfDaysInMonth.value)].map((day, index) => {
    const ci = dayjs(`${c.year()}-${c.month() + 1}-${index + 1}`)
    return setDto(ci, true)
  })
})
const nextMonthDays = computed(() => {
  const c = current.value.clone()
  const lastDayOfTheMonthWeekday = dayjs(
    `${c.year()}-${c.month() + 1}-${currentMonthDays.value.length}`
  ).weekday()
  const nextMonth = dayjs(`${c.year()}-${c.month() + 1}-01`).add(1, 'month')

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 6 - lastDayOfTheMonthWeekday
    : 6
  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    const ci = dayjs(
      `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
    )
    return setDto(ci)
  })
})
const previousMonthDays = computed(() => {
  const c = dayjs(current.value)
  const cy = dayjs(`${c.year()}-${c.month() + 1}-01`)
  const firstDayOfTheMonthWeekday = cy.weekday()
  const previousMonth = cy.subtract(1, 'month')
  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday
    : 6
  const previousMonthLastMondayDayOfMonth = cy
    .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    .date()

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    const ci = dayjs(
      `${previousMonth.year()}-${previousMonth.month() + 1}-${
        previousMonthLastMondayDayOfMonth + index
      }`
    )
    return setDto(ci)
  })
})
function setDto(dayjs: Dayjs, isCurrentMonth: boolean = false) {
  const dayStr = dayjs.format('YYYY-M-D')
  return {
    date: dayStr,
    lunar: solarToLunar(dayjs, 'D'),
    festivals: getLunarFestivals(dayjs),
    isCurrentMonth: isCurrentMonth,
    // 调整说明
    adjustDesc: props.adjustData.get(dayStr),
    // 被调整日期
    adjustData: props.adjustData.get(dayStr),
    //是否选择
    isSelected: props.selectDate === dayStr,
    // 是否是周日
    isSunday: dayjs.weekday() === 0,
    // 是否是周六
    isSaturday: dayjs.weekday() === 6,
  } as ICalendarProps
}
const days = computed(() => {
  return [
    ...previousMonthDays.value,
    ...currentMonthDays.value,
    ...nextMonthDays.value,
  ]
})
const today = computed(() => {
  return dayjs().format('YYYY-M-D')
})
function onDayClick(day: ICalendarProps) {
  console.log('onDayClick')
  emits('update:select-date', day.date)
  emits('select-change', day)
}
function onNextMonth() {
  console.log('onNextMonth')
  emits('next-month')
}
function onPrevMonth() {
  console.log('onPrevMonth')
  emits('prev-month')
}
</script>

<style lang="less" scoped></style>
