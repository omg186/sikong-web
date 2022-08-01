<template>
  <div class="h-full flex-1 px-20px">
    <div class="enterprise-setting-table w-full" v-if="routeQuery.title">
      <div class="w-full flex justify-between pt-32px pb-20px items-center">
        <div s:text="black " class="font-bold">
          {{ routeQuery?.title }}（4教师/场地）
        </div>
        <div s:text="[#A9ACA4] xs" class="flex items-center gap-30px">
          <span>创建时间：2022年7月14日 17:32</span>
          <div
            class="flex fill-primary cursor-pointer text-primary"
            s:hover="text-[#14DC87] underline-[#14DC87]"
            @click="onDeptEdit('2')"
          >
            <SvgIcon class="w-[24px] h-17px" name="modify"></SvgIcon>
            <span
              class="underline-current underline underline-2px underline-offset-2"
            >
              编辑校区信息
            </span>
          </div>
          <Button
            type="primary"
            class="h-40px rounded-60"
            @click="onRoom(false, 0)"
          >
            <i class="s-icon add2-icon mr-5px"></i>
            添加场地
          </Button>
        </div>
      </div>
      <div>
        <h3>校区照片</h3>
        <div class="flex">
          <Carousel
            ref="refCarousel"
            :after-change="onCarouselChange"
            :dots="false"
            autoplay
          >
            <div class="!align-top">
              <div class="flex gap-15px">
                <div class="w-172px h-98px rounded-8px bg-blue-300">1</div>
                <div class="w-172px h-98px rounded-8px bg-blue-500">1</div>
                <div class="w-172px h-98px rounded-8px bg-blue-700">1</div>
              </div>
            </div>
            <div class="!align-top">
              <div class="flex gap-15px">
                <div class="w-172px h-98px rounded-8px bg-red-300">2</div>
                <div class="w-172px h-98px rounded-8px bg-red-500">2</div>
                <div class="w-172px h-98px rounded-8px bg-red-700">2</div>
              </div>
            </div>
            <div class="!align-top">
              <div class="flex gap-15px">
                <div class="w-172px h-98px rounded-8px bg-orange-300">3</div>
                <div class="w-172px h-98px rounded-8px bg-orange-500">3</div>
                <div class="w-172px h-98px rounded-8px bg-orange-700">3</div>
              </div>
            </div>
          </Carousel>
          <div
            class="w-30px h-98px rounded-8px flex flex-col gap-4px items-center justify-center cursor-pointer ml-15px hover:bg-[#F9F9F9]"
          >
            <span
              class="w-4px h-4px bg-[#A5A8B4] rounded-full"
              @click="goToCarouse(0)"
            ></span>
            <span
              class="w-4px h-4px bg-[#A5A8B4] rounded-full"
              @click="goToCarouse(1)"
            ></span>
            <span
              class="w-4px h-4px bg-[#A5A8B4] rounded-full"
              @click="goToCarouse(2)"
            ></span>
          </div>
          <div
            class="grid grid-cols-2 grid-cols-[minmax(15%,1fr),auto] gap-x-80px pl-30px text-xs"
          >
            <div>
              <h4 s:text="[#1F311F]">校区详细地址</h4>
              <p s:text="[#A9ACA4]">
                北京市 朝阳区 小红门街道成寿寺路136号院3号楼B座底商2-A
              </p>
            </div>
            <div>
              <h4 s:text="[#1F311F]">部门负责人</h4>
              <p s:text="[#A9ACA4]">张艳玲</p>
            </div>
            <div>
              <h4 s:text="[#1F311F]">校区所属部门</h4>
              <p s:text="[#A9ACA4]">北京白河狸科技 中海店</p>
            </div>
          </div>
        </div>
      </div>
      <h3 class="mb-30px">朝阳校区的教室/场地(4/4)</h3>
      <Table
        class="sikong-table"
        :dataSource="listData"
        :columns="columns"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ y: 500 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div>
              <img
                src="@/assets/images/avatar-girl.png"
                class="inline-block w-30px h-30px mr-14px"
              />
              <RouterLink
                :to="{
                  name: 'EnterpriseOrgPersonDetail',
                  params: { id: record.key },
                  query: getRouteQueryFull(),
                }"
                class="cursor-pointer"
              >
                {{ record.name }}
              </RouterLink>
              <span
                v-if="record.isAdmin"
                class="admin-tag w-50px h-20px ml-16px px-7px rounded-20px text-xs text-white"
                >管理员
              </span>
            </div>
          </template>
          <template v-if="column.key === 'option'">
            <div class="flex items-center justify-center gap-20px">
              <div
                class="fill-[#A5A8B4] cursor-pointer"
                s:hover="fill-[#525A64]"
                @click="onRoom(true, record.id)"
              >
                <SvgIcon class="w-[15px] h-15px" name="modify1"></SvgIcon>
              </div>
              <div
                class="fill-[#C2C5CD] cursor-pointer"
                s:hover="fill-[#525A64] "
                @click="onDisable(record.id)"
              >
                <SvgIcon class="w-[18px] h-18px" name="del"></SvgIcon>
              </div>
            </div>
          </template>
        </template>
      </Table>
      <h3 class="my-30px">朝阳校区经营日历</h3>
      <div class="flex pb-32px"><CalendarShow></CalendarShow></div>
    </div>
    <Modal
      v-model:visible="isModalRoot"
      :title="isRootEdit ? '编辑教室/场地' : '添加教室/场地'"
      width="800px"
      :footer="null"
    >
      <AddRoom
        :is-edit="isRootEdit"
        @on-cancel="isModalRoot = false"
        @on-ok="onRootOk"
      />
    </Modal>
    <!-- 删除校区 -->
    <Modal
      v-model:visible="isModalDel"
      :title="'删除校区'"
      width="400px"
      :footer="null"
    >
      <h3 s:text="black md" class="pt-2opx">
        确定要删除校区-“白河狸朝阳校区”吗？
      </h3>
      <div s:text="[#F3AB51] xs" class="pt-10px">
        当前“白河狸少儿体能俱乐部朝阳校区”中，有多个未完成的预约和课程，
        删除操作会将相关预约和课程转移到“北京白河狸科技公司”下，是否依
        然执行此操作？
      </div>
      <div class="flex gap-10px pt-30px">
        <Button
          class="rounded-40px h-40px w-90px bg-[#F7FEFB] text-primary"
          s:border="1px solid [#C7F7E3]"
          @click="isModalDel = false"
        >
          取消
        </Button>
        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="isModalDel = false"
        >
          保存
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
import {
  Modal,
  Button,
  Table,
  TableColumnsType,
  Form,
  Carousel,
  TableProps,
} from 'ant-design-vue'
import { computed, onMounted, reactive, ref, unref, watch } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { GetTreeParams } from '@/api/model/org-model'
import { useRouteQueryObject } from '@/hooks/web/use-page'
import { usePagination } from 'vue-request'
import { getDemoListApi } from '@/api/select'
import AddRoom from './modules/add-room.vue'
import { CarouselRef } from 'ant-design-vue/lib/carousel'
import CalendarShow from '@/components/Calendar/CalendarShow.vue'

