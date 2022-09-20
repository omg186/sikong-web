<template>
  <div class="p-30px" s:border="1px solid #8b8b8b rounded-8px">
    <div
      class="flex w-220px h-32px overflow-hidden"
      s:border="rounded-40 1px solid [#EDEFED]"
    >
      <div
        class="flex items-center justify-center w-110px cursor-pointer"
        s:text="[#83867E] xs"
        :class="{ 'bg-[#525A64] !text-white rounded-40': active === 1 }"
        @click="active = 1"
      >
        测评一
      </div>

      <div
        class="flex items-center justify-center w-110px cursor-pointer"
        s:text="[#83867E] xs"
        :class="{ 'bg-[#525A64] !text-white rounded-40': active === 2 }"
        @click="active = 2"
      >
        测评二
      </div>
    </div>
    <Form layout="vertical" class="mt-20px">
      <p class="" s:font="bold" v-if="active === 1">
        国民体质测定标准测评(幼儿版)
      </p>
      <p class="" s:font="bold" v-if="active === 2">
        国家学生健康体质标准测评(1-2年级版/3-4年级版/5-6年级版/初中男版/初中女版)
      </p>
      <Row :gutter="[20, 10]">
        <Col :span="8">
          <!-- 记录内容 -->
          <FormItem
            label="测试次数"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试次数' }]"
          >
            <Input type="text" placeholder="测试次数" />
          </FormItem>
        </Col>
        <!-- 昵称 -->
        <Col :span="8">
          <FormItem
            label="测评结果取值方法"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测评结果取值方法' }]"
          >
            <Input type="text" placeholder="测评结果取值方法" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem
            label="测量要求"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测量要求' }]"
          >
            <Input type="text" placeholder="测量要求" />
          </FormItem>
        </Col>
      </Row>
      <p s:text="14px" s:font="bold" class="pb-20px">测评记录单的展现样式</p>
      <div s:border="1px solid #8b8b8b rounded-8px">
        <Table
          :bordered="false"
          :columns="columns"
          :pagination="false"
          :data-source="tableList"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <div class="">
                <span class="font-bold text-black">{{ record.name }}</span>
              </div>
            </template>
            <template v-if="column.key === 'name4'">
              <div class="">
                <span class="text-xs text-[#A9ACA4]">{{ record.name4 }}</span>
              </div>
            </template>
            <template v-if="column.key === 'name1'">
              <div class="h-20px bg-[#F4F4F4]"></div>
            </template>
          </template>
        </Table>
      </div>
      <FormItem
        label="评分表内容"
        class="flex-reverse-end pt-30px"
        :rules="[{ required: true, message: '' }]"
      >
        <span s:text="[#F3AB51] 12px" v-if="active === 1">
          在本测评中,项目标准分为5分,数据按照年龄分组，从3岁零个月到6岁零个月以上，一共分成7个年龄组。每个组级根据原始的测
          量数据对应不同的标准分数。
        </span>
        <span s:text="[#F3AB51] 12px" v-if="active === 2">
          在本测评中,标准分为100分。其中：[90-100]为优秀，[80,90)为良好，[60,80)为及格，60以下为不及格。从小学一年级到初中
          三年级，共分为九个组级。每个组级根据原始的测量数据对应不同的标准分数。
        </span>
      </FormItem>
      <div class="flex gap-x-20px" s:text="12px [#A9ACA4]">
        <div class="cursor-pointer" s:text="[#2D3E2D]" s:font="bold">
          女生组评分表
        </div>
        <div class="cursor-pointer">男生组评分表</div>
      </div>
      <div
        s:border="1px solid #8b8b8b rounded-8px"
        class="mt-20px"
        v-if="active === 1"
      >
        <Table
          class="sikong-table-2"
          :bordered="false"
          :columns="columns1"
          :pagination="false"
          :data-source="tableList1"
        >
        </Table>
      </div>

      <Table
        v-if="active === 2"
        class="sikong-table-2 page-next-prev mt-20px"
        :bordered="false"
        :pagination="{ pageSize: 50, current: 1 }"
        :columns="columns2"
        :data-source="tableList2"
      >
      </Table>
      <p class="pt-20px" s:text="[#F3AB51] 12px" v-if="active === 1">
        以上数据源自《国民体质测定标准手册(幼儿部分)》
      </p>
      <p class="pt-20px" s:text="[#F3AB51] 12px" v-if="active === 2">
        以上数据源自《国家学生体质健康2014版》
      </p>
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
  Table,
  RadioGroup,
  Radio,
  DatePicker,
  Select,
  SelectOption,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Button,
  Modal,
  TableColumnsType,
} from 'ant-design-vue'
import { toArray } from 'lodash-es'
import SelectProject from '@/components/SelectModal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'
import Tag from '@/components/Tag.vue'
import { getCompanyProjectList } from '@/api/company'
import { useRequest } from 'vue-request'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const contact = ref([1])
const active = ref(1)
const formData = ref({
  projectSelect: [],
  exerciseSelect: [{ id: 1 }, { id: 4 }],
  exerciseSelectName: '',
  projectSelectName: '',
  traitSelect: [],
  traitSelectName: '',
})
const isSelect = ref(false)
const isTrait = ref(false)
const { data: projectData, loading } = useRequest(
  () => {
    return getCompanyProjectList()
  },
  { manual: false }
)
const tableList = [
  {
    name: '坐位体前屈',
    name4: '测试两次，取最大值。记录以厘米 为单位，保留小数点后1位',
  },
]
const tableList1 = [
  {
    name: '5',
    name1: '15.9',
  },
  {
    name: '4',
    name1: '15.9',
  },
  {
    name: '3',
    name1: '15.9',
  },
  {
    name: '2',
    name1: '15.9',
  },
  {
    name: '1',
    name1: '15.9',
  },
]
const tableList2 = [
  {
    name: '100',
    name1: '15.9',
    level: '优秀',
  },
  { name: '95', name1: '15.9', level: '优秀' },
  { name: '90', name1: '15.9', level: '优秀' },
  { name: '85', name1: '15.9', level: '良好' },
  { name: '80', name1: '15.9', level: '良好' },
  { name: '78', name1: '15.9', level: '及格' },
  { name: '76', name1: '15.9', level: '及格' },
  { name: '74', name1: '15.9', level: '及格' },
  { name: '72', name1: '15.9', level: '及格' },
  { name: '68', name1: '15.9', level: '及格' },
  { name: '66', name1: '15.9', level: '及格' },
  { name: '64', name1: '15.9', level: '及格' },
  { name: '62', name1: '15.9', level: '及格' },
  { name: '60', name1: '15.9', level: '及格' },
  { name: '50', name1: '15.9', level: '不及格' },
  { name: '40', name1: '15.9', level: '不及格' },
  { name: '30', name1: '15.9', level: '不及格' },
  { name: '20', name1: '15.9', level: '不及格' },
  { name: '10', name1: '15.9', level: '不及格' },
]
const columns = ref<TableColumnsType>([
  {
    title: '测评项目名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '测评状态',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '测试1结果',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '测试2结果',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '记录成绩注意事项',
    dataIndex: 'name4',
    key: 'name4',
    align: 'center',
  },
])
const columns1 = ref<TableColumnsType>([
  {
    title: '得分',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '3.0-3.5',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '3.6-3.11',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '4.0-4.5',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '4.6-4.11',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '5.0-5.5',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '5.6-5.11',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '6.0以上',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
])
const columns2 = ref<TableColumnsType>([
  {
    title: '得分',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '等级',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
    customCell: (_, index, column) => {
      if (index === 0) {
        console.log(_, index, column)
        return { rowSpan: 3 }
      } else if (index === 3) {
        return { rowSpan: 2 }
      } else if (index === 5) {
        return { rowSpan: 9 }
      } else if (index === 14) {
        return { rowSpan: 5 }
      } else {
        return { rowSpan: 0 }
      }
    },
  },
  {
    title: '小学一年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '小学二年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '小学三年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '小学四年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '小学五年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '小学六年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '初中一年级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
])
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
// 添加联系人 按钮
const onAddContact = () => {
  contact.value.push(2)
}

function onSelectProject(selected: Map<number, any>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  console.log('arr', arr)
  //   formData.projectId = toArray(selected.keys())
  formData.value.projectSelect = arr.map(p => p)
  formData.value.projectSelectName = arr.map(p => p.name).join(',')
  isSelect.value = false
}
function onSelectTrait(selected: Map<number, any>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  console.log('arr', arr)
  //   formData.projectId = toArray(selected.keys())
  formData.value.traitSelect = arr.map(p => p)
  formData.value.traitSelectName = arr.map(p => p.name).join(',')
  isTrait.value = false
}
</script>
