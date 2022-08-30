<template>
  <div
    class="grid grid-cols-2 grid-cols-[644px,minmax(900px,auto)] min-h-500px h-full"
  >
    <!-- <div class="grid grid-cols-2 min-h-500px"> -->
    <div class="aspect-1080/644">
      <img src="@/assets/images/person2.png" />
    </div>
    <div class="bg-white pl-17px pr-50px">
      <p class="flex justify-between pt-41px">
        <img src="@/assets/images/logo2.png" />
        <span s:text="sm">
          已有账号，
          <router-link
            to="/login"
            s:text="primary underline underline-offset-4"
            s:hover="text-primary underline underline-offset-4"
          >
            直接登录
          </router-link>
        </span>
      </p>
      <div class="flex flex-col items-center pt-41px gap-33px">
        <h1 s:text="primary size-28px" class="font-bold">欢迎注册“司空”账号</h1>
        <div
          class="w-460px h-44px flex items-center justify-center bg-[#FFFADF] rounded-xl"
          s:text="sm [#F3AB51]"
        >
          如果您的企业已经购买司空，请直接联系管理员为您开通账号！
        </div>
        <Form @submit="onSubmit" class="sikong-form">
          <h3 s:text="[#1F311F] bold" class="ml-25px">企业信息</h3>
          <div class="pt-27px">
            <FormItem v-bind="validateInfos.companyName">
              <Input
                placeholder="请输入企业全称"
                name="companyName"
                class="h-50px w-460px rounded-60 pl-25px"
                v-model:value="formData.companyName"
              ></Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
            <FormItem v-bind="validateInfos.projectId">
              <Input
                placeholder="企业培训项目（可多选）"
                class="after after-text h-50px w-460px rounded-60"
                readonly
                name="projectName"
                @click="data.isSelect = true"
                v-model:value="formData.projectName"
              >
                <template #suffix>
                  <div class="h-30px w-30px aspect-square">
                    <img src="@/assets/images/down-icon.png" />
                  </div>
                </template>
              </Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
          </div>
          <h3 s:text="[#1F311F] bold" class="ml-25px pt-10px">管理员信息</h3>
          <div class="pt-27px">
            <FormItem v-bind="validateInfos.adminName">
              <Input
                placeholder="请输入企业管理员姓名"
                class="h-50px w-460px rounded-60 pl-25px"
                name="adminName"
                v-model:value="formData.adminName"
              ></Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
            <FormItem v-bind="validateInfos.adminPhone">
              <Input
                placeholder="请输入企业管理员手机"
                name="adminPhone"
                class="h-50px w-460px rounded-60 pl-25px"
                v-model:value="formData.adminPhone"
              >
              </Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
            <FormItem v-bind="validateInfos.phoneCode">
              <Input
                placeholder="请输入手机验证码"
                name="phoneCode"
                class="after after-text h-50px w-460px rounded-60"
                v-model:value="formData.phoneCode"
              >
                <template #suffix>
                  <a
                    type="link"
                    s:text="primary"
                    @click="start(60, formData.adminPhone)"
                  >
                    {{
                      !time
                        ? !clickCount
                          ? '获取验证码'
                          : '再次获取'
                        : time + 's'
                    }}
                  </a>
                </template>
              </Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
          </div>
          <FormItem v-bind="validateInfos.checked" noStyle>
            <Checkbox
              v-model:checked="formData.checked"
              class="flex-center pt-10px w-full"
            >
              <p s:text="xs">
                <span>我已阅读并同意</span>
                <a s:text="primary">《司空用户服务协议》</a>和
                <a s:text="primary">《司空隐私保护条款》</a>
              </p>
            </Checkbox>
          </FormItem>
          <Button
            type="default"
            class="btn w-full h-50px mt-26px btn-linear rounded-60"
            :disabled="data.isDisabled"
            @click="onSubmit"
          >
            注册
          </Button>
        </Form>
      </div>
    </div>
    <SelectProject
      v-if="data.isSelect"
      :data="projectData"
      @onOk="onSelectProject"
      :selected="formData.projectSelect"
      v-model:visible="data.isSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  message,
} from 'ant-design-vue'
import SelectProject from './modules/SelectModal.vue'
import { useRequest } from 'vue-request'
import { getCompanyProjectList } from '@/api/company'
import { computed, reactive, ref, toRaw, watchEffect } from 'vue'
import { toArray } from 'lodash-es'
import Schema from 'async-validator'
import { SelectItem, useDownInterval } from './useLogin'
import { useIntervalFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { checkPhoneNumber } from '@/utils/antd/form'
const useForm = Form.useForm
const router = useRouter()
const { start, time, clickCount } = useDownInterval()

const data = reactive({
  isSelect: false,
  isDisabled: false,
})
const formData = reactive({
  companyName: '',
  projectId: [],
  projectSelect: [],
  projectName: '',
  adminName: '',
  adminPhone: '',
  phoneCode: '',
  checked: false,
})
const formRules = reactive({
  companyName: [{ required: true, message: '请输入企业全称' }],
  projectName: [{ required: true, message: '请选择企业培训项目' }],
  adminName: [{ required: true, message: '请输入企业管理员姓名' }],
  adminPhone: [
    {
      required: true,
      message: '请输入企业管理员手机',
    },
    { validator: checkPhoneNumber, target: 'change' },
  ],
  phoneCode: [{ required: true, message: '请输入手机验证码' }],
  checked: [
    {
      required: true,
      message: '请同意司空用户服务协议',
      validator: (_rule: any, value: number) => {
        if (value) {
          return Promise.resolve()
        }
        return Promise.reject('请同意司空用户服务协议')
      },
    },
  ],
})
//@ts-ignore
const validator = new Schema(formRules)
const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(
  formData,
  formRules,
  {
    onValidate: (...args) => {
      console.log(...args)
    },
  }
)
watchEffect(() => {
  const form = formData
  validator.validate(form, (errors, fields) => {
    if (errors) {
      console.log(errors, fields)
      data.isDisabled = true
    } else {
      data.isDisabled = false
    }
    // validation passed
  })
})
function onSubmit() {
  validate()
    .then(() => {
      console.log(toRaw(formData))
      // 注册成功
      const hide = message.success('注册成功,正在前往登录', 0)
      setTimeout(() => {
        hide()
        router.push('/login')
      }, 2000)
    })
    .catch(err => {
      console.log(err)
    })
}
const { data: projectData, loading } = useRequest(
  () => {
    return getCompanyProjectList()
  },
  { manual: false }
)
watchEffect(() => {
  console.log(projectData.value)
})
function onSelectProject(selected: Map<number, SelectItem>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  formData.projectId = toArray(selected.keys())
  formData.projectSelect = arr.map(p => p)
  formData.projectName = arr.map(p => p.name).join(',')
  data.isSelect = false
}
</script>
