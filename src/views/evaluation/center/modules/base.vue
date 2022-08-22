<template>
  <Form
    class="pt-[35px] ml-[30px] w-687px h-full"
    layout="vertical"
    ref="formRef"
    :model="formState"
    :rules="validateRules"
  >
    <Row :gutter="10">
      <Col :span="10">
        <FormItem label="测评名称" name="name" :wrapper-col="{ span: 12 }">
          <Input
            v-model:value="formState.name"
            placeholder="请输入测评名称"
            class="w-[285px]"
          />
        </FormItem>
      </Col>
      <Col :span="14">
        <FormItem label="测评类型" name="type" :wrapper-col="{ span: 12 }">
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
        <FormItem label="适用范围" name="type" :wrapper-col="{ span: 12 }">
          <RadioGroup
            class="w-285px"
            v-model:value="formState.scope"
            name="checkboxgroup"
            :options="['按年龄', '按学习阶段']"
          />
        </FormItem>
      </Col>
      <Col :span="3" class="pt-[30px]">
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
      <Col :span="3" class="pt-[30px] mr-10px">
        <FormItem>
          <Select
            v-model:value="formState.startMonth"
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
      <FormItem label="测评描述" name="name">
        <Textarea
          :rows="6"
          v-model:value="formState.desc"
          placeholder="请输入测评描述"
        ></Textarea>
      </FormItem>
    </Col>
    <Col :span="24">
      <FormItem label="测评项目标准和计算方式">
        <span class="text-[#F3AB51] text-xs flex w-900px"
          >幼儿版的《国民体质测定标准》一共包含了8个项目，每个项目的标准分都是5分(具体的项目评分标准见测评项目列表)，且每个项目的权重都一样，测评总分为40分</span
        >
      </FormItem>
    </Col>
    <Col :span="24">
      <Table
        :columns="columns"
        :data-source="data"
        size="small"
        class="border-1 border-[#DBDFDD] rounded-8px"
        row-class-name="table-noborder"
        :pagination="false"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.key === 'sortIndex'">
            <span class="font-bold"> {{ parseInt(index) + 1 }}. </span>
          </template>
        </template>
      </Table>
    </Col>
    <FormItem label="测评得分与等级对照表" class="mt-30px">
      <span class="text-[#F3AB51] text-xs flex w-900px"
        >幼儿版的体质测定标准分为四个等级，综合标准分数与等级对照如下表</span
      >
    </FormItem>
    <Table
      :columns="columnsScore"
      :data-source="dataScore"
      size="small"
      class="border-1 border-[#DBDFDD] rounded-8px"
      row-class-name="table-noborder"
      :pagination="false"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'level'">
          <span class="font-bold"> {{ record.level }} </span>
        </template>
      </template>
    </Table>
    <!-- <FormItem label="" class="mt-30px"> -->
    <span class="text-[#F3AB51] text-xs flex w-900px mt-30px"
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
  RadioGroup,
  Select,
  Textarea,
  Table,
  TableColumnsType,
} from 'ant-design-vue'
const formState = reactive({
  name: '',
  type: '',
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
    title: '项目名称',
    dataIndex: 'projectName',
    align: 'left',
  },
  {
    title: '标准分',
    dataIndex: 'standardScore',
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
    projectName: '身高标准体重',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '身高',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '坐位体前屈',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '双脚连续跳',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '十米折返跑',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '走平衡木',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '立定跳远',
    standardScore: '5分',
    percentScore: '5分',
  },
  {
    projectName: '网球掷远',
    standardScore: '5分',
    percentScore: '5分',
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
    level: '一级(优秀)',
    score: '>31',
  },
  {
    level: '二级(良好)',
    score: '28-31',
  },
  {
    level: '三级(合格)',
    score: '20-27',
  },
  {
    level: '四级(不及格)',
    score: '<20',
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
