<template>
  <div class="record-body">
    <div class="flex items-center">
      <div class="w-317px">
        <div class="text-[#83867E] font-xs">测评卷编号</div>
        <div class="text-[#343C37] font-medium font-shs font-sm">
          2014214567650
        </div>
      </div>
      <div class="text-[24px] text-[#1f311f] font-bold">
        国民体质测定标准测评(幼儿版)
      </div>
    </div>
    <div v-for="(title, index) in typeList">
      <div class="text-[#1F311F] font-bold mt-50px mb-19px">
        {{ title }}
      </div>
      <Table
        :columns="columns[index]"
        :data-source="data[index]"
        size="small"
        class="border-1 border-[#DBDFDD] rounded-8px text-[#6C766E] text-xs"
        row-class-name="text-[#83867E] text-xs"
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record }">
          <div class="bg-[#F4F4F4] w-66px h20px ml-50px" v-if="index !== 2">
            <span> &nbsp;</span>
          </div>
          <template v-if="index === 2">
            <span
              class="text-[#A9ACA4] text-xs"
              v-if="column.dataIndex === 'matter'"
              >{{ text }}</span
            >
            <span
              v-else-if="column.dataIndex === 'name'"
              class="text-[#2D3A2F]"
            >
              {{ text }}</span
            >
            <Checkbox
              class="text-[#6C766E] text-xs"
              v-else-if="column.dataIndex === 'status' && text"
              >{{ text }}</Checkbox
            >
            <div
              class="bg-[#F4F4F4] w-66px h20px ml-50px text-right pr-6px"
              v-else
            >
              {{ text }}
            </div>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TableColumnsType, Table, Checkbox } from 'ant-design-vue'
import { ref } from 'vue'
const typeList = ref([
  '测评人信息(系统自动录入）',
  '测试场地和考官信息',
  '测评项目测评记录',
])
const columns = ref<TableColumnsType[]>([
  [
    {
      title: '测评人姓名(昵称',
      dataIndex: 'name',
      align: 'left',
      key: 'perch',
    },
    {
      title: '测评人性别',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: '测评人年龄',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: '测评人年级',
      dataIndex: 'grade',
      align: 'center',
    },
    {
      title: '测评人惯用手',
      dataIndex: 'idiomatichand',
      align: 'center',
    },
    {
      title: '测评人惯用脚',
      dataIndex: 'idiomaticFeet',
      align: 'center',
    },
  ],
  [
    {
      title: '测评地点',
      dataIndex: 'name',
      align: 'left',
      key: 'perch',
    },
    {
      title: '测评日期',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: '测评人年龄',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: '测评主考人',
      dataIndex: 'grade',
      align: 'center',
    },
    {
      title: '测评助理',
      dataIndex: 'idiomatichand',
      align: 'center',
    },
  ],

  [
    {
      title: '测评项目名称',
      dataIndex: 'name',
      align: 'center',
      key: 'perch',
    },
    {
      title: '测评状态',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: '测试1数据',
      dataIndex: 'test1',
      align: 'center',
    },
    {
      title: '测试2数据',
      dataIndex: 'test2',
      align: 'center',
    },
    {
      title: '记录成绩注意事项',
      dataIndex: 'matter',
      width: 375,
      align: 'center',
    },
  ],
])
const data = ref([
  [
    {
      name: '2',
    },
  ],
  [
    {
      name: '2',
    },
  ],
  [
    {
      name: '体重',
      matter: '使用体重秤测试，记录以千克为单位，保留小数点后1位',
    },
    {
      name: '身高',
      matter: '使用身高计测试，记录以厘米为单位，保留小数点后1位',
    },
    {
      name: '身高标准体重',
      matter:
        '不同的身高段，对应不同的体重区间，体重区间分为正常、偏瘦、瘦、 超重、胖五个等级',
    },
    {
      name: '双脚连续跳',
      status: '无法测试',
      test1: 's',
      test2: 's',
      matter:
        '测试两次，取快值。以秒为单位，保留小数点后一位，小数点后第二位 按"非零进一"原则进位',
    },
    {
      name: '坐位体前屈',
      status: '无法测试',
      test1: 'cm',
      test2: 'cm',
      matter: '测试两次，取最大值。记录以厘米为单位，保留小数点后1位',
    },

    {
      name: '10米折返跑',
      status: '无法测试',
      test1: 's',
      test2: 's',
      matter:
        '测试两次，取快值。以秒为单位，保留小数点后一位，小数点后第二位 按"非零进一"原则进位',
    },
    {
      name: '走平衡木',
      status: '无法测试',
      test1: 's',
      test2: 's',
      matter:
        '测试两次，取快值。以秒为单位，保留小数点后一位，小数点后第二位 按"非零进一"原则进位',
    },
    {
      name: '立定跳远',
      status: '无法测试',
      test1: 'cm',
      test2: 'cm',
      matter:
        '测试两次，取快值。以秒为单位，保留小数点后一位，小数点后第二位 按"非零进一"原则进位',
    },
    {
      name: '网球掷远',
      status: '无法测试',
      test1: 's',
      test2: 's',
      matter:
        '测试两次，取快值。以秒为单位，保留小数点后一位，小数点后第二位 按"非零进一"原则进位',
    },
  ],
])
</script>

<style lang="less" scoped>
.record-body {
  .r-title-list {
    .r-title {
      font-size: 24px;
      color: #1f311f;
      font-weight: bold;
    }
  }
}
</style>
