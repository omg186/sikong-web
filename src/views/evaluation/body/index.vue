<template>
  <div class="evaluation-body flex flex-col h-full">
    <div class="evaluation-body-table w-full flex-1 flex flex-col p-30px pb-0">
      <h3 class="flex-shrink-0 mb-30px">测评项目</h3>
      <Table
        class="sikong-table sikong-pagination flex-1"
        :dataSource="listData"
        :columns="columns"
        :scroll="{ x: 1000, y: 800 }"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'name'">
            <div>
              <span class="font-bold">{{ record.name }}</span>
            </div>
          </template>
          <template v-if="column.key === 'title1'">
            <div>
              <span class="font-bold">{{ record.title1 }}</span>
            </div>
          </template>
          <template v-if="column.key === 'childrenList'">
            <div class="grid grid-cols-1 gap-20px">
              <div v-for="(child, i) in record.childrenList" :key="i">
                <span class="font-bold">{{ child.name }}</span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'name1'">
            <Cell
              :record="record"
              :column="column"
              @onSwitchClick="onSwitchClick"
            ></Cell>
          </template>
          <template v-if="column.key === 'name2'">
            <Cell
              :record="record"
              :column="column"
              @onSwitchClick="onSwitchClick"
            ></Cell>
          </template>
          <template v-if="column.key === 'name3'">
            <Cell
              :record="record"
              :column="column"
              @onSwitchClick="onSwitchClick"
            ></Cell>
          </template>
          <template v-if="column.key === 'name4'">
            <Cell
              :record="record"
              :column="column"
              @onSwitchClick="onSwitchClick"
            ></Cell>
          </template>
        </template>
      </Table>
    </div>
    <BodyConfig
      :SelectData="selectData"
      v-model:visible="bodyConfigVisible"
      :title="bodyConfigParams.title"
      :formData="{ ...bodyConfigParams.formData }"
    ></BodyConfig>
  </div>
</template>
<script lang="ts" setup>
import { Table, TableColumnsType, Pagination } from 'ant-design-vue'
import { computed, onMounted, reactive, ref, unref, watch } from 'vue'
import BodyConfig from './modules/config.vue'
import { useRequest } from 'vue-request'
import { getOptionsListApi } from '@/api/select'
import { ItemDto } from './interface'
import Cell from './modules/cell.vue'

const bodyConfigVisible = ref(false)
const bodyConfigParams = reactive<{
  title: string
  formData: { checked: boolean; item: Array<ItemDto> }
}>({
  title: '国民体质测定标准测评(幼儿版)',
  formData: {
    checked: false,
    item: [],
  },
})
const listData = ref([
  {
    name: '与健康相关的身体素质',
    title1: '心肺能力',
    childrenList: [],
  },
  {
    name: '与健康相关的身体素质',
    title1: '上肢力量',
    childrenList: [
      {
        checked: true,
        item: [{ id: '1', value: 100, name: '网球掷远' }],
      },
    ],
  },
  {
    name: '与健康相关的身体素质',
    title1: '核心力量',
    childrenList: [],
  },
  {
    name: '与健康相关的身体素质',
    title1: '肌肉耐力',
    childrenList: [],
  },
  {
    name: '与健康相关的身体素质',
    title1: '柔韧',
    childrenList: [
      {
        checked: true,
        item: [{ id: '1', value: 100, name: '坐位体前屈' }],
      },
    ],
  },
  {
    name: '与健康相关的身体素质',
    title1: '身体成分',
    childrenList: [
      {
        checked: true,
        item: [
          { id: '1', value: 50, name: '身高标准体重' },
          { id: '1', value: 50, name: '身高' },
        ],
      },
    ],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '灵敏',
    childrenList: [
      {
        checked: true,
        item: [{ id: '1', value: 100, name: '10米折返跑' }],
      },
    ],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '平衡',
    childrenList: [
      {
        checked: true,
        item: [{ id: '1', value: 100, name: '走平衡木' }],
      },
    ],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '爆发力',
    childrenList: [],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '速度',
    childrenList: [],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '协调',
    childrenList: [
      {
        checked: true,
        item: [{ id: '1', value: 100, name: '双脚连续跳' }],
      },
    ],
  },
  {
    name: '与运动表现相关的身体素质',
    title1: '反应',
    childrenList: [
      {
        checked: true,
        item: [],
      },
    ],
  },
])

const columns = ref<TableColumnsType>([
  {
    title: '',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
    width: 50,
    customCell: (_, index) => {
      if (
        _.name === '与运动表现相关的身体素质' ||
        _.name === '与健康相关的身体素质'
      ) {
        return {
          rowSpan: index === 0 || index === 6 ? 6 : 0,
        }
      } else {
        return {
          rowSpan: 0,
        }
      }
    },
  },
  {
    title: '',
    dataIndex: 'title1',
    align: 'center',
    key: 'title1',
    width: 100,
  },
  {
    title: '国民体质测定标准测评(幼儿版)',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '国家学生体质健康标准测评(G1-G2)',
    dataIndex: 'name2',
    key: 'name2',
    align: 'center',
  },
  {
    title: '国家学生体质健康标准测评(G3-G4)',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
  {
    title: '国家学生体质健康标准测评(G5-G6)',
    dataIndex: 'name4',
    key: 'name4',
    align: 'center',
  },
])
const { data: selectData } = useRequest(
  () => {
    return getOptionsListApi({
      keyword: '健康',
    })
  },
  { manual: false }
)
// function itemRender(opt: {
//   page: number
//   type: 'prev' | 'next' | 'page' | 'jump-prev' | 'jump-next'
//   originalElement: any
// }): any {
//   console.log(' 222', opt)
//   if (opt.type === 'page') {
//     // opt.originalElement = null
//     // opt.originalElement.children = undefined
//     opt.originalElement.el = null
//     //   //   originalElement.data.class = originalElement.data.class + ' red'
//     return opt.originalElement
//   } else if (opt.type === 'next' || opt.type === 'prev') {
//     // opt.originalElement.children = undefined
//     opt.originalElement.appContext = '下一页'
//     // originalElement.data.class = originalElement.data.class + ' red'
//     return opt.originalElement
//   }
//   // return opt.originalElement
// }
function onSwitchClick(
  value: {
    checked: boolean
    item: { name?: string; value?: number; id?: string }[]
  },
  column: { title: string }
) {
  // listData[index].checked = !listData[index].checked
  // value.checked = !value.checked
  console.log('column', column)
  if (value) {
    bodyConfigParams.formData.checked = value.checked
    bodyConfigParams.formData.item = value.item
  } else {
    bodyConfigParams.formData.checked = false
    bodyConfigParams.formData.item = []
  }
  bodyConfigParams.title = column.title
  bodyConfigVisible.value = true
}
</script>
