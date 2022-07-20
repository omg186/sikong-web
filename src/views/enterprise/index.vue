<template>
  <div class="enterprise-org flex flex-col h-full">
    <div
      class="h-100px w-full flex-shrink-0 flex items-center gap-20px px-20px bg-black"
    >
      <Avatar
        style="background-color: #87d068"
        class="w-58px h-58px"
        :src="userInfo.avatar"
      >
      </Avatar>
      <div class="text-white font-bold">
        {{ userInfo.realName }} <span class="ml-10px">[组织架构]</span>
      </div>
    </div>
    <div class="flex flex-1 h-full">
      <div
        class="h-full w-280px flex-shrink-0 px-20px border-r border-r-light-900"
      >
        <div class="mt-20px h-60px flex items-center justify-between">
          <Input
            class="w-200px box-border h-46px rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
            placeholder="搜索员工或部门"
          >
            <template #prefix>
              <SvgIcon class="w-[28px] h-28px" name="search"></SvgIcon>
            </template>
          </Input>
          <Popover placement="bottom" trigger="click">
            <template #title> </template>
            <template #content>
              <div class="cursor-pointer">
                <p class="text-gray-300 cursor-not-allowed">添加员工</p>
                <p @click="isModalDept = true">添加部门</p>
              </div>
            </template>
            <div
              class="fill-[#A6A9B5] cursor-pointer stroke-[#A6A9B5]"
              s:hover="fill-[#9299A7] stroke-[#A6A9B5]"
              s:active="fill-[#A5A8B4] stroke-[#A6A9B5]"
            >
              <SvgIcon class="w-[24px] h-24px" name="add"></SvgIcon>
            </div>
          </Popover>
        </div>
        <div class="pt-33px pl-10px">
          <Tree
            @on-add="onDeptAdd"
            @on-edit="onDeptEdit"
            @on-del="onDeptDel"
            @on-click="onTree"
          />
        </div>
      </div>
      <div class="h-full flex-1 px-20px">
        <!-- <KeepRouterView :data="{}"></KeepRouterView> -->
        <router-view></router-view>
      </div>
    </div>
    <Modal
      v-model:visible="isModalDept"
      :title="deptModalTitle"
      width="459px"
      :footer="null"
    >
      <AddDept
        :is-edit="isDeptEdit"
        :code="deptCode"
        @on-cancel="isModalDept = false"
        @on-ok="onDeptOk"
      />
    </Modal>
    <Modal title="删除部门" v-model:visible="isModalDeptDel" :footer="null">
      <h3 s:text="black md" class="pt-2opx">确定要删除部门-“中海店”吗？</h3>
      <div s:text="[#F3AB51] xs" class="pt-10px">
        当前“中海店”部门中，有 7 个员工账户和 1 个相关校区，删除操作会将
        相关员工账户转移到“北京白河狸科技公司”下，是否依然执行此操作？
      </div>
      <div class="flex gap-10px pt-30px">
        <Button
          class="rounded-40px h-40px w-90px bg-[#F7FEFB] text-primary"
          s:border="1px solid [#C7F7E3]"
          @click="isModalDeptDel = false"
        >
          取消
        </Button>
        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="isModalDeptDel = false"
        >
          保存
        </Button>
      </div>
    </Modal>
    <Modal title="员工调岗" v-model:visible="isModalTransfer" :footer="null">
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
          <Button
            class="rounded-40px h-40px w-90px bg-[#F7FEFB] text-primary"
            s:border="1px solid [#C7F7E3]"
            @click="isModalTransfer = false"
          >
            取消
          </Button>
          <Button
            class="rounded-40px h-40px w-90px bg-primary text-white"
            s:border="1px solid [#C7F7E3]"
            type="primary"
            @click="onTransferSubmit"
          >
            保存
          </Button>
        </div>
      </Form>
    </Modal>
    <!-- 账户禁用 -->
    <Modal title="账户员工禁用" v-model:visible="isModalDisable" :footer="null">
      <h3 s:text="black md" class="pt-2opx">
        确定要禁用“李海(大鱼)”的账户吗？
      </h3>
      <div s:text="[#F3AB51] xs" class="pt-10px">
        禁用“李海(大鱼)”的账户，该账户不能登录系统，将无法正常为该账户下的客户和会员提供服务。您要继续禁用该账户吗？
      </div>
      <div class="flex gap-10px pt-40px">
        <Button
          class="rounded-40px h-40px w-90px bg-[#F7FEFB] text-primary"
          s:border="1px solid [#C7F7E3]"
          @click="isModalDisable = false"
        >
          取消
        </Button>
        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="onDisableSubmit"
        >
          确定
        </Button>
      </div>
    </Modal>
    <!-- 离职 -->
    <Modal title="账户员工离职" v-model:visible="isModalLeave" :footer="null">
      <h3 s:text="black md " class="pt-2opx">确定要离职“李海(大鱼)”吗？</h3>
      <div s:text="[#F3AB51] xs" class="pt-10px">
        离职“李海(大鱼)”，该账户不能登录系统，将无法正常为该账户下的客户和会员提供服务。您要继续离职该账户吗？
      </div>
      <div class="flex gap-10px pt-40px">
        <Button
          class="rounded-40px h-40px w-90px bg-[#F7FEFB] text-primary"
          s:border="1px solid [#C7F7E3]"
          @click="isModalLeave = false"
        >
          取消
        </Button>
        <Button
          class="rounded-40px h-40px w-90px bg-primary text-white"
          s:border="1px solid [#C7F7E3]"
          type="primary"
          @click="onLeaveSubmit"
        >
          确定
        </Button>
      </div>
    </Modal>
    <AddStaff :visible="isModalStaff" />
  </div>
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
import { computed, onMounted, reactive, ref } from 'vue'
import Tree from './modules/tree.vue'
import AddDept from './modules/add-dept.vue'
import SvgIcon from '../../components/SvgIcon.vue'
import AddStaff from './modules/add-staff.vue'
import KeepRouterView from '@/components/KeepRouterView.vue'
import { GetTreeParams } from '@/api/model/org-model'
// import Table from './modules/table.vue'
// useRouter
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
const routerData = ref()
const isModalDept = ref(false)
const isModalDeptDel = ref(false)
const isDeptEdit = ref(false)
const isModalTransfer = ref(false)
const isModalStaff = ref(false)
const deptCode = ref('')
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

// 点击 onTree
const onTree = (value: GetTreeParams) => {
  console.log('点击树', value)
  routerData.value = value
  router.replace({
    name: 'EnterpriseOrgList',
    query: {
      org: value as any,
    },
  })
}
// 调岗useForm
const { validate, validateInfos } = Form.useForm(transferForm, transferRules)
// 调岗onSubmit
const onTransferSubmit = () => {
  validate().then(() => {
    console.log('调岗成功')
  })
}
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
