<template>
  <div class="h-full flex-1 px-20px">
    <div class="org-modules-table w-full" v-if="routeQuery.title">
      <div class="w-full flex justify-between pt-32px pb-20px items-center">
        <div s:text="black " class="font-bold">
          {{ routeQuery?.title }}（共3/5人）
        </div>
        <div s:text="[#A9ACA4] xs" class="flex items-center gap-30px">
          <span>上级部门：北京白河狸科技</span>
          <span>部门负责人：张艳玲</span>
          <span>部门创建时间：2022年7月14日 17:32</span>
          <div
            class="flex fill-primary cursor-pointer text-primary"
            s:hover="text-[#14DC87] underline-[#14DC87]"
            @click="onDeptEdit('2')"
          >
            <SvgIcon class="w-[24px] h-17px" name="modify"></SvgIcon>
            <span
              class="underline-current underline underline-2px underline-offset-2"
            >
              编辑部门信息
            </span>
          </div>
          <Button
            type="primary"
            class="h-40px rounded-60"
            @click="onAddStaff({})"
          >
            <i class="s-icon add2-icon mr-5px"></i>
            添加员工
          </Button>
        </div>
      </div>
      <Table
        class="sikong-table"
        :dataSource="data.dataSource"
        :columns="columns"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <img
              src="@/assets/images/avatar-girl.png"
              class="inline-block w-30px h-30px mr-14px rounded-full"
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
          </template>
          <template v-if="column.key === 'status'">
            <div class="flex items-center justify-center">
              <span v-if="record.status === '正常'" class="text-green-500">
                正常
              </span>
              <span
                v-else-if="record.status === '禁用'"
                class="flex items-center fill-[#F3AB51] stroke-[#F3AB51] text-[#F3AB51]"
              >
                <SvgIcon
                  name="jinyong1"
                  class="w-18px h-18px mr-10px"
                ></SvgIcon>
                禁用
              </span>
              <span
                v-else-if="record.status === '离职'"
                class="flex items-center fill-[#F4274E] text-[#F4274E]"
              >
                <SvgIcon name="lizhi2" class="w-18px h-18px mr-10px"></SvgIcon>
                <span>离职</span>
              </span>
            </div>
          </template>
          <template v-if="column.key === 'option'">
            <div class="flex items-center justify-center gap-20px">
              <div
                class="fill-[#C2C5CD] cursor-pointer stroke-[#C2C5CD]"
                s:hover="fill-[#525A64] stroke-[#525A64]"
                @click="onTransfer(record.id)"
              >
                <SvgIcon class="w-[18px] h-18px" name="tiao"></SvgIcon>
              </div>
              <div
                class="fill-[#C2C5CD] stroke-[#C2C5CD] cursor-pointer"
                s:hover="fill-[#525A64] stroke-[#525A64]"
                @click="onDisable(record.id)"
              >
                <SvgIcon class="w-[18px] h-18px" name="jinyong1"></SvgIcon>
              </div>
              <div
                class="fill-[#C2C5CD] stroke-[#C2C5CD] cursor-pointer"
                s:hover="fill-[#525A64] stroke-[#525A64]"
                @click="onLeave(record.id)"
              >
                <SvgIcon class="w-[18px] h-18px" name="lizhi2"></SvgIcon>
              </div>
            </div>
          </template>
        </template>
      </Table>
    </div>
  </div>
  <Modal
    v-model:visible="isModalDept"
    :title="deptModalTitle"
    width="459px"
    :footer="null"
  >
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <AddDept
      :is-edit="isDeptEdit"
      :code="deptCode"
      @on-cancel="isModalDept = false"
      @on-ok="onDeptOk"
    />
  </Modal>
  <Modal title="删除部门" v-model:visible="isModalDeptDel" :footer="null">
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <h3 s:text="black md" class="pt-2opx">确定要删除部门-“中海店”吗？</h3>
    <div s:text="[#F3AB51] xs" class="pt-10px">
      当前“中海店”部门中，有 7 个员工账户和 1 个相关校区，删除操作会将
      相关员工账户转移到“北京白河狸科技公司”下，是否依然执行此操作？
    </div>
    <div class="flex gap-10px pt-30px">
      <CancelButton @click="isModalDeptDel = false"> 取消 </CancelButton>
      <OkButton @click="isModalDeptDel = false"> 保存 </OkButton>
    </div>
  </Modal>
  <Modal title="员工调岗" v-model:visible="isModalTransfer" :footer="null">
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <h3 s:text="black md" class="pt-2opx">将员工"都林(大熊)"调岗到</h3>
    <Form class="sikong-form2 pt-18px">
      <FormItem v-bind="validateInfos.deptCode">
        <Select
          v-model:value="transferForm.deptCode"
          class="rounded-8px"
          placeholder="请选择岗位"
        >
          <SelectOption value="技术部">技术部</SelectOption>
          <SelectOption value="产品部">产品部</SelectOption>
        </Select>
      </FormItem>
      <div class="flex gap-10px pt-30px">
        <CancelButton @click="isModalTransfer = false"> 取消 </CancelButton>
        <OkButton @click="onTransferSubmit"> 保存 </OkButton>
      </div>
    </Form>
  </Modal>
  <!-- 账户禁用 -->
  <Modal title="账户员工禁用" v-model:visible="isModalDisable" :footer="null">
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <h3 s:text="black md" class="pt-2opx">确定要禁用“李海(大鱼)”的账户吗？</h3>
    <div s:text="[#F3AB51] xs" class="pt-10px">
      禁用“李海(大鱼)”的账户，该账户不能登录系统，将无法正常为该账户下的客户和会员提供服务。您要继续禁用该账户吗？
    </div>
    <div class="flex gap-10px pt-40px">
      <CancelButton @click="isModalDisable = false"> 取消 </CancelButton>
      <OkButton @click="onDisableSubmit"> 确定 </OkButton>
    </div>
  </Modal>
  <!-- 离职 -->
  <Modal title="账户员工离职" v-model:visible="isModalLeave" :footer="null">
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <h3 s:text="black md " class="pt-2opx">确定要离职“李海(大鱼)”吗？</h3>
    <div s:text="[#F3AB51] xs" class="pt-10px">
      离职“李海(大鱼)”，该账户不能登录系统，将无法正常为该账户下的客户和会员提供服务。您要继续离职该账户吗？
    </div>
    <div class="flex gap-10px pt-40px">
      <CancelButton @click="isModalLeave = false"> 取消 </CancelButton>
      <OkButton @click="onLeaveSubmit"> 确定 </OkButton>
    </div>
  </Modal>
  <AddStaff ref="addStaffRef" :footer="null" />
