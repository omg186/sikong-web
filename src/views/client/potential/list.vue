<template>
  <div class="potential-layout">
    <div class="potential-search flex justify-between px-30px py-20px">
      <div class="flex items-center gap-15px">
        <span s:text="sm" class="text-primary">全部</span>
        <Form layout="inline">
          <FormItem>
            <Select placeholder="性别" class="select-icon min-w-86px">
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
            <Select placeholder="客户来源" class="select-icon min-w-118px">
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
            <Select placeholder="客户状态" class="select-icon min-w-118px">
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
          <!-- 所属顾问 -->
          <FormItem>
            <Select placeholder="所属顾问" class="select-icon min-w-118px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="0">所属顾问</SelectOption>
              <SelectOption value="1">顾问1</SelectOption>
              <SelectOption value="2">顾问2</SelectOption>
              <SelectOption value="3">顾问3</SelectOption>
              <SelectOption value="4">顾问4</SelectOption>
            </Select>
          </FormItem>
          <!-- 分割线 -->
          <div class="w-1px mx-20px border-l-1px border-[#f4f4f4]"></div>
          <!-- 创建时间 -->
          <FormItem label="创建时间">
            <RangePicker :placeholder="['开始', '结束']" class="min-w-118px" />
          </FormItem>
        </Form>
      </div>
      <div class="flex items-center gap-27px">
        <!-- 搜索按钮 -->

        <!-- <transition-group
          name="search-transition"
          enter-active-class="animate__fadeInRight"
          leave-active-class="animate__fadeOutLeft"
        > -->
        <ImgIcon
          key="1"
          width="18px"
          @click="mouseSearchIcon"
          class="search-icon w-18px h-20px fill-[#A5A8B4] cursor-pointer"
          :src="'serach.png'"
          hover-src="serach-hover.png"
        >
        </ImgIcon>
        <Input
          key="2"
          class="search-input box-border h-40px rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
          placeholder="客户姓名/昵称/电话"
          @keydown="onSearch"
          @blur="onSearchBlur"
        >
          <template #prefix>
            <ImgIcon
              class="w-18px h-20px"
              :src="'serach.png'"
              hover-src="serach-hover.png"
            >
            </ImgIcon>
          </template>
        </Input>
        <!-- </transition-group> -->
        <OkButton @click="visibleAddClient = true">
          <template #icon>
            <SvgIcon
              class="w-18px h-18px inline-block fill-white"
              name="add"
            ></SvgIcon>
          </template>
          新建意向客户
        </OkButton>
      </div>
    </div>
    <div class="potential-table">
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
            <div
              class="flex gap-10px items-center cursor-pointer"
              @click="onClient"
            >
              <Portrait class="w-30px h-30px" :url="record.avatar" />
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-if="column.key === 'date'">
            <div class="flex items-center justify-center gap-10px">
              <span>{{ record.date }}</span>
              <i
                class="w-12px h-12px rounded-full"
                :style="{ 'background-color': record.color }"
              >
              </i>
            </div>
          </template>
        </template>
      </Table>
    </div>
    <Drawer
      v-model:visible="visibleClient"
      width="940px"
      size="large"
      :headerStyle="{ display: 'none' }"
      :body-style="{ padding: 0 }"
    >
      <PersonInfo></PersonInfo>
    </Drawer>
    <!-- 新建意向客户 -->
    <Modal
      v-model:visible="visibleAddClient"
      width="660px"
      title="新建意向客户"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <AddClient
        @on-cancel="visibleAddClient = false"
        @on-submit="visibleAddClient = false"
      ></AddClient>
    </Modal>
    <!-- 通知消息 -->
    <Modal
      :visible="visibleMessageDialog"
      width="660px"
      title="通知消息"
      :footer="null"
      @update:visible="userStore.clickMessageIcon"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <MessageList></MessageList>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import {
  Select,
  SelectOption,
  Form,
  FormItem,
  Button,
  RangePicker,
  TableColumnsType,
  TableProps,
  Table,
  TablePaginationConfig,
  Drawer,
  Input,
  Modal,
} from 'ant-design-vue'
import Portrait from '@/components/Portrait.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { usePagination } from 'vue-request'
import { getDemoListApi } from '@/api/select'
import { computed, ref } from 'vue'
import PersonInfo from './modules/PersonInfo.vue'
import MessageList from './modules/Message.vue'
import AddClient from './modules/AddClient.vue'
import { useUserStore } from '@/store/modules/user'
import ImgIcon from '@/components/ImgIcon.vue'
import OkButton from '@/components/Button/OkButton.vue'
import { gsap } from 'gsap'
const visibleClient = ref(false)
const visibleInput = ref(false)
const visibleAddClient = ref(false)
const userStore = useUserStore()
setTimeout(() => {
  userStore.setMessageStatus(true)
}, 1000)

const visibleMessageDialog = computed(() => userStore.getVisibleMessageDialog)

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
    title: '客户姓名(昵称)',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: '性别',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '出生日期',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '客户状态',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
  },
  {
    title: '学校',
    dataIndex: 'name4',
    key: 'account',
    align: 'center',
  },
  {
    title: '客户来源',
    dataIndex: 'name5',
    key: 'name5',
    align: 'center',
  },
  {
    title: '家长信息',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '家庭住址',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '所属顾问',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '最后跟进时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    fixed: 'right',
  },
])
function onClient() {
  visibleClient.value = true
}
function onSearch() {
  console.log('搜索')
  // visibleInput.value = true
}
function onSearchBlur(event: MouseEvent) {
  let tl = gsap.timeline()
  tl.to('.search-input', { width: '0px', opacity: 0, display: 'none' })
  tl.to('.search-icon', { opacity: 1, display: 'block' })
}
function mouseSearchIcon(event: Event) {
  console.log(event.target)
  let tl = gsap.timeline()
  // tl.to(event.target, { x: '-180px' })
  tl.to('.search-icon', { opacity: 0, display: 'none' }, 0)
  tl.fromTo(
    '.search-input',
    {
      opacity: 0,
      display: 'none',
      width: 0,
    },
    {
      opacity: 1,
      display: 'flex',
      width: 200,
    }
  )
}
</script>

<style lang="scss" scoped>
.search-input {
  display: none;
  width: 0px;
  opacity: 0;
}
</style>
