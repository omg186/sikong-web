<template>
  <div class="page-next-prev">
    <div class="grid grid-cols-[58px,auto,200px] gap-x-10px items-center">
      <Portrait
        class="w-58px h-58px"
        url="avatar-girl.png"
        :isLocalUrl="true"
        :border="false"
        :shadow="false"
      ></Portrait>

      <div class="flex flex-col gap-y-5px">
        <p class="mb-0px font-bold" s:text="[#1F311F] 16px">Thomas(托托)</p>
        <p class="mb-0px" s:text="xs [#6Cmb-10px766E]">执行人</p>
      </div>
      <div
        class="flex gap-x-15px items-center font-bold"
        s:text="primary right 16px"
      >
        <span> 测评状态 - 预约成功</span>
        <!-- 取消预约 -->
        <Tooltip title="取消预约">
          <ImgIcon
            width="23px"
            height="23px"
            :src="'reserve-cancel.png'"
            hover-src="reserve-cancel-hover.png"
          />
        </Tooltip>
      </div>
    </div>
    <div class="flex pt-27px gap-x-30px" s:text="xs">
      <div>
        <p class="mb-10px" s:text="[#6C766E]">测评地点</p>
        <p class="font-bold" s:text="[#1F311F]">教室01</p>
      </div>
      <div>
        <p class="mb-10px" s:text="[#6C766E]">测评状态</p>
        <p class="font-bold" s:text="[#1F311F]">开放中</p>
      </div>
      <div>
        <p class="mb-10px" s:text="[#6C766E]">测评时间</p>
        <p class="font-bold" s:text="[#1F311F]">2022.3.22 星期三 15:00-16:00</p>
      </div>
      <div>
        <p class="mb-10px" s:text="[#6C766E]">测评状态</p>
        <p class="font-bold" s:text="[#1F311F]">国家体质测评标准测评(幼儿版)</p>
      </div>
    </div>
    <div>
      <p class="font-bold">测评人数（8人）</p>
      <Table
        class="sikong-table flex-1"
        :dataSource="listData"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'name1'">
            <div
              class="flex gap-10px items-center justify-center cursor-pointer"
            >
              <Portrait class="w-30px h-30px" :url="record.avatar"></Portrait>
              <span>
                {{ record.name }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'name2'">
            <div class="flex flex-col gap-10px items-center cursor-pointer">
              <span class="w-150px" s:text="left"> 1001102435435389 </span>
              <span
                class="w-150px underline underline-primary"
                s:text="primary left"
              >
                下载记录单
              </span>
            </div>
          </template>
          <template v-if="column.key === 'name3'">
            <div>未开始</div>
          </template>
          <template v-if="column.key === 'name4'">
            <div>-</div>
          </template>
        </template>
      </Table>
      <!-- 按钮 -->
      <div
        class="underline underline-primary underline-offset-2"
        s:text="primary xs"
      >
        什么是测评记录单？
      </div>
      <div
        class="w-300px min-h-90px bg-[#FDFDFD] mt-22px p-15px"
        s:border="1px solid #F9F9F9"
        s:text="xs"
      >
        <div class="flex justify-between">
          <span s:text="[#1F311F]">测评记录单</span>
          <span
            class="underline underline-primary underline-offset-2"
            s:text="primary xs"
            >预览
          </span>
        </div>
        <div class="w-228px mt-10px" s:text="[#83867E]" s:font="400">
          每位受试者都有一份唯一编号的用于记录
          成绩的记录单。测评前请在右侧列表处下载
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import {
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Table,
  Button,
  Tooltip,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import Portrait from '@/components/Portrait.vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '../../../../../components/Button/OkButton.vue'
const pagination = computed(
  () =>
    ({
      total: dataSource.value?.total || 0,
      current: current.value,
      pageSize: pageSize.value,
      showQuickJumper: false,
      showSizeChanger: false,
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
    title: '受试者',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '测评记录单ID',
    dataIndex: 'name2',
    key: 'name2',
    align: 'center',
  },
  {
    title: '测评状态',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
  {
    title: '测评报告',
    dataIndex: 'name4',
    key: 'name4',
    align: 'center',
  },
])
</script>
<style lang="scss"></style>
