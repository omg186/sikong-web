<template>
  <div>
    <Header @click-icon="onJump" :visible-type="false"></Header>
    <div class="flex justify-between px-10px">
      <div class="flex items-center py-5px pl-20px">
        <span s:text="sm" class="text-primary pr-20px">全部</span>
        <Form layout="inline">
          <FormItem>
            <Select placeholder="预约状态" class="select-icon min-w-178px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="0">性别</SelectOption>
              <SelectOption value="1">男</SelectOption>
              <SelectOption value="2">女</SelectOption>
            </Select>
          </FormItem>
          <!-- 客户来源 -->
          <FormItem>
            <Select placeholder="预约类型" class="select-icon min-w-48px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="0">客户来源</SelectOption>
              <SelectOption value="1">网络</SelectOption>
              <SelectOption value="2">电话</SelectOption>
              <SelectOption value="3">拜访</SelectOption>
              <SelectOption value="4">其他</SelectOption>
            </Select>
          </FormItem>
          <!-- 客户状态 -->
          <FormItem>
            <Select placeholder="测评类型" class="select-icon min-w-118px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="0">客户状态</SelectOption>
              <SelectOption value="1">意向</SelectOption>
              <SelectOption value="2">正式</SelectOption>
              <SelectOption value="3">流失</SelectOption>
            </Select>
          </FormItem>
          <FormItem>
            <Select placeholder="申请人" class="select-icon min-w-118px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="0">客户状态</SelectOption>
              <SelectOption value="1">意向</SelectOption>
              <SelectOption value="2">正式</SelectOption>
              <SelectOption value="3">流失</SelectOption>
            </Select>
          </FormItem>
          <!-- 分割线 -->
          <div class="w-1px mx-20px border-l-1px border-[#f4f4f4]"></div>
          <!-- 创建时间 -->
          <FormItem label="申请时间">
            <RangePicker :placeholder="['开始', '结束']" class="min-w-118px" />
          </FormItem>
          <FormItem>
            <Input
              key="2"
              class="w-200px box-border rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
              placeholder="输入姓名昵称电话"
            >
              <template #prefix>
                <ImgIcon
                  width="18px"
                  :src="'serach.png'"
                  class="w-18px h-20px"
                  hover-src="serach-hover.png"
                >
                </ImgIcon>
              </template>
            </Input>
          </FormItem>
        </Form>
      </div>
      <Button
        type="primary"
        size="large"
        class="rounded-60 flex items-center"
        @click="visibleAddEvaluation = true"
      >
        预约测评
        <template #icon>
          <SvgIcon
            name="add"
            class="inline-block w-24px h-24px fill-white mr-5px"
          ></SvgIcon>
        </template>
      </Button>
    </div>
    <Table
      class="sikong-table flex-1 pt-20px"
      :dataSource="listData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'name'">
          <div class="cursor-pointer" s:text="primary">
            <span class="font-bold font-shsb"> {{ record.name }}</span>
          </div>
        </template>
        <template v-if="column.key === 'name1'">
          <div class="flex items-center justify-center" s:text="primary">
            <span class="font-400 font-shsb text-[#2FE095]">{{
              record.name1
            }}</span>
          </div>
        </template>

        <template v-if="column.key === 'option'">
          <Tooltip title="查看报告">
            <ImgIcon
              :src="'view-reserve.png'"
              hover-src="view-reserve-hover.png"
              @click="visibleConfirm = true"
            >
            </ImgIcon
          ></Tooltip>
        </template>
      </template>
    </Table>

    <!-- 执行人预约确认 -->
    <Modal
      v-model:visible="visibleConfirm"
      width="660px"
      title="执行人预约确认"
      :footer="null"
    >
      <Confirm
        @on-cancel="visibleConfirm = false"
        @on-submit="visibleConfirm = false"
      ></Confirm>
    </Modal>

    <!-- 预约测评 -->
    <Modal
      v-model:visible="visibleAddEvaluation"
      width="800px"
      title="预约测评"
      :footer="null"
    >
      <AddEvaluation
        @on-cancel="visibleAddEvaluation = false"
        @on-submit="visibleAddEvaluation = false"
      ></AddEvaluation>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import Confirm from './modules/Confirm.vue'
import AddEvaluation from './modules/AddEvaluation.vue'
import ImgIcon from '@/components/ImgIcon.vue'
import SvgIcon from '@/components/SvgIcon.vue'
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
  Button,
  Tooltip,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'

import Header from '../implement/modules/Header.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const visibleConfirm = ref(false)
const visibleAddEvaluation = ref(false)
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
    title: '预约名称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '预约时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '受试人',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '预约类型',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
  },
  {
    title: '预约的测评时间',
    dataIndex: 'name4',
    key: 'name4',
    align: 'center',
  },
  {
    title: '预约测试类型',
    dataIndex: 'name5',
    key: 'name5',
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
