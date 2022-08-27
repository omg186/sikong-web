<template>
  <div class="pt-30px">
    <div class="grid grid-cols-[58px,auto,200px] gap-x-10px items-center">
      <div class="rounded-full overflow-hidden">
        <img src="@/assets/images/avatar-girl.png" />
      </div>
      <div class="flex flex-col gap-y-5px">
        <p class="mb-0px font-bold" s:text="[#1F311F] 16px">Thomas(托托)</p>
        <p class="mb-0px" s:text="xs [#6C766E]">执行人</p>
      </div>
      <div
        class="text-primary font-bold"
        :class="{
          'text-primary': props.status === '开放中',
          'text-[#A5A8B4]': props.status === '已完成',
        }"
        s:text="right 16px "
      >
        测评状态 - {{ props.status }}
      </div>
    </div>
    <div class="flex pt-27px gap-x-30px" s:text="xs">
      <div>
        <p class="mb-2px" s:text="[#6C766E]">测评地点</p>
        <p class="font-bold" s:text="[#1F311F]">教室01</p>
      </div>
      <div>
        <p class="mb-2px" s:text="[#6C766E]">测评状态</p>
        <p class="font-bold" s:text="[#1F311F]">开放中</p>
      </div>
      <div>
        <p class="mb-2px" s:text="[#6C766E]">测评时间</p>
        <p class="font-bold" s:text="[#1F311F]">2022.3.22 星期三 15:00-16:00</p>
      </div>
      <div>
        <p class="mb-2px" s:text="[#6C766E]">测评状态</p>
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
          <template v-if="column.key === 'name'">
            <div
              class="flex flex-col gap-10px items-center justify-center cursor-pointer"
            >
              <span
                class="w-40px h-40px shadow-light-500 rounded-40 overflow-hidden"
                s:border="2 solid warm-gray-50"
              >
                <img :src="record.avatar" />
              </span>
              <span class="font-bold" s:text="[#2D3A2F]">
                {{ record.name }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'name1'">
            <div
              class="flex gap-10px items-center justify-center cursor-pointer"
            >
              <span
                class="w-30px h-30px shadow-light-500 rounded-40 overflow-hidden"
                s:border="2 solid warm-gray-50"
              >
                <img :src="record.avatar" />
              </span>
              <span>
                {{ record.name }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'name2'">
            <div class="flex flex-col gap-10px items-center cursor-pointer">
              <span class="w-150px" s:text="left"> 1001102435435389 </span>
              <span
                v-if="props.status === '开放中'"
                class="w-150px underline underline-primary"
                s:text="primary left"
              >
                下载记录单
              </span>
            </div>
          </template>
          <template v-if="column.key === 'name3'">
            <div v-if="props.status === '开放中'">未开始</div>
            <div v-else-if="props.status === '已完成' && index === 0">完成</div>
            <div
              v-else-if="props.status === '已完成' && index === 1"
              s:text="[#F4274E]"
            >
              缺席
            </div>
            <div
              v-else-if="props.status === '已完成' && index > 1"
              class="flex flex-col justify-center items-center"
            >
              <Button
                class="rounded-40px h-26px w-56px bg-primary text-white"
                s:border="1px solid [#C7F7E3]"
                s:text="xs"
                type="primary"
              >
                补充
              </Button>
              <span s:text="[#F4274E]"> 数据丢失</span>
            </div>
          </template>
          <template v-if="column.key === 'name4'">
            <div v-if="props.status === '开放中'">-</div>
            <div v-else>
              <span
                class="w-150px underline underline-primary"
                s:text="primary left"
              >
                下载报告
              </span>
            </div>
          </template>
        </template>
      </Table>
      <!-- 按钮 -->
      <div class="flex gap-15px">
        <Button class="btn cancel h-40px w-90px"> 关闭测试 </Button>

        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
        >
          执行测试
        </Button>
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
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
const props = withDefaults(defineProps<{ status: '已完成' | '开放中' }>(), {})
const pagination = computed(
  () =>
    ({
      total: dataSource.value?.total || 0,
      current: current.value,
      pageSize: pageSize.value,
      showQuickJumper: true,
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
    title: '申请人',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
    customCell: (customCell, index, column) => {
      console.log('index', index, column)
      //   if (index == 0) {
      //     return {
      //       rowSpan: 2,
      //     }
      //   }
      return {
        rowSpan: index % 2 === 0 ? 2 : 0,
      }
    },
  },
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
