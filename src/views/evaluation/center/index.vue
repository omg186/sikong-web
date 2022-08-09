<template>
  <div class="evaluation-org flex flex-col h-full">
    <div
      class="evaluation-setting-table w-full flex-1 flex flex-col p-30px pb-0"
    >
      <h3 class="flex-shrink-0 mb-30px">测评中心</h3>
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
              <span>{{ record.name }}</span>
              <span
                class="text-primary font-bold cursor-pointer"
                @click="isDrawerDetail = true"
                >（幼儿版）
              </span>
            </div>
          </template>
          <template v-if="column.key === 'project'">
            <div class="grid grid-cols-2 gap-10px">
              <div
                v-for="(item, index) in [
                  '身高标准体重',
                  '身高',
                  '坐位体前屈',
                  '双脚连续跳',
                ]"
                :key="index"
                class="flex gap-10px items-center"
              >
                <span
                  class="w-20px h-20px flex-shrink-0 flex justify-center items-center bg-[#F9F9F9] rounded-6px text-xs"
                  >{{ index + 1 }}</span
                >
                <span>{{ item }}</span>
              </div>
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
      title="国民体质测定标准测评（幼儿版）"
      placement="right"
    >
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="测评基本信息"></TabPane>
        <TabPane key="2" tab="测评记录单"></TabPane>
        <TabPane key="3" tab="测评报告样式">
          <Report></Report>
        </TabPane>
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
} from 'ant-design-vue'
import { computed, onMounted, reactive, ref, unref, watch } from 'vue'
import { usePagination } from 'vue-request'
import { getDemoListApi } from '@/api/select'
import Report from './modules/report.vue'

const isDrawerDetail = ref(false)
const activeKey = ref('3')
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
const pagination = computed(() => ({
  total: dataSource.value?.total || 0,
  current: current.value,
  pageSize: pageSize.value,
  showQuickJumper: true,
  showSizeChanger: false,
}))
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
    title: '测评全称',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: '测评类型',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '适合年龄和年级',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '测评项目',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
    width: 300,
  },
  {
    title: '测评',
    dataIndex: 'name4',
    key: 'account',
    align: 'center',
    fixed: 'right',
  },
  {
    title: '报告',
    dataIndex: 'name5',
    key: 'name5',
    align: 'center',
    fixed: 'right',
  },
  {
    title: '测评状态',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
    fixed: 'right',
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
