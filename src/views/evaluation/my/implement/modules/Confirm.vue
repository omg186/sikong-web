<template>
  <div>
    <Row :gutter="[20, 10]">
      <Col :span="12">
        <TextItem title="预约客户" contents="李睿曦"></TextItem>
      </Col>
      <Col :span="12">
        <TextItem title="预约类型" contents="体验与摸底"></TextItem>
      </Col>

      <Col :span="12">
        <TextItem title="申请人" contents="李海(大鱼)"></TextItem>
      </Col>
      <Col :span="12">
        <TextItem
          title="测评项目"
          contents="国家体质测评标准测评(幼儿版)"
        ></TextItem>
      </Col>
      <Col :span="12">
        <TextItem
          title="预约场地时间"
          contents="教室02 2022-8-26 18:00-19:00"
        ></TextItem>
      </Col>
    </Row>
    <div
      class="flex justify-between items-center pt-43px"
      style="line-height: 1"
    >
      <p class="mb-0px">2022年8月26日预约情况表</p>
      <div class="h-full flex justify-end items-center gap-x-10px text-xs">
        <span class="flex items-center gap-5px">
          <i class="w-16px h-16px bg-[#F3F3F3] rounded-full"></i>
          已占
        </span>
        <span class="flex items-center gap-5px">
          <i
            class="w-16px h-16px flex justify-center items-center rounded-6px"
            s:border="1px dashed [#DBDFDD]"
          >
            <SvgIcon name="add" class="w-10px h-10px fill-[#CCCCCC]"></SvgIcon>
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
        <span class="flex items-center gap-5px">
          <i
            class="w-16px h-16px flex justify-center items-center bg-primary rounded-6px"
            s:border="1px solid [#C7F7E3]"
          >
          </i>
          已选测评
        </span>
      </div>
    </div>
    <div
      s:border="1px solid [#DBDFDD]"
      class="min-h-210px grid grid-cols-[auto,125px] rounded-8px text-xs mt-17px"
    >
      <div>
        <div
          class="grid grid-cols-[120px,auto] min-h-38px items-center gap-20px p-8px"
          s:border="b r solid [#F9F9F9]"
          v-for="(v, index) in 5"
        >
          <p class="mb-0px font-bold">教室{{ v }}</p>
          <div class="flex">
            <TimeItemVue
              :times="time"
              :isEdit="false"
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
            >
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <TextItem
        title="预约说明"
        contents="与家长沟通后，时间刚好，可以参加晚点7点的待办测评"
      ></TextItem>
    </div>
    <Form class="pt-20px" layout="vertical">
      <FormItem label="执行人意见">
        <RadioGroup v-model:value="formData.radio">
          <Radio value="agree">同意</Radio>
          <Radio value="disagree">不同意</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="执行人说明">
        <Textarea
          v-model:value="formData.textarea"
          placeholder="请输入处理说明"
          :autosize="{ minRows: 5, maxRows: 10 }"
        ></Textarea>
      </FormItem>
    </Form>

    <!-- 按钮 -->
    <div class="flex gap-15px">
      <CancelButton> 取消 </CancelButton>

      <OkButton> 确定 </OkButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Row,
  Col,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Textarea,
  Button,
} from 'ant-design-vue'

import TextItem from '@/components/TextItem.vue'
import { ref } from 'vue'
import TimeItemVue from '@/views/client/potential/modules/TimeItem.vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const formData = ref({
  radio: 'agree',
  textarea: '',
})
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
const selIndex = ref('0.6')
function onItemClick({ rowIndex, index }) {
  console.log('rowIndex', rowIndex, index)
  selIndex.value = `${rowIndex}.${index}`
}
</script>
