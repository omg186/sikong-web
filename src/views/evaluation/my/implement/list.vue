<template>
  <div>
    <Header @click-icon="onJump"></Header>
    <div class="flex items-center ga py-5px pl-30px">
      <span s:text="sm" class="text-primary pr-30px">全部</span>
      <Form layout="inline">
        <FormItem>
          <Select placeholder="测评类型" class="min-w-178px">
            <SelectOption value="0">性别</SelectOption>
            <SelectOption value="1">男</SelectOption>
            <SelectOption value="2">女</SelectOption>
          </Select>
        </FormItem>
        <!-- 客户来源 -->
        <FormItem>
          <Select placeholder="测评状态" class="min-w-48px">
            <SelectOption value="0">客户来源</SelectOption>
            <SelectOption value="1">网络</SelectOption>
            <SelectOption value="2">电话</SelectOption>
            <SelectOption value="3">拜访</SelectOption>
            <SelectOption value="4">其他</SelectOption>
          </Select>
        </FormItem>
        <!-- 客户状态 -->
        <FormItem>
          <Select placeholder="测评场地" class="min-w-118px">
            <SelectOption value="0">客户状态</SelectOption>
            <SelectOption value="1">意向</SelectOption>
            <SelectOption value="2">正式</SelectOption>
            <SelectOption value="3">流失</SelectOption>
          </Select>
        </FormItem>
        <!-- 分割线 -->
        <div class="w-1px mx-20px border-l-1px border-[#f4f4f4]"></div>
        <!-- 创建时间 -->
        <FormItem label="测评时间">
          <RangePicker :placeholder="['开始', '结束']" class="min-w-118px" />
        </FormItem>
        <FormItem>
          <Input
            key="2"
            class="w-200px box-border rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
            placeholder="输入组织者姓名"
          >
            <template #prefix>
              <SvgIcon class="w-18px h-20px" name="search"></SvgIcon>
            </template>
          </Input>
        </FormItem>
      </Form>
    </div>
    <Table
      class="sikong-table flex-1 pt-20px"
      :dataSource="listData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1000, y: 800 }"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'name'">
          <div class="flex gap-10px items-center justify-center cursor-pointer">
            <span
              class="w-30px h-30px shadow-light-500 rounded-40 overflow-hidden"
              s:border="2 solid warm-gray-50"
            >
              <img :src="record.avatar" />
            </span>
            <span>{{ record.name }}</span>
          </div>
        </template>
        <template v-if="column.key === 'name4'">
          <div class="flex items-center justify-center">
            <span
              v-if="record.status1 === 1"
              class="flex items-center py-2px px-10px rounded-[10px] bg-[#E7FFF2] text-[#2FE095]"
            >
              开放中
            </span>
            <span
              v-else-if="record.status1 === 2"
              class="flex items-center py-2px px-10px rounded-[10px] bg-[#FFFAEC] text-[#FFBB00]"
            >
              执行中
            </span>
            <span
              v-else-if="record.status1 === 3"
              class="flex items-center py-2px px-10px rounded-[10px] bg-[#FFFAEC] text-[#FFBB00]"
            >
              数据回填中
            </span>
            <span
              v-else
              class="flex items-center py-2px px-10px rounded-[10px] bg-[#F6F7FA] text-[#A5A8B4]"
            >
              已完成
            </span>
          </div>
        </template>
        <template v-if="column.key === 'name5'">
          <div>
            <div class="py-5px">YY38293049302218</div>
            <div class="py-5px">YY38293049302218</div>
            <div class="py-5px">YY38293049302218</div>
          </div>
        </template>
        <template v-if="column.key === 'name6'">
          <div>
            <div class="py-5px">张玲燕(猫猫)</div>
            <div class="py-5px">张玲燕(猫猫)</div>
            <div class="py-5px">张玲燕(猫猫)</div>
          </div>
        </template>
        <template v-if="column.key === 'name7'">
          <div>
            <div class="py-5px">1人</div>
            <div class="py-5px">2人</div>
            <div class="py-5px">3人</div>
          </div>
        </template>
        <template v-if="column.key === 'option'">
          <div v-if="index === 1" class="flex gap-20px justify-center">
            <div
              class="flex items-center gap-9px cursor-pointer fill-[#AAA9B0]"
              s:hover="fill-[#393F3B]"
              @click="visibleDetail2 = true"
            >
              <SvgIcon class="w-18px h-18px" name="edit"></SvgIcon>
              数据回填
            </div>
          </div>
          <div v-else-if="index === 2" class="flex gap-20px justify-center">
            <div
              class="flex items-center gap-9px cursor-pointer fill-[#A5A8B4] stroke-[#A5A8B4]"
              s:hover="fill-[#2F3430] stroke-[#2F3430]"
              @click="visibleDetail1 = true"
            >
              <SvgIcon class="w-18px h-18px" name="look"></SvgIcon>
              查看报告
            </div>
          </div>
          <div v-else class="flex gap-20px justify-center">
            <div
              class="flex items-center gap-9px cursor-pointer fill-[#E79EB0]"
              s:hover="fill-[#F43359]"
              @click="visibleDetail = true"
            >
              <SvgIcon class="w-18px h-18px" name="close"></SvgIcon>
              关闭测评
            </div>
            <div
              class="flex items-center gap-9px cursor-pointer fill-[#71EBBB]"
              s:hover="fill-primary"
              @click="visibleDetail1 = true"
            >
              <SvgIcon class="w-18px h-18px" name="action"></SvgIcon>
              执行测评
            </div>
          </div>
        </template>
      </template>
    </Table>
    <!-- 待测评详情 -->
    <Modal
      v-model:visible="visibleDetail"
      width="700px"
      title="待测评详情"
      :footer="null"
    >
      <Details :status="'开放中'"></Details>
    </Modal>
    <Modal
      v-model:visible="visibleDetail1"
      width="700px"
      title="待测评详情"
      :footer="null"
    >
      <Details :status="'已完成'"></Details>
    </Modal>
    <!-- 数据回填 -->
    <Modal
      v-model:visible="visibleDetail2"
      width="1200px"
      title="数据回填"
      :footer="null"
      :body-style="{ padding: '0' }"
    >
      <Data></Data>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import {
  Form,
  FormItem,
  Select,
  SelectOption,
  Input,
  RangePicker,
  Table,
  TablePaginationConfig,
  TableProps,
  TableColumnsType,
  Modal,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import Header from './modules/Header.vue'
import Details from './modules/Details.vue'
import Data from './modules/Data.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const visibleDetail = ref(false)
const visibleDetail1 = ref(false)
const visibleDetail2 = ref(false)
const pagination = computed(
  () =>
    ({
      total: dataSource.value?.total || 0,
      current: current.value,
      pageSize: pageSize.value,
      showQuickJumper: true,
      showSizeChanger: false,
      position: ['bottomLeft'],
    } as TablePaginationConfig)
)
const handleTableChange: TableProps['onChange'] = (
  pag: { pageSize: number; current: number }
  // 其它参数
  // filters: any,
  // sorter: any
) => {
  run({
    pageSize: pag.pageSize!,
    page: pag?.current,
    // 其他参数
    // sortField: sorter.field,
    // sortOrder: sorter.order,
    // ...filters,
  })
}
const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(
  params => {
    return getDemoListApi({ ...params })
  },
  {
    defaultParams: [
      {
        page: 1,
        pageSize: 5,
      },
    ],
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'pageSize',
    },
    manual: false,
  }
)
const listData = computed(() => dataSource.value?.items || [])
const columns = ref<TableColumnsType>([
  {
    title: '测评ID号',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '测评日期',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '测评场地',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '测评类型',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
  },
  {
    title: '测评状态',
    dataIndex: 'name4',
    key: 'name4',
    align: 'center',
  },
  {
    title: '预约号',
    dataIndex: 'name5',
    key: 'name5',
    align: 'center',
    width: 280,
  },
  {
    title: '申请者',
    dataIndex: 'name6',
    key: 'name6',
    align: 'center',
  },
  {
    title: '人数',
    dataIndex: 'name7',
    key: 'name7',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
    width: 300,
  },
])
function onJump() {
  router.push({ name: 'MyEvaluationImplementCalendar' })
}
</script>
