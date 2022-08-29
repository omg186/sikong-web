<template>
  <div class="flex flex-col h-full">
    <Header type="calendar" @click-icon="onJump"></Header>
    <div class="grid grid-cols-[358px,auto] px-20px gap-20px flex-1">
      <div s:border="1px solid [#F3F4F4] rounded-sm" class="h-full">
        <Calendar1
          v-model:selectDate="selDate"
          :selectList="selDateList"
          @next-month="onNextMonth"
          @prev-month="onPrevMonth"
        ></Calendar1>
      </div>
      <div
        s:border="1px solid [#F3F4F4] rounded-sm"
        class="h-full grid grid-cols-[100px,auto] mb-20px overflow-auto"
      >
        <div
          class="flex flex-col items-center gap-60px pt-70px font-bold"
          s:border="r solid [#F3F4F4]"
        >
          <div v-for="time in timeList" :key="time">
            {{ time }}
          </div>
        </div>
        <div class="relative">
          <div
            class="h-75px flex items-center justify-around"
            s:border="b solid [#F3F4F4]"
          >
            <div
              class="min-w-222px text-center"
              v-for="room in roomList"
              :key="room"
            >
              {{ room }}
            </div>
          </div>
          <div
            v-for="time in timeList"
            :key="time"
            class="box-border h-85px flex justify-around divide-x divide-[#F3F4F4]"
          >
            <div
              ref="elItem"
              class="w-full min-w-222px bg-[#FDFDFD]"
              v-for="room in roomList"
              :key="room"
              s:border="b solid [#F3F4F4]"
            ></div>
          </div>

          <div
            class="absolute left-0 top-0"
            v-for="(data, index) in dataList"
            :style="{
              width: data.w + 'px',
              height: data.h + 'px',
              top: data.y + 'px',
              left: data.x + 'px',
              'box-shadow': '0px 6px 12px 0px rgba(0,0,0,0.05)',
            }"
            :key="index"
          >
            <div
              class="box-border w-full h-full grid grid-cols-[10px,auto,60px] items-center bg-white p-4px"
            >
              <div
                class="h-full w-3px rounded-40"
                s:border="2px solid [#F3F4F4]"
                :class="{
                  '!border-[#2FE095]': data.status === '开放中',
                  '!border-[#FFD13C]': data.status === '执行中',
                  '!border-[#A5A8B4]': data.status === '已关闭',
                }"
                style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
              ></div>
              <div class="grid gap-y-5px h-full">
                <div class="flex self-start gap-x-7px items-center">
                  <img
                    src="@/assets/images/avatar-boy.png"
                    class="w-30px h-30px rounded-full"
                    style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
                  />
                  <span class="font-bold" s:text="sm">Thomas</span>
                </div>
                <div s:text="[#6C766E] xs" class="self-end">
                  当前参与人数：7人
                </div>
              </div>
              <div
                class="w-56px h-26px flex self-start items-center justify-center rounded-40 text-xs text-center"
                :class="{
                  'bg-[#E7FFF2] text-[#2FE095]': data.status === '开放中',
                  'bg-[#FFFAEC] text-[#FFBB00]': data.status === '执行中',
                  'bg-[#F6F7FA] text-[#A5A8B4]': data.status === '已关闭',
                }"
              >
                {{ data.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Header from './modules/Header.vue'
import { useElementSize } from '@vueuse/core'
import Calendar1 from './modules/Calendar.vue'
import { onMounted, ref, unref } from 'vue'
import dayjs from 'dayjs'
const xStart = 0
const yStart = 75
const elItem = ref(null)
const { width, height } = useElementSize(elItem?.value ? elItem.value[0] : null)
const dataList = ref([
  {
    startTime: '13:00',
    time: ['13:00'],
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    name: '教室01',
    status: '开放中',
  },
  {
    startTime: '11:00',
    time: ['11:00', '12:00'],
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    name: '教室02',
    status: '执行中',
  },
  {
    startTime: '12:00',
    time: ['12:00'],
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    name: '室外场',
    status: '已关闭',
  },
  {
    startTime: '15:00',
    time: ['15:00'],
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    name: '教室03',
    status: '已关闭',
  },
])
onMounted(() => {
  console.log(elItem.value[0].clientWidth, elItem.value[0].clientHeight)
  getDataList(elItem.value[0].clientWidth, elItem.value[0].clientHeight)
})
function getDataList(w: number, h: number) {
  dataList.value = dataList.value.map(p => {
    const yIndex = unref(timeList).indexOf(p.startTime)
    const xIndex = unref(roomList).indexOf(p.name)
    // yIndex *1 下边框
    const y = yStart + yIndex * h + 5 + yIndex * 1
    const x = xStart + xIndex * w + 5
    const height = h * p.time.length
    return {
      ...p,
      x,
      y,
      w: w - 10,
      h: height - 10,
    }
  })
}
const router = useRouter()
const selDate = ref()
const selDateList = ref(['2022-8-1', '2022-8-2'])
const roomList = ref(['教室01', '教室02', '教室03', '室外场'])
const timeList = ref([
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
])
// function onSelectChange(date) {
//   selDate.value = date
// }

function onNextMonth() {
  const next = dayjs(selDate.value).add(1, 'month')
  selDate.value = next.format('YYYY-M-D')
}
function onPrevMonth() {
  const prev = dayjs(selDate.value).subtract(1, 'month')
  selDate.value = prev.format('YYYY-M-D')
}
function onJump() {
  router.push({ name: 'MyEvaluationImplementList' })
}
</script>
