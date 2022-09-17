<template>
  <Form layout="vertical">
    <Row :gutter="[10, 20]">
      <Col :span="12">
        <!-- 计划名称 -->
        <FormItem label="计划名称">
          <Input type="text" placeholder="请输入计划名称" />
        </FormItem>
      </Col>
      <Col :span="12">
        <!-- 计划针对的专项项目/素质 -->
        <FormItem label="计划针对的专项项目/素质">
          <Input type="text" placeholder="请输入计划针对的专项项目/素质" />
        </FormItem>
      </Col>
      <Col :span="12">
        <!-- 计划执行人 -->
        <FormItem label="计划执行人">
          <Select
            placeholder="计划执行人"
            mode="multiple"
            class="select-icon min-w-118px"
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
            <SelectOption value="0">计划执行人</SelectOption>
            <SelectOption value="1">意向</SelectOption>
            <SelectOption value="2">正式</SelectOption>
            <SelectOption value="3">流失</SelectOption>
          </Select>
        </FormItem>
      </Col>
      <Col :span="12">
        <!-- 计划时间 -->
        <FormItem label="计划时间">
          <RangePicker :placeholder="['开始时间', '结束时间']" />
        </FormItem>
      </Col>
      <Col :span="12">
        <!-- 训练频度 -->
        <FormItem label="训练频度">
          <Select placeholder="训练频度" class="select-icon min-w-118px">
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
            <SelectOption value="0">计划执行人</SelectOption>
            <SelectOption value="0">训练频度</SelectOption>
            <SelectOption value="1">意向</SelectOption>
            <SelectOption value="2">正式</SelectOption>
            <SelectOption value="3">流失</SelectOption>
          </Select>
        </FormItem>
      </Col>
      <Col :span="24">
        <!-- 锻炼时间 -->
        <FormItem label="锻炼时间">
          <CheckboxGroup v-model:value="formData.week" :options="weekData">
          </CheckboxGroup>
        </FormItem>
      </Col>

      <Col :span="24">
        <!-- 训练计划内容 -->
        <p>训练计划内容</p>
        <Table
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
          :row-key="record => record.value"
          class="text-xs"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'weekPlan'">
              <div s:text="xs [#6C766E]" v-for="(week, i) in record.weekPlan">
                {{ week }}
              </div>
            </template>
            <template v-if="column.key === 'plan'">
              <FormItem>
                <Input type="text" placeholder="请输入训练计划" />
              </FormItem>
            </template>
          </template>
        </Table>
      </Col>
    </Row>
    <!-- 按钮 -->
    <div class="flex gap-15px pt-20px">
      <CancelButton @click="onCancel"> 取消 </CancelButton>

      <OkButton @click="onSubmit"> 保存 </OkButton>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Row,
  Table,
  Col,
  CheckboxGroup,
  Select,
  SelectOption,
  RangePicker,
  Button,
  TableColumnsType,
} from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { computed, ref } from 'vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const weekData = [
  { label: '周日', value: 0 },
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
]
const columns = ref<TableColumnsType>([
  {
    title: '星期',
    dataIndex: 'week',
    key: 'week',
  },
  {
    title: '当前周历计划情况',
    dataIndex: 'weekPlan',
    key: 'weekPlan',
  },
  {
    title: '训练计划',
    dataIndex: 'plan',
    key: 'plan',
  },
])
const formData = ref({
  name: '',
  project: '',
  executor: '',
  time: '',
  frequency: '',
  exerciseTime: '',
  week: [0],
  weekData: [],
})
const dataSource = computed(() => {
  return formData.value.week.map(item => {
    const week = weekData[item]
    return {
      value: week.value,
      week: week.label,
      weekPlan: ['7.1-8.1“肺活量”“坐位体前屈”训练计划', '8.1-8.31 无计划'],
      plan: '',
    }
  })
})
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
</script>
