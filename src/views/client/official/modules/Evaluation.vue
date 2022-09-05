<template>
  <div>
    <Form :colon="false" layout="inline">
      <FormItem label="全部"></FormItem>

      <!-- 测试类型 -->
      <FormItem>
        <Select placeholder="选择测试类型" class="min-w-180px">
          <SelectOption value="0">客户来源</SelectOption>
          <SelectOption value="1">网络</SelectOption>
          <SelectOption value="2">电话</SelectOption>
          <SelectOption value="3">拜访</SelectOption>
          <SelectOption value="4">其他</SelectOption>
        </Select>
      </FormItem>
      <!-- 全部状态 -->
      <FormItem>
        <Select placeholder="选择状态" class="min-w-180px">
          <SelectOption value="0">全部状态</SelectOption>
          <SelectOption value="1">意向</SelectOption>
          <SelectOption value="2">正式</SelectOption>
          <SelectOption value="3">流失</SelectOption>
        </Select>
      </FormItem>
    </Form>
    <div class="pt-20px">
      <Table
        class="sikong-table flex-1"
        :dataSource="listData"
        :columns="columns"
        :pagination="false"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 1000, y: 800 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="flex w-full items-center justify-center cursor-pointer">
              <span class="text-primary underline underline-primary">
                {{ record.name }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'progress'">
            <div class="flex w-full items-center justify-center">
              <div
                class="relative w-100px h-24px flex items-center overflow-hidden justify-center rounded-sm"
                :style="{
                  lineHeight: 1,
                  background: bgColor[record.status1 - 1],
                  color: textColor[record.status1 - 1],
                }"
              >
                <span class="relative z-20"
                  >{{
                    Math.round((record.progress / 140) * 10000) / 100.0
                  }}/100</span
                >
                <span
                  :style="{
                    width:
                      Math.round((record.progress / 140) * 10000) / 100.0 + '%',
                    background: bgProcessColor[record.status1 - 1],
                  }"
                  class="h-full absolute left-0 z-1"
                ></span>
              </div>
            </div>
          </template>
          <template v-if="column.key === 'option'">
            <div class="flex w-full items-center justify-center cursor-pointer">
              <template v-if="record.status === '正常'">
                <Tooltip title="查看预约">
                  <ImgIcon
                    :src="'view-reserve.png'"
                    hover-src="view-reserve-hover.png"
                    @click="visibleAddEvaluation = true"
                  />
                </Tooltip>

                <!-- reserve-edit -->
                <Tooltip title="编辑预约">
                  <ImgIcon
                    :src="'reserve-edit.png'"
                    hover-src="reserve-edit-hover.png"
                    @click="visibleAddEvaluation = true"
                  />
                </Tooltip>
                <!-- 取消预约 -->
                <Tooltip title="取消预约">
                  <ImgIcon
                    :src="'reserve-cancel.png'"
                    hover-src="reserve-cancel-hover.png"
                    @click="visibleAddEvaluation = true"
                  />
                </Tooltip>
              </template>
              <template v-else>
                <!-- 取消预约 -->
                <Tooltip title="查看报告">
                  <ImgIcon
                    :src="'look1.png'"
                    hover-src="look1-hover.png"
                    @click="visibleEvaluationReport = true"
                  />
                </Tooltip>
              </template>
            </div>
          </template>
        </template>
      </Table>
    </div>
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
    <!-- 查看测评报告 -->
    <Modal
      v-model:visible="visibleEvaluationReport"
      width="1200px"
      title="查看测评报告"
      :footer="null"
    >
      <div class="grid grid-cols-[auto,100px] gap-10px">
        <EvaluationReport
          @on-cancel="visibleEvaluationReport = false"
          @on-submit="visibleEvaluationReport = false"
        ></EvaluationReport>
        <div class="flex flex-col gap-20px">
          <Button
            class="min-w-120px flex items-center gap-5px !bg-[#2A2C2A] border-none rounded-40"
            s:text="white"
            type="primary"
          >
            导出图片
            <template #icon>
              <SvgIcon name="image" class="w-20px h-16px fill-[#999]"></SvgIcon>
            </template>
          </Button>
          <Button
            class="min-w-120px flex items-center gap-5px !bg-[#2A2C2A] border-none rounded-40"
            s:text="white"
            type="primary"
          >
            导出PDF
            <template #icon>
              <SvgIcon name="pdf" class="w-20px h-16px fill-[#999]"></SvgIcon>
            </template>
          </Button>
          <Button
            class="min-w-120px flex items-center gap-5px !bg-[#2A2C2A] border-none rounded-40"
            s:text="white"
            type="primary"
          >
            打印
            <template #icon>
              <SvgIcon name="print" class="w-20px h-16px fill-[#999]"></SvgIcon>
            </template>
          </Button>
        </div>
      </div>
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
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Table,
  Tooltip,
  Modal,
  Button,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import ImgIcon from '@/components/ImgIcon.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import AddEvaluation from './AddEvaluation.vue'
import EvaluationReport from '@/views/evaluation/center/modules/report.vue'
const bgColor = ['#DAF8E9', '#FCEFDD', '#FCEFDD']
const textColor = ['#1BC289', '#F3AB51', '#FF7C7C']
const bgProcessColor = ['#C0F6DD', '#F8D2A4', '#FEDCDE']
const visibleAddEvaluation = ref(false)
const visibleEvaluationReport = ref(false)
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
    title: '测试类型',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '发起预约时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '预约原因',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
  },
  {
    title: '测评时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '测评结果',
    dataIndex: 'progress',
    key: 'progress',
    align: 'center',
    fixed: 'right',
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
  },
])
</script>