</template>
<script lang="ts" setup>
import {
  Avatar,
  Input,
  Popover,
  Modal,
  Button,
  Table,
  TableColumnsType,
  Form,
  FormItem,
  Select,
  SelectOption,
} from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, reactive, ref, watchEffect } from 'vue'
import { getCurrentInstance } from '@vue/runtime-core'
import AddDept from './modules/add-dept.vue'
import SvgIcon from '../../components/SvgIcon.vue'
import AddStaff from './modules/add-staff.vue'
import { useRoute } from 'vue-router'
import { GetTreeParams } from '@/api/model/org-model'
import { useRouteQueryObject } from '@/hooks/web/use-page'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
// import Table from './modules/table.vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
const isModalDept = ref(false)
const isModalDeptDel = ref(false)
const isDeptEdit = ref(false)
const isModalTransfer = ref(false)
const isModalStaff = ref(false)
const deptCode = ref('')
// const { ctx } = getCurrentInstance() as any
const addStaffRef = ref(null)
const { routeQuery, getRouteQueryFull } =
  useRouteQueryObject<GetTreeParams>('org')
// const routeData = computed(() => routeQuery as unknown as GetTreeParams)
watchEffect(() => {
  // if(route.params.id){
  // userStore.getUserInfo(route.params.id)
  // // }
  // const query = route.query.org
  // console.log(query)
  console.log('org---routeQuery', routeQuery)
})
// 账户禁用
const isModalDisable = ref(false)
// 账户禁用click
const onDisable = (id: number) => {
  console.log('禁用')
  isModalDisable.value = true
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
const data = reactive({
  dataSource: [
    {
      key: '1',
      name: '张玲燕(猫猫)',
      job: '产品总监',
      dept: '前端创新组',
      account: '13924156728',
      status: '正常',
      isAdmin: true,
    },
    {
      key: '2',
      name: '张玲燕(猫猫)',
      job: '产品总监',
      dept: '前端创新组',
      account: '13924156728',
      status: '正常',
      isAdmin: true,
    },
    {
      key: '3',
      name: '张玲燕(猫猫)',
      job: '产品总监',
      dept: '前端创新组',
      account: '13924156728',
      status: '正常',
      isAdmin: false,
    },
    {
      key: '4',
      name: '张玲燕(猫猫)',
      job: '产品总监',
      dept: '前端创新组',
      account: '13924156728',
      status: '离职',
      isAdmin: false,
    },
    {
      key: '5',
      name: '张玲燕(猫猫)',
      job: '产品总监',
      dept: '前端创新组',
      account: '13924156728',
      status: '禁用',
      isAdmin: false,
    },
  ],
})
const columns = ref<TableColumnsType>([
  {
    title: '姓名(昵称)',
    dataIndex: 'name',
    key: 'name',
    width: 240,
  },
  {
    title: '职务',
    dataIndex: 'job',
    key: 'job',
    align: 'center',
    width: 150,
  },
  {
    title: '部门',
    dataIndex: 'dept',
    key: 'dept',
    align: 'center',
    width: 200,
  },
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
    align: 'center',
    width: 200,
  },
  {
    title: '账号状态',
    dataIndex: 'status',
    key: 'status',
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
// 员工调岗click
const onTransfer = (id: number) => {
  isModalTransfer.value = true
}

function onDeptAdd(value: string) {
  console.log(value)
  isDeptEdit.value = false
  isModalDept.value = true
  deptModalTitle.value = '添加部门'
}
function onDeptEdit(value: string) {
  console.log(value)
  deptCode.value = value
  isDeptEdit.value = true
  isModalDept.value = true
  deptModalTitle.value = '修改部门'
}
function onDeptDel() {
  isModalDeptDel.value = true
}
function onDeptOk(value, isContinue) {
  console.log(value)
  isModalDept.value = isContinue
}
function onAddStaff(record) {
  console.log('record', record)
  addStaffRef.value.show(record)
  // isModalStaff.value = true
}
</script>

<style lang="less" scoped>
.enterprise-org {
  .org-modules-table {
    .admin-tag {
      background: linear-gradient(270deg, #ced5e2 0%, #9299a7 100%);
    }
  }
}
</style>
