<template>
  <div class="calendar-component-view">
    <div
      class="calendar-component-body w-480px box-border"
      s:border="1px solid [#C3CAC6]"
    >
      <!-- weeks -->
      <!-- {{ current.format('YYYY-MM-DD') }} -->
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
        <div
          v-for="day in days"
          :key="day.date"
          class="calendar-component-days-item w-58px h-58px flex flex-col justify-center items-center gap-y-10px text-[20px] cursor-pointer"
          :class="{
            'calendar-component-days-item-saturday': day.isSaturday,
            'calendar-component-days-item-sunday': day.isSunday,
            'calendar-component-days-item-current-month': day.isCurrentMonth,
          }"
        >
          <span>{{ dayjs(day.date).format('D') }}</span>
          <span v-if="day.festivals" s:text="[#C8C8C8]" class="text-xs">
            {{ day.festivals.join(',') }}
          </span>
          <span v-else s:text="[#C8C8C8]" class="text-xs">{{ day.lunar }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs, { Dayjs } from 'dayjs'
import pluginWeekDay from 'dayjs/plugin/weekday'
import { computed, reactive, ref, unref } from 'vue'
import { getLunarFestivals, solarToLunar } from '@/utils'
import { ICalendarProps } from './interface'
dayjs.extend(pluginWeekDay)
const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const value = ref('2022-07-01')
const current = computed(() => dayjs(value.value || new Date()))

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
  return {
    date: dayjs.format('YYYY-MM-DD'),
    lunar: solarToLunar(dayjs, 'D'),
    festivals: getLunarFestivals(dayjs),
    isCurrentMonth: isCurrentMonth,
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
</script>

<style lang="less" scoped>
.calendar-component-view {
  .calendar-component-body {
    .calendar-component-days {
      &-item {
        color: #83867e;
        &-sunday,
        &-saturday {
          background: rgba(237, 239, 237, 0.5);
          border-radius: 16px 16px 16px 16px;
          opacity: 1;
        }
        &-current-month {
          color: #1f311f;
        }
      }
    }
  }
}
</style>
