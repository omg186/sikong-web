<template>
  <div class="flex flex-col justify-between h-full pb-40px">
    <div class="pt-29px flex-1">
      <p
        @click="back"
        class="flex gap-9px items-center fill-[#A5A8B4] cursor-pointer"
        s:hover="fill-[#9299A7]"
      >
        <SvgIcon name="back" class="w-9px h-14px"></SvgIcon>
        <span s:text="[#1F311F]" class="font-bold">返回</span>
      </p>
      <div class="grid grid-cols-[97px,auto] items-center gap-20px">
        <img src="@/assets/images/avatar-girl.png" class="rounded-full" />
        <div class="flex flex-col gap-14px">
          <div class="flex flex-col gap-2">
            <div class="font-bold" s:text="[#1F311F] size-25px">
              张玲燕（猫猫）
            </div>
            <div s:text="[#1F311F] sm" class="flex gap-2 font-medium">
              <span>北京白河狸科技</span> <span>中海店</span> <span>店长</span>
              <span>女</span>
              <span>1992.07.02</span>
            </div>
          </div>
          <!-- 账号创建时间 -->
          <div class="" s:text="[#6C766E] xs">账号创建时间：2019.01.01</div>
        </div>
      </div>
      <div
        s:text="[#1F311F] sm"
        class="flex flex-col gap-20px fill-[#1F311F] pt-40px font-medium"
      >
        <div class="flex gap-40px">
          <!-- 手机号 -->
          <div class="flex items-center gap-9px min-w-109px">
            <SvgIcon name="phone" class="w-14px h-18px"></SvgIcon>
            <span>13924156728</span>
          </div>
          <!-- 座机 -->
          <div class="flex items-center gap-9px min-w-109px">
            <SvgIcon name="phone" class="w-14px h-18px"></SvgIcon>
            <span>010-12345678</span>
          </div>

          <!-- 邮箱 -->
          <div class="flex items-center gap-9px min-w-109px">
            <SvgIcon name="phone" class="w-14px h-18px"></SvgIcon>
            <span>yfz19920604@sina.com</span>
          </div>
        </div>
        <div class="flex gap-40px">
          <!-- ID -->
          <div class="flex items-center gap-9px min-w-109px">
            <SvgIcon name="phone" class="w-14px h-18px"></SvgIcon>
            <span>123456789</span>
          </div>
          <!-- 地址 -->
          <div class="flex items-center gap-9px min-w-109px">
            <SvgIcon name="phone" class="w-14px h-18px"></SvgIcon>
            <span>北京市朝阳区望京街道</span>
          </div>
        </div>
      </div>
      <!-- 部门 -->
      <div s:text="[#83867E] sm" class="pt-60px flex flex-col gap-17px">
        <div>
          <span>所在部门:</span>
          <span s:text="[#1F311F]" class="font-bold ml-5px">中海店</span>

          <span class="ml-20px"> <Checkbox></Checkbox> </span>
          <span class="ml-5px">部门Leader</span>
        </div>
        <div class="flex gap-20px items-center">
          <!-- 员工账号 -->
          <div>
            <span>员工账号:</span>
            <span s:text="[#1F311F]" class="font-bold ml-5px">13924156728</span>
          </div>
          <span
            @click="isModalAccount = true"
            class="text-primary text-xs cursor-pointer underline-primary underline underline-2px underline-offset-2"
          >
            修改账号
          </span>
          <span
            @click="isModalReset = true"
            class="text-primary text-xs cursor-pointer underline-primary underline underline-2px underline-offset-2"
          >
            重置密码
          </span>
        </div>
        <div>
          <span>员工职位:</span>
          <span s:text="[#1F311F]" class="font-bold ml-5px">店长</span>
        </div>
        <div>
          <span>员工角色:</span>
          <span s:text="[#1F311F]" class="font-bold ml-5px">店长</span>
        </div>
      </div>
    </div>
    <div class="flex gap-10px pt-30px" s:text="sm">
      <CancelButton @click="back"> 返回 </CancelButton>
      <OkButton @click="onAddStaff({ realName: '张玲燕（猫猫）' })">
        编辑
      </OkButton>
    </div>
    <!-- 修改账号 -->
    <Modal title="修改账号" v-model:visible="isModalAccount" :footer="null">
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <h3 s:text="black md" class="pt-2opx">原员工手机账户：13924156728</h3>
      <Form
        class="sikong-form2 pt-18px"
        @finish="onModifyAccount"
        :model="modifyAccountForm"
      >
        <FormItem
          name="phone"
          :rules="[
            { required: true, message: '请输入手机号!' },
            { validator: checkPhoneNumber, target: 'change' },
          ]"
        >
          <Input
            v-model:value="modifyAccountForm.phone"
            class="rounded-8px"
            placeholder="请输入新员工账号"
          >
          </Input>
        </FormItem>
        <FormItem>
          <span s:text="[#F3AB51] xs">密码以短信的形式下发至新手机号码</span>
        </FormItem>
        <div class="flex gap-10px">
          <CancelButton @click="isModalAccount = false"> 取消 </CancelButton>
          <OkButton> 保存 </OkButton>
        </div>
      </Form>
    </Modal>
    <!-- 重置密码 -->
    <Modal title="重置密码" v-model:visible="isModalReset" :footer="null">
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <h3 s:text="black md" class="pt-2opx">
        您确定要重置"张玲燕(猫猫)"的登录密码吗？
      </h3>
      <span s:text="[#F3AB51] xs"
        >重置密码将以短信下发至"张玲燕(猫猫)"手机号，是否继续执行重置密码？</span
      >
      <div class="flex gap-10px pt-30px">
        <CancelButton @click="isModalReset = false"> 取消 </CancelButton>
        <OkButton @click="onModifyPassword"> 确定 </OkButton>
      </div>
    </Modal>
    <!-- 修改员工 -->
    <AddStaff ref="addStaff" :footer="null" title="员工详细信息"/>
  </div>
</template>

<script lang="ts" setup>
import { useRouteQueryObject } from '@/hooks/web/use-page'
import { useRouter } from 'vue-router'
import SvgIcon from '../../components/SvgIcon.vue'
// antd-vue
import { Checkbox, Modal, Form, FormItem, Input } from 'ant-design-vue'

import AddStaff from './modules/add-staff.vue'
//checkPhoneNumber
import { checkPhoneNumber } from '@/utils/antd/form'
import { getCurrentInstance, ref } from 'vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const { ctx } = getCurrentInstance() as any
const { routeQuery } = useRouteQueryObject('org')
const router = useRouter()
const isModalReset = ref(false)
// 修改账号
const isModalAccount = ref(false)
const modifyAccountForm = ref({
  phone: '',
})
function onModifyPassword() {
  isModalReset.value = false
  // Modal.success({
  //   title: '提示',
  //   content: '密码重置成功',
  // })
}
// onModifyAccount
const onModifyAccount = values => {
  console.log('Success:', values)
  isModalAccount.value = false
}
// 返回页面
const back = () => {
  router.back()
}
function onAddStaff(record) {
  ctx.$refs.addStaff.show(record)
}
</script>
