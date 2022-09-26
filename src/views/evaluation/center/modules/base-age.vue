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
      <FormItem label="测评描述" name="name">
        <Textarea
          :rows="5"
          v-model:value="formState.desc"
          placeholder="请输入测评描述"
        ></Textarea>
      </FormItem>
    </Col>
    <Col :span="24">
      <FormItem label="测评项目标准和计算方式">
        <span class="text-[#F3AB51] text-xs flex font-400 font-400"
          >粗大动作发展测评TGMD包含两个子测试，”身体移动发展“和”物体控制发展“，下表列出了两个子测试的分项和分数占比，
          测试总分满分均为48分</span
        >
      </FormItem>
    </Col>
    <Row>
      <Col :span="12" v-for="key of 2">
        <Table
          :columns="columns[key - 1]"
          :data-source="data[key - 1]"
          size="small"
          class="border-1 border-[#DBDFDD] rounded-8px"
          :pagination="false"
          bordered
        >
          <template #bodyCell="{ column, record, index, text }">
            <span v-if="index === 0" class="font-bold">{{ text }}</span>
            <template
              v-if="
                column.dataIndex === 'projectName' && key === 1 && index > 0
              "
            >
              <span class="font-bold">
                {{ parseInt(index) + 2 }}. {{ record.projectName }}</span
              >
            </template>
          </template>
        </Table>
      </Col>
    </Row>

    <FormItem label="子测试百分位与标准分评价表" class="mt-30px">
      <span class="text-[#F3AB51] text-xs flex font-400"
        >将测试者获得的子测试原始总分与表中的数据进行比对，得到其所在年龄组所处的百分位。例如：测试者在3岁零四个月时其身体
        移动测评得到27分，表示其身体移动的发展水平在在75%分位上。注意：物体控制子测试需要分性别比对。</span
      >
    </FormItem>
    <div
      class="flex w-570px h-32px overflow-hidden mb-30px"
      s:border="rounded-40 1px solid [#EDEFED]"
    >
      <div
        class="flex items-center justify-center w-190px cursor-pointer"
        s:text="[#83867E] xs"
        :class="{ 'bg-[#525A64] !text-white rounded-40': activeKey === 1 }"
        @click="activeKey = 1"
      >
        身体移动子测试评价表
      </div>

      <div
        class="flex items-center justify-center w-190px cursor-pointer"
        s:text="[#83867E] xs"
        :class="{ 'bg-[#525A64] !text-white rounded-40': activeKey === 2 }"
        @click="activeKey = 2"
      >
        物体控制子测试女生版评价表
      </div>
      <div
        class="flex items-center justify-center w-190px cursor-pointer"
        s:text="[#83867E] xs"
        :class="{ 'bg-[#525A64] !text-white rounded-40': activeKey === 3 }"
        @click="activeKey = 3"
      >
        物体控制子测试男生版评价表
      </div>
    </div>
    <!-- <Tabs v-model:activeKey="activeKey">
      <TabPane key="1" tab="身体移动子测试评价表"></TabPane>
      <TabPane key="2" tab="物体控制子测试女生版评价表"></TabPane>
      <TabPane key="3" tab="物体控制子测试男生版评价表"></TabPane>
    </Tabs> -->
    <Table
      :columns="columnsScore"
      :data-source="listData"
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
    <Col :span="24">
      <FormItem label="子测试与年龄发展评价表">
        <span class="text-[#F3AB51] text-xs flex font-400"
          >将测试者两项子测试原始总分分别与表中的数据进行比对，得到其发展年龄。如果发展年龄大于实际年龄，证明测试者的发展是
          健康的，反之则需要引起重视，增加针对性的训练</span
        >
      </FormItem>
    </Col>
    <Row>
      <Col :span="24">
        <Table
          :columns="columns[2]"
          :data-source="data[2]"
          size="small"
          class="border-1 border-[#DBDFDD] rounded-8px"
          :pagination="false"
          bordered
        >
          <template #bodyCell="{ column, record, index, text }">
            <template v-if="column.dataIndex === 'projectName'">
              <span class="font-bold text-xs"> {{ record.projectName }}</span>
            </template>
            <span v-else class="text-[#6C766E] text-xs">{{ text }}</span>
          </template>
        </Table>
      </Col>
    </Row>
    <Col :span="24">
      <FormItem label="粗大动作发展商评价表">
        <span class="text-[#F3AB51] text-xs flex font-400"
          >将测试者两项子测试的标准分相加获得TGMD标准分总和，通过查询下表就能获得在整体的粗大动作发展方面的百分位和发展商，
          发展商是整个测评最关键的指标，能够判断测试者在粗大动作发展方向的速度，值越大，发展速度越快</span
        >
      </FormItem>
    </Col>
    <Row>
      <Col :span="24">
        <Table
          :columns="columns[3]"
          :data-source="data[3]"
          size="small"
          class="border-1 border-[#DBDFDD] rounded-8px"
          :pagination="false"
          bordered
        >
          <template #bodyCell="{ column, record, index, text }">
            <span class="text-[#6C766E] text-xs">{{ text }}</span>
          </template>
        </Table>
      </Col>
    </Row>
    <span class="text-[#F3AB51] text-xs flex font-400 w-900px my-30px"
      >以上数据源自《国家学生体质健康标准(2014年版)》</span
    >
  </Form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
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
  Tabs,
  TabPane,
  TableProps,
} from 'ant-design-vue'
const formState = reactive({
  name: '粗大动作发展测试-TGMD(3-10岁)',
  type: '动作发展类',
  scope: null,
  desc: '《国民体质测定标准(幼儿版)》运用科学的方法，对3-6周岁的中国幼儿进行个体的形态、机能和身体素质等的测试与评定。所有测评项目，都按性别和年龄分组，3-5岁每0.5岁为一组，6岁为一个组。是目前国内最权威的，针对学龄前儿童的身体素质类测试。',
  startAge: '3岁',
  endAge: '10岁',
  startMonth: '0个月',
  endMonth: '11个月',
})
const activeKey = ref(1)

