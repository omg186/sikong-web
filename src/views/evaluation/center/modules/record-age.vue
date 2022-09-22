<template>
  <div class="record-body">
    <div class="flex items-center">
      <div class="w-317px">
        <div class="text-[#83867E] text-xs">测评卷编号</div>
        <div class="text-[#343C37] font-medium font-shs font-sm">
          2014214567650
        </div>
      </div>
      <div class="text-[24px] text-[#1f311f] font-bold">
        {{ props.titleName }}
      </div>
    </div>
    <div v-for="(title, key) in typeList">
      <div class="text-[#1F311F] font-bold mt-50px mb-19px">
        {{ title }}
      </div>

      <div
        v-if="key === 2"
        class="flex w-300px h-32px overflow-hidden mb-30px"
        s:border="rounded-40 1px solid [#EDEFED]"
      >
        <div
          class="flex items-center justify-center w-150px cursor-pointer"
          s:text="[#83867E] xs"
          :class="{ 'bg-[#525A64] !text-white rounded-40': active === 1 }"
          @click="active = 1"
        >
          身体移动发展子测试
        </div>

        <div
          class="flex items-center justify-center w-150px cursor-pointer"
          s:text="[#83867E] xs"
          :class="{ 'bg-[#525A64] !text-white rounded-40': active === 2 }"
          @click="active = 2"
        >
          物体控制发展子测试
        </div>
      </div>
      <Table
        :columns="columns[key]"
        :data-source="data[key]"
        size="small"
        class="border-1 border-[#DBDFDD] rounded-8px text-[#6C766E] text-xs"
        row-class-name="text-[#83867E] text-xs"
        :pagination="false"
      >
        <template #bodyCell="{ text, record, index, column }">
          <div
            class="bg-[#F4F4F4] w-66px h-20px ml-24px rounded-4px"
            v-if="key === 0"
          >
            <span> &nbsp;</span>
          </div>
          <div
            class="bg-[#F4F4F4] w-66px h-20px ml-51px rounded-4px"
            v-if="key === 1"
          >
            <span> &nbsp;</span>
          </div>
          <template v-if="key === 2">
            <span
              class="text-[#A9ACA4] text-xs font-400"
              v-if="column.dataIndex === 'matter'"
              >{{ text }}</span
            >
            <template v-else-if="column.dataIndex === 'name'">
              <span
                v-if="
                  index === 0 ||
                  index === 5 ||
                  index === 10 ||
                  index === 16 ||
                  index === 20 ||
                  index === 25
                "
                class="text-[#2D3A2F] font-bold"
              >
                {{ text }}</span
              >
              <span v-else class="text-[#A9ACA4] font-400"> {{ text }}</span>
            </template>

            <Checkbox
              class="text-[#6C766E] text-xs"
              v-else-if="column.dataIndex === 'isMaster'"
              >掌握</Checkbox
            >
            <span v-else-if="column.dataIndex === 'score'" class="gray-input">
              <input type="text" class="!w-52px" />
              <span>分</span>
            </span>

            <template v-else>
              <Checkbox class="text-[#6C766E] text-xs">通过</Checkbox>
              <Checkbox class="text-[#6C766E] text-xs">未通过</Checkbox>
            </template>
          </template>
        </template>
      </Table>
    </div>
    <div class="flex items-center mt-30px justify-end">
      <span class="text-[#2D3A2F] text-xs font-400">助理签字区</span>
      <div
        class="bg-[#F4F4F4] w-160px h-40px ml-19px text-right pr-6px rounded-4px flex items-center justify-end"
      ></div>
      <span class="ml-40px mr-18px text-[#2D3A2F] text-xs font-400"
        >主考签字区</span
      >
      <div
        class="bg-[#F4F4F4] w-160px h-40px text-right pr-6px rounded-4px flex items-center justify-end"
      ></div>
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
const props = defineProps({
  titleName: {
    type: String,
    default: '',
  },
})
const active = ref(1)
const sharedOnCell = (_, key) => {
  if (
    key === 0 ||
    key === 5 ||
    key === 10 ||
    key === 16 ||
    key === 20 ||
    key === 25
  ) {
    return { colSpan: 3 }
  }
}
const zeroOnCell = (_, key) => {
  if (
    key === 0 ||
    key === 5 ||
    key === 5 ||
    key === 10 ||
    key === 16 ||
    key === 20 ||
    key === 25
  ) {
    return { colSpan: 0 }
  }
}
const columns = ref<TableColumnsType[]>([
  [
    {
      title: '测评人ID',
      dataIndex: 'id',
      align: 'center',
      key: 'perch',
    },
    {
      title: '测评人姓名(昵称',
      dataIndex: 'name',
      align: 'left',
      key: 'perch',
    },
    {
      title: '测评人生日',
      dataIndex: 'birthday',
      align: 'center',
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
      align: 'center',
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
      width: 250,
      align: 'left',
      key: 'perch',
      customCell: sharedOnCell,
    },
    {
      title: '测试1数据',
      dataIndex: 'test1',
      align: 'center',
      customCell: zeroOnCell,
    },
    {
      title: '测试2数据',
      dataIndex: 'test2',
      align: 'center',
      customCell: zeroOnCell,
    },
    {
      title: '是否掌握',
      dataIndex: 'isMaster',
      align: 'center',
    },
    {
      title: '原始得分',
      dataIndex: 'score',
      width: 78,
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
      name: '跑步',
    },
    {
      name: '移动对侧手臂和腿，肘部弯曲',
    },
    {
      name: '双脚离开地面短暂时间',
    },
    {
      name: '脚掌或脚后跟着地(既：不是全脚掌着地)',
    },
    {
      name: '非支撑腿弯曲度大约在90度左右',
    },

    {
      name: '马步跳',
    },
    {
      name: '跳跃时手臂弯曲至与腰部水平',
    },
    {
      name: '前脚向前迈一步，后脚再向前迈一步，到达 与前脚相邻或稍后的位置',
    },
    {
      name: '有一个短暂的时间，双脚同时离开地面',
    },
    {
      name: '保持连续四次马步跳在同一节奏上',
    },
    { name: '单脚连续跳' },
    { name: '非支撑腿通过向前摆动的方式获得力量' },
    { name: '非支撑腿的脚始终保持在身体后面' },
    { name: '手臂固定并向前摆动产生力量' },
    { name: '能使用惯用(优势)脚连贯地完成三次跳起落地动作' },
    { name: '能使用非惯用(非优势)脚连贯地完成三次跳起和落地动作' },
    { name: '跨步跳' },
    { name: '一只脚跳起，另一只脚落地' },
    { name: '双脚同时离开地面一段时间，这个时间长于跑步的时间' },
    { name: '前脚的对侧手臂，向前伸展' },
    { name: '水平跳' },
    { name: '准备动作包括双膝屈曲，两只手臂向身体后方伸展' },
    { name: '手臂有力地向前向上伸展，完全伸展到头部以上' },
    { name: '双脚同时起跳并落地' },
    { name: '着陆是双臂向下推' },
    { name: '侧滑步' },
    { name: '身体侧转，这样双肩与地面的线对齐' },
    {
      name: '主导脚(lead foot)侧移一步后，被动脚也侧移一步， 这一步的落点是主导脚下一步的落点',
    },
    { name: '至少向右连贯地完成四次滑步动作' },
    { name: '至少向左连贯地完成四次滑步动作' },
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
