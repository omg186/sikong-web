<template>
  <div class="enterprise-org flex flex-col h-full">
    <div class="h-100px w-full flex items-center gap-20px px-20px bg-black">
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
            class="w-200px h-full rounded-60 fill-gray-400 stroke-[#A5A8B4] hover:fill-primary active:fill-primary focus:fill-primary focus-within:fill-primary"
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
          <Tree @on-add="onDeptAdd" @on-edit="onDeptEdit" @on-del="onDeptDel" />
        </div>
      </div>
      <div class="h-full flex-1 px-20px">
        <div class="org-modules-table w-full">
          <div class="w-full flex justify-between pt-32px pb-20px items-center">
            <div s:text="black " class="font-bold">中海店（共3/5人）</div>
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
              <Button type="primary" class="h-40px rounded-60">
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
                <Avatar
                  style="background-color: #87d068"
                  class="w-30px h-30px mr-14px"
                  :src="userInfo.avatar"
                >
                </Avatar>
                <span>
                  {{ record.name }}
                </span>
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
                    <SvgIcon
                      name="lizhi2"
                      class="w-18px h-18px mr-10px"
                    ></SvgIcon>
                    <span>离职</span>
                  </span>
                </div>
              </template>
              <template v-if="column.key === 'option'">
                <div class="flex items-center justify-center gap-20px">
                  <div
                    class="fill-[#C2C5CD] cursor-pointer stroke-[#C2C5CD]"
                    s:hover="fill-[#525A64] stroke-[#525A64]"
                    @click="onDeptEdit(record.id)"
                  >
                    <SvgIcon class="w-[18px] h-18px" name="tiao"></SvgIcon>
                  </div>
                  <div
                    class="fill-[#C2C5CD] stroke-[#C2C5CD] cursor-pointer"
                    s:hover="fill-[#525A64] stroke-[#525A64]"
                    @click="onDeptDel()"
                  >
                    <SvgIcon class="w-[18px] h-18px" name="jinyong1"></SvgIcon>
                  </div>
                  <div
                    class="fill-[#C2C5CD] stroke-[#C2C5CD] cursor-pointer"
                    s:hover="fill-[#525A64] stroke-[#525A64]"
                    @click="onDeptDel()"
                  >
                    <SvgIcon class="w-[18px] h-18px" name="lizhi2"></SvgIcon>
                  </div>
                </div>
              </template>
            </template>
          </Table>
        </div>
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
      <h3 s:text="black md">确定要删除部门-“中海店”吗？</h3>
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
} from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { computed, reactive, ref } from 'vue'
import Tree from './modules/tree.vue'
import AddDept from './modules/add-dept.vue'
import SvgIcon from '../../components/SvgIcon.vue'
// import Table from './modules/table.vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
const isModalDept = ref(false)
const isModalDeptDel = ref(false)
const isDeptEdit = ref(false)
const deptCode = ref('')
const deptModalTitle = ref<'修改部门' | '添加部门'>('添加部门')
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
