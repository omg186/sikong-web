<template>
  <div>
    <div class="py-25px px-30px">
      <div
        class="flex gap-x-5px items-center fill-[#A5A8B4] cursor-pointer"
        s:hover="fill-[#1F311F]"
        @click="router.back()"
      >
        <SvgIcon name="back" class="w-15px h-15px"></SvgIcon>
        <p class="mb-0">返回</p>
      </div>
    </div>
    <Table
      class="sikong-table flex-1"
      :dataSource="listData"
      :columns="columns"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x: 1000, y: 800 }"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'name'">
          <div
            class="relative flex items-center cursor-pointer pl-10px"
            style="line-height: 1"
            s:text="[#2D3A2F]"
          >
            <i
              class="absolute w-6px h-6px bg-[#F4274E] rounded-full left-[-5px]"
            >
            </i>
            <span>张玲燕(猫猫)提交了申请，希望加入</span>
            <span class="text-primary">TEST93049302218</span>
            <span>的待办测评，请尽快处理</span>
          </div>
        </template>
        <template v-if="column.key === 'option'">
          <span
            class="underline underline-primary underline-offset-2px cursor-pointer"
            s:text="primary"
            @click="visibleConfirm = true"
          >
            我去处理
          </span>
          <span
            class="underline underline-primary underline-offset-2px cursor-pointer"
            s:text="primary"
            @click="visibleConfirm1 = true"
          >
            我去处理
          </span>
        </template>
      </template>
    </Table>
    <!-- 执行人预约确认 -->
    <Modal
      title="执行人预约确认"
      v-model:visible="visibleConfirm"
      width="800px"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <Confirm></Confirm>
    </Modal>
    <!-- 执行人预约确认 -->
    <Modal
      title="执行人预约确认"
      v-model:visible="visibleConfirm1"
      width="800px"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <Confirm1></Confirm1>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import SvgIcon from '@/components/SvgIcon.vue'
import {
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
  Table,
  Modal,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import { useRouter } from 'vue-router'
import Confirm from './modules/Confirm.vue'
import Confirm1 from './modules/Confirm1.vue'
const visibleConfirm = ref(false)
const visibleConfirm1 = ref(false)
const router = useRouter()
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
    title: '待处理事项',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
    width: '70%',
  },
  {
    title: '预约申请时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    width: '30%',
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
</script>