const isCampusEdit = ref(false)
const isModalCampus = ref(false)
const campusModalTitle = ref('添加新校区')
const isDeptEdit = ref(false)
const deptCode = ref('')
const isModalRoot = ref(false)
const isRootEdit = ref(false)
const isModalDel = ref(false)
const refCarousel = ref<CarouselRef>()
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
const { routeQuery, getRouteQueryFull } =
  useRouteQueryObject<GetTreeParams>('org')
watch(
  () => routeQuery.value,
  () => {
    run()
  }
)
onMounted(() => {
  const params = unref(routeQuery)
  if (params.title) run()
})
// 账户禁用
const isModalDisable = ref(false)
// 账户禁用click
const onDisable = (id: number) => {
  console.log('禁用')
  isModalDel.value = true
}
// 账户禁用submit
const onDisableSubmit = () => {
  console.log('禁用账户')
  isModalDisable.value = false
}
// 账户离职
const isModalLeave = ref(false)
// 账户离职click
const onLeave = (id: number) => {
  console.log('离职')
  isModalLeave.value = true
}
// 账户离职submit
const onLeaveSubmit = () => {
  console.log('离职账户')
  isModalLeave.value = false
}
const deptModalTitle = ref<'修改部门' | '添加部门'>('添加部门')
// 调岗form
const transferForm = reactive({
  deptCode: '',
})
// 调岗rules
const transferRules = ref({
  deptCode: [
    {
      required: true,
      message: '请选择岗位',
    },
  ],
})
// 调岗useForm
const { validate, validateInfos } = Form.useForm(transferForm, transferRules)
// 调岗onSubmit
const onTransferSubmit = () => {
  validate().then(() => {
    console.log('调岗成功')
  })
}
const columns = ref<TableColumnsType>([
  {
    title: '场地/教室名称',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: '室内外',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '面积(㎡)',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '层高(m)',
    dataIndex: 'name3',
    key: 'account',
    align: 'center',
  },
  {
    title: '有无柱(根)',
    dataIndex: 'name4',
    key: 'account',
    align: 'center',
  },
  {
    title: '运营日历',
    dataIndex: 'name5',
    key: 'name5',
    align: 'center',
  },
  {
    title: '说明',
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
  },
])
function onRootOk() {
  isModalRoot.value = false
}
// 添加/修改场地click
const onRoom = (isEdit: boolean, id: number) => {
  isModalRoot.value = true
  isRootEdit.value = isEdit
}

function onCampus(value: string) {
  isCampusEdit.value = false
  isModalCampus.value = true
  campusModalTitle.value = '添加部门'
}
function onDeptEdit(value: string) {
  console.log(value)
  deptCode.value = value
  isDeptEdit.value = true
  deptModalTitle.value = '修改部门'
}
const onCarouselChange = (current: number) => {
  // console.log(current)
}
function goToCarouse(index: number) {
  refCarousel.value?.goTo(index)
}
</script>

<style lang="less">
.enterprise-setting-table {
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
