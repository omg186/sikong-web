<template>
  <div class="potential-layout">
    <div class="potential-search flex justify-between px-30px py-20px">
      <div class="flex items-center gap-15px">
        <span s:text="sm" class="text-primary">全部</span>
        <Form layout="inline">
          <FormItem>
            <Select placeholder="选择校区" class="select-icon min-w-200px">
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
            <Select placeholder="选择年级" class="select-icon min-w-118px">
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
            <Select placeholder="选择班级" class="select-icon min-w-118px">
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
            <Select placeholder="性别" class="select-icon min-w-118px">
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
        </Form>
      </div>
      <div class="flex items-center gap-27px">
        <!-- 搜索按钮 -->

        <transition-group
          name="search-transition"
          enter-active-class="animate__fadeInRight"
          leave-active-class="animate__fadeOutLeft"
        >
          <ImgIcon
            key="1"
            width="18px"
            class="w-18px h-20px fill-[#A5A8B4] cursor-pointer"
            :src="'serach.png'"
            hover-src="serach-hover.png"
            v-if="!visibleInput"
            @mouseenter="visibleInput = true"
          >
          </ImgIcon>

          <Input
            key="2"
            v-if="visibleInput"
            class="w-200px box-border h-40px rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
            placeholder="客户姓名/昵称/电话"
            @blur="visibleInput = false"
          >
            <template #prefix>
              <ImgIcon
                :src="'serach.png'"
                class="w-18px h-20px"
                hover-src="serach-hover.png"
              >
              </ImgIcon>
            </template>
          </Input>
        </transition-group>
        <!-- 添加训练计划 -->
        <p
          class="underline underline-primary underline-offset-2 mb-0 text-primary text-xs cursor-pointer"
          @click="visibleAddPlan = true"
        >
          添加训练计划
        </p>
        <OkButton @click="visibleAddClient = true">
          <template #icon>
            <SvgIcon class="w-18px h-20px fill-white" name="add"></SvgIcon>
          </template>
          新建正式客户
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
              <span
                class="w-30px h-30px shadow-light-500 rounded-40 overflow-hidden"
                s:border="2 solid warm-gray-50"
              >
                <img :src="record.avatar" />
              </span>
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-if="column.key === 'grade'">
            <!-- 优秀 -->
            <div class="flex w-full items-center justify-center">
              <div
                class="relative w-100px h-24px flex items-center overflow-hidden justify-center rounded-sm"
                s:border="1px solid"
                :style="{
                  lineHeight: 1,
                  borderColor: borderColor[record.grade - 1],
                  color: textColor[record.grade - 1],
                }"
              >
                <span class="relative z-20 flex gap-1px">
                  <span>
                    {{
                      (
                        Math.round((record.progress / 140) * 10000) / 100.0
                      ).toFixed(0)
                    }}分
                  </span>
                  <span>{{ textContents[record.grade - 1] }}</span>
                </span>
                <span
                  :style="{
                    width:
                      Math.round((record.progress / 140) * 10000) / 100.0 + '%',
                    background: bgProcessColor[record.grade - 1],
                  }"
                  class="h-full absolute left-0 z-1"
                ></span>
              </div>
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
          <template v-if="column.key === 'option'">
            <div class="flex items-center justify-center gap-10px">
              <Tooltip title="查看报告">
                <ImgIcon
                  :src="'view-reserve.png'"
                  hover-src="view-reserve-hover.png"
                  @click="onClient"
                >
                </ImgIcon
              ></Tooltip>
              <Tooltip title="训练方案">
                <ImgIcon
                  :src="'word.png'"
                  hover-src="word-hover.png"
                  @click="onClient"
                >
                </ImgIcon>
              </Tooltip>
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
    <!-- 新建正式向客户 -->
    <Modal
      v-model:visible="visibleAddClient"
      width="660px"
      title="新建正式向客户"
      :footer="null"
    >
      <AddClient
        @on-cancel="visibleAddClient = false"
        @on-submit="visibleAddClient = false"
      ></AddClient>
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
    </Modal>
    <!-- 通知消息 -->
    <Modal
      :visible="visibleMessageDialog"
      width="660px"
      title="通知消息"
      :footer="null"
      @update:visible="userStore.clickMessageIcon"
    >
      <MessageList></MessageList>
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
    </Modal>
    <!-- 添加训练计划 -->
    <Modal
      v-model:visible="visibleAddPlan"
      width="660px"
      title="添加训练计划"
      :footer="null"
    >
      <AddPlan></AddPlan>
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
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
  TableColumnsType,
  TableProps,
  Table,
  TablePaginationConfig,
  Drawer,
  Input,
  Modal,
  Tooltip,
} from 'ant-design-vue'
import ImgIcon from '@/components/ImgIcon.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { usePagination } from 'vue-request'
import { getDemoListApi } from '@/api/select'
import { computed, ref } from 'vue'
import PersonInfo from './modules/PersonInfo.vue'
import MessageList from './modules/Message.vue'
import AddClient from './modules/AddClient.vue'
import AddPlan from './modules/TrainingPlan/Add.vue'
import { useUserStore } from '@/store/modules/user'
import OkButton from '@/components/Button/OkButton.vue'
const textContents = ['优秀', '良好', '合格', '不及格']
const borderColor = ['#DBF8EB', '#D9E8FF', '#FDEEDC', '#FFF1F2']
const textColor = ['#2FE095', '#62A1FF', '#F3AB51', '#FF7C7C']
const bgProcessColor = ['#C0F5DD', '#A1C7FF', '#F9D3A4', '#FFDCDF']
const visibleClient = ref(false)
const visibleAddPlan = ref(false)
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
        pageSize: 8,
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
    title: '家长信息',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
  },
  {
    title: '所属教练',
    dataIndex: 'name4',
    key: 'account',
    align: 'center',
  },
  {
    title: '最后测试日期',
    dataIndex: 'date',
    key: 'name5',
    align: 'center',
  },
  {
    title: '体质健康分数',
    dataIndex: 'grade',
    key: 'grade',
    align: 'center',
  },
  {
    title: '当前训练计划',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '最后训练时间',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
  },
])
function onClient() {
  visibleClient.value = true
}
</script>
