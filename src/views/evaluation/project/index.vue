<template>
  <div class="evaluation-org flex flex-col h-full">
    <div
      class="evaluation-setting-table w-full flex-1 flex flex-col p-30px pb-0"
    >
      <h3 class="flex-shrink-0 mb-30px">测评项目</h3>
      <Table
        class="sikong-table flex-1"
        :dataSource="listData"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 1000, y: 800 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div>
              <span
                class="font-bold cursor-pointer"
                @click="isDrawerDetail = true"
              >
                {{ record.name }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'status'">
            <div class="flex items-center justify-center gap-10px">
              <div
                class="ml-[20px] h-[20px] aspect-square flex justify-center items-center bg-[#C7F7E3] rounded-full animate-pulse"
              >
                <div
                  class="h-[10px] aspect-square bg-[#2FE095] rounded-full"
                ></div>
              </div>
              使用中
            </div>
          </template>
        </template>
      </Table>
    </div>
    <Drawer
      v-model:visible="isDrawerDetail"
      class="custom-class"
      width="1064px"
      :closable="false"
      title="坐位体前屈"
      placement="right"
    >
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="测评基本信息">
          <BaseInfo></BaseInfo>
        </TabPane>
        <TabPane key="2" tab="测评记录单"></TabPane>
        <TabPane key="3" tab="测评报告样式"> </TabPane>
      </Tabs>
    </Drawer>
  </div>
</template>
<script lang="ts" setup>
import {
  Table,
  TableColumnsType,
  Form,
  TableProps,
  Drawer,
  Tabs,
  TabPane,
  TablePaginationConfig,
} from 'ant-design-vue'
import { computed, onMounted, reactive, ref, unref, watch } from 'vue'
import { usePagination } from 'vue-request'
import { getDemoListApi } from '@/api/select'
import BaseInfo from './modules/BaseInfo.vue'

const isDrawerDetail = ref(false)
const activeKey = ref('1')
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
const columns = ref<TableColumnsType>([
  {
    title: '测评项目全称',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '原始测量单位',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '适合年龄',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '相关测评',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
])
</script>

<style lang="less">
.evaluation-setting-table {
  .ant-carousel {
    width: 548px;
    flex-shrink: 0;
    text-align: center;
    height: 106px;
    padding: 5px;
    margin-bottom: 26px;
    line-height: 160px;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
}
</style>
