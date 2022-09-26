<template>
  <Form
    class="pt-[30px] ml-[30px] w-687px h-full"
    layout="vertical"
    ref="formRef"
    :model="formState"
    :rules="validateRules"
  >
    <Row :gutter="40">
      <Col :span="10">
        <FormItem
          class="flex-reverse-end"
          label="测评名称"
          name="name"
          :wrapper-col="{ span: 12 }"
        >
          <Input
            v-model:value="formState.name"
            placeholder="请输入测评名称"
            class="w-[285px]"
          />
        </FormItem>
      </Col>
      <Col :span="14">
        <FormItem
          class="flex-reverse-end"
          label="测评类型"
          name="type"
          :wrapper-col="{ span: 12 }"
        >
          <Input
            v-model:value="formState.type"
            placeholder="请输入测评类型"
            class="w-[372px]"
          />
        </FormItem>
      </Col>
    </Row>
    <Row>
      <Col :span="10">
        <FormItem
          class="flex-reverse-end"
          label="适用范围"
          name="type"
          :wrapper-col="{ span: 12 }"
        >
          <CheckboxGroup
            class="w-285px"
            v-model:value="formState.scope"
            name="checkboxgroup"
            :options="['按年龄', '按学习阶段']"
          />
        </FormItem>
      </Col>
      <Col :span="3" class="pt-[30px] pl-10px">
        <FormItem>
          <Select
            v-model:value="formState.startAge"
            style="width: 75px"
            :options="[{ value: '1岁' }, { value: '2岁' }, { value: '3岁' }]"
            class="select-icon"
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
          </Select>
        </FormItem>
      </Col>
      <Col :span="3" class="pt-[30px] ml-10px">
        <FormItem>
          <Select
            v-model:value="formState.startMonth"
            style="width: 80px"
            :options="[
              { value: '0个月' },
              { value: '1个月' },
              { value: '2个月' },
            ]"
            class="select-icon"
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
          </Select>
        </FormItem>
      </Col>
      <Col class="pt-[37px]">至</Col>
      <Col :span="3" class="pt-[30px] ml-10px">
        <FormItem>
          <Select
            v-model:value="formState.endAge"
            style="width: 75px"
            :options="[{ value: '1岁' }, { value: '2岁' }, { value: '3岁' }]"
            class="select-icon"
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
          </Select>
        </FormItem>
      </Col>
      <Col :span="3" class="pt-[30px]">
        <FormItem>
          <Select
            v-model:value="formState.endMonth"
            style="width: 90px"
            :options="[
              { value: '0个月' },
              { value: '1个月' },
              { value: '2个月' },
            ]"
            class="select-icon"
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Col :span="24">
      <FormItem class="flex-reverse-end" label="测评描述" name="name">
        <Textarea
          :rows="5"
          v-model:value="formState.desc"
          placeholder="请输入测评描述"
        ></Textarea>
      </FormItem>
    </Col>
    <Col :span="24">
      <FormItem label="测评项目标准和计算方式">
        <span class="text-[#F3AB51] text-xs flex font-400 w-900px"
          >学生体质健康标准测评各项目的标准分为100分，且各项目占比的权重不同，1-2年级的重点项目是“坐位体前屈”和“1分钟跳绳”，
          特别是1分钟跳绳，有20分的加分，测评总分为120分</span
        >
      </FormItem>
    </Col>
    <Col :span="24">
      <Table
        :columns="columns"
        :data-source="data"
        size="small"
        class="border-1 border-[#DBDFDD] rounded-8px"
        bordered
        :pagination="false"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'sortIndex'">
            <span class="font-bold"> {{ parseInt(index) + 1 }}. </span>
          </template>
        </template>
      </Table>
    </Col>
    <FormItem label="测评综合得分评价表" class="mt-30px">
      <span class="text-[#F3AB51] text-xs flex w-900px"
        >1-2年级的体质健康测评也分为四个等级，下表是等级和综合分数的对比</span
      >
    </FormItem>
    <Table
      :columns="columnsScore"
      :data-source="dataScore"
      size="small"
      class="border-1 border-[#DBDFDD] rounded-8px"
      bordered
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'level'">
          <span class="font-bold"> {{ record.level }} </span>
        </template>
      </template>
    </Table>
    <!-- <FormItem label="" class="mt-30px"> -->
    <span class="text-[#F3AB51] text-xs flex font-400 w-900px my-30px"
      >以上数据源自《国家学生体质健康标准(2014年版)》</span
    >
    <!-- </FormItem> -->
  </Form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  Form,
  FormItem,
  Col,
  Row,
  Space,
  Input,
  CheckboxGroup,
  Select,
  Textarea,
  Table,
  TableColumnsType,
} from 'ant-design-vue'
const formState = reactive({
  name: '国家学生体质健康标准测评(1-2年级)',
  type: '身体素质类',
  scope: null,
  desc: '《国民体质测定标准(幼儿版)》运用科学的方法，对3-6周岁的中国幼儿进行个体的形态、机能和身体素质等的测试与评定。所有测评项目，都按性别和年龄分组，3-5岁每0.5岁为一组，6岁为一个组。是目前国内最权威的，针对学龄前儿童的身体素质类测试。',
  startAge: '3岁',
  endAge: '10岁',
  startMonth: '0个月',
  endMonth: '11个月',
})
const validateRules = reactive({
  name: [{ required: true, message: '请输入测评名称' }],
  type: [{ required: true, message: '请输入测评类型' }],
  scope: [{ required: true, message: '请选择适用范围' }],
  desc: [{ required: true, message: '请输入测评描述' }],
})
const columns = ref<TableColumnsType>([
  {
    title: '',
    key: 'sortIndex',
    align: 'center',
  },
  {
    title: '测评项目名称',
    dataIndex: 'projectName',
    align: 'left',
  },
  {
    title: '评测项目标准分',
    dataIndex: 'standardScore',
    align: 'center',
  },
  {
    title: '各项目在测试中的权重',
    dataIndex: 'weight',
    align: 'center',
  },
  {
    title: '占测评总分的分数',
    dataIndex: 'percentScore',
    align: 'center',
  },
])
const data = ref([
  {
    projectName: '体重指数(BMI)',
    standardScore: '100分',
    weight: '15%',
    percentScore: '15分',
  },
  {
    projectName: '肺活量',
    standardScore: '100分',
    weight: '15%',
    percentScore: '15分',
  },
  {
    projectName: '50米跑',
    standardScore: '100分',
    weight: '20%',
    percentScore: '20分',
  },
  {
    projectName: '坐位体前屈',
    standardScore: '100分',
    weight: '30%',
    percentScore: '30分',
  },
  {
    projectName: '1分钟跳绳',
    standardScore: '100分',
    weight: '20%',
    percentScore: '20分',
  },
  {
    projectName: '加分项（1分钟跳绳）',
    standardScore: '',
    weight: '',
    percentScore: '20分',
  },
])
const columnsScore = ref<TableColumnsType>([
  {
    title: '等级',
    dataIndex: 'level',
    key: 'level',
    align: 'center',
    width: 120,
  },
  {
    title: '得分',
    dataIndex: 'score',
    align: 'center',
  },
])
const dataScore = ref([
  {
    level: '优秀',
    score: '>=90',
  },
  {
    level: '良好',
    score: '80.0-89.9',
  },
  {
    level: '合格',
    score: '60.0-79.9',
  },
  {
    level: '不及格',
    score: '<=59.9',
  },
])
</script>

<style lang="less">
.table-noborder {
  td {
    border-bottom: none !important;
  }
}
</style>
