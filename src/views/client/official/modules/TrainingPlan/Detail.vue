<template>
  <div>
    <div v-show="!visibleHistory">
      <p class="flex items-center cursor-pointer" @click="onBack">
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
            @click="visibleHistory = true"
          >
            历史计划
          </p>
          <Button
            type="primary"
            class="rounded-full"
            @click="visibleAddPlan = true"
          >
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
      <div
        s:border="3px solid [#C1F6DF] rounded-sm"
        class="relative p-20px my-20px overflow-hidden"
      >
        <div
          class="absolute w-150px py-3px bg-primary transform rotate-45 top-25px right-[-35px]"
          s:text="white center"
        >
          当前计划
        </div>
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
              <TextItem
                title="执行时间"
                contents="2022.7.1-2022.8.31"
              ></TextItem>
              <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
              <div class="flex justify-between cursor-pointer">
                <TextItem title="创建时间" contents="2022.6.28"></TextItem>
                <div
                  class="flex fill-[#A9ACA4]"
                  s:text="xs [#A9ACA4]"
                  s:hover="text-black fill-black"
                >
                  <SvgIcon name="modify" class="w-24px h-17px"></SvgIcon>
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
              <TextItem
                title="执行时间"
                contents="2022.7.1-2022.8.31"
              ></TextItem>
              <TextItem title="创建人" contents="张艳玲(猫猫)"></TextItem>
              <div class="flex justify-between cursor-pointer">
                <TextItem title="创建时间" contents="2022.6.28"></TextItem>
                <div
                  class="flex fill-[#A9ACA4]"
                  s:text="xs [#A9ACA4]"
                  s:hover="text-black fill-black"
                >
                  <SvgIcon name="modify" class="w-24px h-17px"></SvgIcon>
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
        <div class="relative h-98px" s:border="rounded-8px 3px solid [#C1F6DF]">
          <SvgIcon
            name="play"
            class="inline-block w-36px h-36px fill-black cursor-pointer absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]"
            s:active="fill-[#707070]"
            @click="visibleStartPlan = true"
          ></SvgIcon>
        </div>
        <div class="flex flex-col justify-center gap-y-10px">
          <span s:font="bold">
            对应课程：立定跳远基础训练课-掌握关键技术动作
          </span>
          <span s:text="xs [#999999]">时长: 12分30秒 完成度: 100% </span>
          <span s:text="xs [#F3AB51]">
            适合没有立定跳远基础和基础薄弱的学生，课程和训练目标是掌握立定跳远关键技术动作的训练方法
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
    <div v-show="visibleHistory">
      <History @back="visibleHistory = false"></History>
    </div>
    <Modal
      v-model:visible="visibleStartPlan"
      :footer="null"
      class="video-modal"
      width="660px"
      :bodyStyle="{ padding: 0 }"
    >
      <div class="relative w-full">
        <!-- <Button
          type="primary"
          size="large"
          class="absolute z-10 right-20px bottom-20px flex items-center gap-x-5px rounded-full"
          @click="visibleStartPlan = true"
        >
          开始训练
          <template #icon>
            <img src="@/assets/images/play-ok.png" class="w-15px h-15px" />
          </template>
        </Button> -->
        <video
          class="w-full"
          :style="{ borderRadius: '20px 20px 0px 0px' }"
          controls
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="p-30px bg-white rounded-b-20px">
        <div class="flex justify-between items-center">
          <p s:text="" s:font="bold">
            白河狸冠军体能立定跳远基础训练计划的内容
          </p>
          <span s:text="xs [#999999]">16个动作</span>
        </div>
        <div class="min-h-86px flex gap-x-10px pt-26px">
          <div
            class="w-36px h-86px flex-shrink-0 flex justify-center items-center h-full px-10px flex-shrink-0 text-center bg-[#F9F9F9] rounded-sm"
            s:text="xs [#83867E]"
          >
            热身运动
          </div>
          <div
            class="overflow-hidden flex-shrink-0 relative h-86px"
            style="transform: translateZ(0); touch-action: pan-y"
          >
            <div class="flex gap-x-10px">
              <div
                v-for="(action, index) in actionList"
                :key="index"
                class="relative w-150px h-86px flex rounded-sm overflow-hidden"
              >
                <img src="@/assets/images/logo2.png" class="w-full h-full" />
                <div
                  class="absolute bottom-0 left-0 w-full h-31px flex justify-between items-center px-10px bg-[#000000]"
                  s:text="white xs"
                  :style="{
                    background: 'rgba(0,0,0,0.3)',
                  }"
                >
                  <span>{{ action.name }}{{ index }}</span>
                  <span>20秒</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="w-36px h-86px flex-shrink-0 flex justify-center items-center h-full px-10px flex-shrink-0 text-center bg-[#F9F9F9] rounded-sm"
            s:text="xs [#83867E]"
          >
            第 1 组
          </div>
          <div
            class="next z-10 right-10px justify-end h-86px flex items-center h-24px rounded-10px cursor-pointer"
          >
            <SvgIcon
              name="down"
              class="w-20px h-10px transform rotate-270"
            ></SvgIcon>
          </div>
        </div>
        <p s:text="[#F3AB51] xs" class="pt-27px">
          本训练计划适合没有立定跳远基础和基础薄弱的学生，课程和训练目标是掌握立定跳远关键技术动作的训练方法
        </p>
        <div
          class="w-300px min-h-108px px-15px pb-10px bg-[#F9F9F9]"
          s:border="1px solid [#F9F9F9]"
        >
          <p s:font="bold" class="pt-20px">对训练内容不熟悉？先看课程视频吧</p>
          <div class="grid grid-cols-[46px,auto] gap-x-10px">
            <div class="h-46px rounded-8px overflow-hidden bg-light-900"></div>
            <div s:text="xs" class="flex flex-col justify-center gap-y-5px">
              <span s:text="[#83867E]">立定跳远专项课第二讲《基础训练课》</span>
              <span
                class="underline"
                s:text="primary"
                s:underline="offset-2 primary"
              >
                播放课程
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <!-- 添加训练计划 -->
    <Modal
      v-model:visible="visibleAddPlan"
      width="660px"
      title="添加训练计划"
      :footer="null"
    >
      <AddPlan></AddPlan>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { Button, Modal, Table, TableColumnsType } from 'ant-design-vue'
import TextItem from '@/components/TextItem.vue'
import { ref } from 'vue'
import AddPlan from './Add.vue'
import History from './History.vue'
const activeIndex = ref(0)
const visibleStartPlan = ref(false)
const visibleAddPlan = ref(false)
const visibleHistory = ref(false)
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
const actionList = ref([
  { name: '脚踝环绕' },
  { name: '脚踝环绕' },
  { name: '脚踝环绕' },
])
const emits = defineEmits(['back'])
function onBack() {
  emits('back')
}
</script>

<style lang="scss">
.video-modal {
  .ant-modal-content {
    background-color: transparent;
    .ant-modal-close-x {
      svg {
        fill: white !important;
      }
    }
  }
}
</style>