const validateRules = reactive({
  name: [{ required: true, message: '请输入测评名称' }],
  type: [{ required: true, message: '请输入测评类型' }],
  scope: [{ required: true, message: '请选择适用范围' }],
  desc: [{ required: true, message: '请输入测评描述' }],
})
const columns = ref<TableColumnsType[]>([
  [
    {
      title: '身体移动发展子测试',
      dataIndex: 'projectName',
      colSpan: 4,
    },
    {
      title: '原始数据',
      dataIndex: 'originalData',
      colSpan: 0,
      align: 'center',
    },
    {
      title: '占测评总分的分数',
      colSpan: 0,
      dataIndex: 'percent',
      align: 'center',
    },
  ],
  [
    {
      title: '物体控制发展子测试',
      dataIndex: 'projectName',
      align: 'center',
      colSpan: 4,
    },
    {
      title: '原始数据',
      dataIndex: 'originalData',
      colSpan: 0,
      align: 'center',
    },
    {
      title: '占测评总分的分数',
      colSpan: 0,
      dataIndex: 'percent',
      align: 'center',
    },
  ],
  [
    {
      title: '发展年龄',
      dataIndex: 'projectName',
      align: 'center',
    },
    {
      title: '身体移动子测试原始分',
      dataIndex: 'originalData',
      align: 'center',
    },
    {
      title: '物体控制子测试(女)原始分',
      dataIndex: 'percent',
      align: 'center',
    },
    {
      title: '物体控制子测试(男)原始分',
      dataIndex: 'percentboy',
      align: 'center',
    },
  ],
  [
    {
      title: '粗大动作发展百分位',
      dataIndex: 'projectName',
      align: 'center',
    },
    {
      title: '子测试标准分的和',
      dataIndex: 'originalData',
      align: 'center',
    },
    {
      title: '粗大动作综合发展商',
      dataIndex: 'percent',
      align: 'center',
    },
  ],
])
const data = ref([
  [
    {
      projectName: '项目名称',
      originalData: '原始数据',
      percent: '占测评总分的分数',
    },
    {
      projectName: '跑步',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '马步跳',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '单脚跳',
      originalData: '10分',
      percent: '10分',
    },
    {
      projectName: '跨步跳',
      originalData: '6分',
      percent: '6分',
    },
    {
      projectName: '水平跳',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '侧滑步',
      originalData: '8分',
      percent: '8分',
    },
  ],
  [
    {
      projectName: '项目名称',
      originalData: '原始数据',
      percent: '占测评总分的分数',
    },
    {
      projectName: '击打球',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '拍球',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '抓球',
      originalData: '10分',
      percent: '10分',
    },
    {
      projectName: '踢球',
      originalData: '6分',
      percent: '6分',
    },
    {
      projectName: '投球',
      originalData: '8分',
      percent: '8分',
    },
    {
      projectName: '手滚球',
      originalData: '8分',
      percent: '8分',
    },
  ],
  [
    {
      projectName: '<3-0',
      originalData: '<19',
      percent: '<19',
      percentboy: '<19',
    },
    {
      projectName: '3-0',
      originalData: '19',
      percentboy: '19',
      percent: '19',
    },
    {
      projectName: '3-3',
      originalData: '20-21',
      percentboy: '20-21',
      percent: '20-21',
    },
    {
      projectName: '3-6',
      originalData: '22',
      percentboy: '22',
      percent: '22',
    },
    {
      projectName: '3-9',
      originalData: '23-24',
      percentboy: '23-24',
      percent: '23-24',
    },
    {
      projectName: '4-0',
      originalData: '25',
      percentboy: '25',
      percent: '25',
    },
    {
      projectName: '4-3',
      originalData: '26-27',
      percentboy: '26-27',
      percent: '26-27',
    },
    {
      projectName: '4-6',
      originalData: '28',
      percentboy: '28',
      percent: '28',
    },
    {
      projectName: '4-9',
      originalData: '29',
      percentboy: '29',
      percent: '29',
    },
    {
      projectName: '5-3',
      originalData: '32',
      percentboy: '32',
      percent: '32',
    },
    {
      projectName: '5-6',
      originalData: '33-34',
      percentboy: '33-34',
      percent: '33-34',
    },
    {
      projectName: '5-9',
      originalData: '35',
      percentboy: '35',
      percent: '35',
    },
    {
      projectName: '6-0',
      originalData: '36-37',
      percentboy: '36-37',
      percent: '36-37',
    },
    {
      projectName: '6-3',
      originalData: '38',
      percentboy: '38',
      percent: '38',
    },
    {
      projectName: '6-6',
      originalData: '39',
      percentboy: '39',
      percent: '39',
    },
    {
      projectName: '6-3',
      originalData: '40',
      percentboy: '40',
      percent: '40',
    },
  ],
  [
    {
      projectName: '12',
      originalData: '14',
      percent: '82',
    },
    {
      projectName: '8',
      originalData: '13',
      percent: '79',
    },
    {
      projectName: '5',
      originalData: '12',
      percent: '76',
    },
    {
      projectName: '3',
      originalData: '11',
      percent: '73',
    },
    {
      projectName: '2',
      originalData: '10',
      percent: '70',
    },
    {
      projectName: '1',
      originalData: '9',
      percent: '67',
    },
    {
      projectName: '<1',
      originalData: '8',
      percent: '64',
    },
    {
      projectName: '<1',
      originalData: '7',
      percent: '61',
    },
    {
      projectName: '<1',
      originalData: '6',
      percent: '58',
    },
    {
      projectName: '<1',
      originalData: '5',
      percent: '55',
    },
    {
      projectName: '<1',
      originalData: '4',
      percent: '52',
    },
    {
      projectName: '<1',
      originalData: '3',
      percent: '49',
    },
    {
      projectName: '<1',
      originalData: '2',
      percent: '46',
    },
  ],
])
const listData = computed(() => [
  {
    percentile: '<1%',
    score: 1,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '<1%',
    score: 2,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '1%',
    score: 3,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '2%',
    score: 4,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '5%',
    score: 5,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '9%',
    score: 6,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '16%',
    score: 7,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '25%',
    score: 8,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '37%',
    score: 9,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '50%',
    score: 10,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '63%',
    score: 11,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '75%',
    score: 12,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '84%',
    score: 13,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '91%',
    score: 14,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '95%',
    score: 15,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '98%',
    score: 16,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '99%',
    score: 17,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '>99%',
    score: 18,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '>99%',
    score: 19,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
  {
    percentile: '>99%',
    score: 20,
    one: '35-46',
    two: '35-46',
    three: '35-46',
    four: '35-46',
    five: '35-46',
    six: '35-46',
    seven: '35-46',
    eight: '35-46',
  },
])
const columnsScore = ref<TableColumnsType>([
  {
    title: '百分位',
    dataIndex: 'percentile',
    align: 'center',
    width: 120,
  },
  {
    title: '标准分',
    dataIndex: 'score',
    align: 'center',
  },
  {
    title: '3:0-3:5',
    dataIndex: 'one',
    align: 'center',
  },
  {
    title: '3:6-3:11',
    dataIndex: 'two',
    align: 'center',
  },
  {
    title: '4:0-4:5',
    dataIndex: 'three',
    align: 'center',
  },
  {
    title: '4:6-4:11',
    dataIndex: 'four',
    align: 'center',
  },
  {
    title: '5:0-5:5',
    dataIndex: 'five',
    align: 'center',
  },
  {
    title: '5:6-5:11',
    dataIndex: 'six',
    align: 'center',
  },
  {
    title: '6:0-6:5',
    dataIndex: 'seven',
    align: 'center',
  },
  {
    title: '6:6-6:11',
    dataIndex: 'eight',
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
