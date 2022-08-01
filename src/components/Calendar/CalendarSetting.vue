<template>
  <div class="grid grid-cols-[480px,200px]">
    <div class="border-r">
      <Calendar
        v-model:selectDate="selectDate"
        :adjustData="adjustData"
        @select-change="onSelectChange"
      ></Calendar>
    </div>

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
      <div class="flex flex-col gap-10px pt-30px">
        <h3 class="text-xs font-bold">
          将 {{ current.format('M月D日') }}设置为
        </h3>
        <RadioGroup v-model:value="currentAdjustData.type">
          <Radio class="flex h-30px text-sm font-normal" value="经营日">
            经营日
          </Radio>
          <Radio class="flex h-30px text-sm font-normal" value="非经营日">
            非经营日
          </Radio>
        </RadioGroup>
        <h3 class="text-xs font-bold">调整备注</h3>
        <Textarea :rows="6" v-model:value="currentAdjustData.remark"></Textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed, ref, unref, watch, watchEffect } from 'vue'
import Calendar from './Calendar.vue'
import SvgIcon from '../SvgIcon.vue'
import { RadioGroup, Radio, Textarea } from 'ant-design-vue'
import { Adjust, ICalendarAdjustProps, ICalendarProps } from './interface'
//选中的时间
const selectDate = ref('2022-7-1')
const currentAdjustData = ref<Adjust>({ remark: '' })
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
// watch(
//   () => selectDate.value,
//   (val, oldVal) => {
//     // adjustData.value.set(currentAdjustData.value.key, currentAdjustData.value)
//     console.log('val', val)
//     currentAdjustData.value = adjustData.value.get(val)
//   }
// )
// watchEffect(() => {
//   const currentAdjust = currentAdjustData.value
//   const mo = adjustData.value.get(currentAdjust.key)
//   if (mo) {
//     currentAdjustData.value = { ...currentAdjust, ...mo }
//   } else {
//     adjustData.value.set(currentAdjust.key, mo)
//   }
// })
const current = computed(() => dayjs(selectDate.value))
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
  // 保存当前选中的日期
  const currentAdjust = unref(currentAdjustData)
  console.log('currentAdjust.value', currentAdjust)
  if (currentAdjust.key) {
    adjustData.value.set(currentAdjust.key, currentAdjustData.value)
  }
  currentAdjustData.value = {
    key: day.date,
    remark: '',
    ...(day.adjustData || {}),
  }
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
