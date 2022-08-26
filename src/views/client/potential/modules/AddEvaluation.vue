<template>
  <div>
    <Form layout="vertical">
      <Row :gutter="[20, 10]">
        <Col :span="12">
          <!-- 预约客户 -->
          <FormItem label="预约客户">
            <Input type="text" placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <!-- 预约类型 -->
        <Col :span="12">
          <FormItem label="预约类型">
            <Input type="text" placeholder="请输入预约类型" />
          </FormItem>
        </Col>
        <!-- 预约名称 -->
        <Col :span="12">
          <FormItem label="预约名称">
            <Input type="text" placeholder="请输入预约名称" />
          </FormItem>
        </Col>
        <!-- 测评项目 -->
        <Col :span="12">
          <FormItem label="测评项目">
            <Select placeholder="请选择测评项目" class="min-w-118px">
              <SelectOption value="1">男</SelectOption>
              <SelectOption value="2">女</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="预约场地时间">
            <DatePicker class="w-full" placeholder="预约场地时间" />
          </FormItem>
        </Col>
        <Col :span="12">
          <div
            class="w-full h-full flex justify-end items-center gap-x-10px text-xs"
          >
            <span class="flex items-center gap-5px">
              <i class="w-16px h-16px bg-[#F3F3F3] rounded-full"></i>
              已占
            </span>
            <span class="flex items-center gap-5px">
              <i
                class="w-16px h-16px flex justify-center items-center rounded-6px"
                s:border="1px dashed [#DBDFDD]"
              >
                <SvgIcon
                  name="add"
                  class="w-10px h-10px fill-[#CCCCCC]"
                ></SvgIcon>
              </i>
              可约
            </span>
            <span class="flex items-center gap-5px">
              <i
                class="w-16px h-16px flex justify-center items-center rounded-6px"
                s:border="1px solid [#C7F7E3]"
              >
              </i>
              待办测评
            </span>
          </div>
        </Col>
      </Row>
      <div
        s:border="1px solid [#DBDFDD]"
        class="min-h-210px grid grid-cols-[auto,125px] rounded-8px text-xs"
      >
        <div>
          <div
            class="grid grid-cols-[120px,auto] min-h-38px items-center gap-20px p-8px"
            s:border="b r solid [#F9F9F9]"
            v-for="(v, index) in 5"
          >
            <p class="mb-0px font-bold">教室{{ v }}</p>
            <div class="flex">
              <TimeItem
                :times="time"
                :time-data="timeData[index]"
                :selIndex="selIndex"
                :rowIndex="index"
                @on-item-click="onItemClick"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 justify-start py-10px pl-10px">
          <span class="font-bold">测评地点</span>
          <span class="text-[#6C766E]">教室01</span>
          <span class="font-bold">测评时间</span>
          <span class="text-[#6C766E]">教室01</span>
          <span class="font-bold">主考官</span>
          <span class="text-[#6C766E]">教室01</span>
          <span class="font-bold">报名人数</span>
          <span class="text-[#6C766E]">教室01</span>
        </div>
      </div>
      <div
        class="min-h-50px grid grid-cols-[125px,auto,125px] gap-20px rounded-8px text-xs"
      >
        <div class="col-start-2 flex">
          <div v-for="t in time" class="w-46px">
            <div class="relative flex flex-col">
              <i class="absolute left-2px w-1px h-8px bg-[#DBDFDD]"></i>
              <span
                class="absolute left-[-50%] top-10px transform translate-x-1/4"
                >{{ t }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <FormItem label="预约说明">
        <Textarea
          placeholder="请输入预约说明"
          type="textarea"
          :auto-size="{ minRows: 5, maxRows: 10 }"
        />
      </FormItem>
      <!-- 按钮 -->
      <div class="flex gap-15px mt-20px">
        <Button class="btn cancel h-40px w-90px" @click="onCancel">
          取消
        </Button>

        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="onSubmit"
        >
          保存
        </Button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Textarea,
  Radio,
  DatePicker,
  Select,
  SelectOption,
  Button,
  Modal,
} from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'
import TimeItem from './TimeItem.vue'
// 营业时间 time 10:00
const time = [
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
]
// 营业时间data
const timeData = [
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 1, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
  [
    { status: 1, time: '10:00' },
    { status: 2, time: '11:00' },
    { status: 2, time: '12:00' },
    { status: 2, time: '13:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 3, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 1, time: '10:00' },
    { status: 2, time: '10:00' },
    { status: 2, time: '10:00' },
    { status: 1, time: '10:00' },
  ],
]
const selIndex = ref('0.0')
// emits
const emits = defineEmits(['onSubmit', 'onCancel'])
// 取消 按钮
const onCancel = () => {
  emits('onCancel')
}
// 保存 按钮
const onSubmit = () => {
  emits('onSubmit', {})
}
function onItemClick({ rowIndex, index }) {
  console.log('rowIndex', rowIndex, index)
  selIndex.value = `${rowIndex}.${index}`
}
</script>
