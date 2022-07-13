<template>
  <div class="account-view">
    <Form
      :model="form"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <FormItem
        name="phoneNumber"
        :rules="[
          { required: true, message: '请输入手机号!' },
          { validator: checkPhoneNumber, target: 'change' },
        ]"
        class="flex"
      >
        <Input
          class="input"
          v-model:value="form.phoneNumber"
          placeholder="请输入手机号"
        />
      </FormItem>
      <FormItem
        name="verificationCode"
        :rules="[{ required: true, message: '请输入验证码!' }]"
      >
        <Input
          v-model:value="form.verificationCode"
          class="valid-input w-322px"
          placeholder="请输入验证码"
        >
          <template #suffix>
            <span
              class="text-[#2FE095] text-center cursor-pointer"
              @click="start(60, form.phoneNumber)"
              >{{
                !time ? (!clickCount ? '获取验证码' : '再次获取') : time + 's'
              }}
            </span>
          </template>
        </Input>
      </FormItem>
      <Button class="btn-linear min-h-50px rounded-60px" html-type="submit">
        登录
      </Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Button, Input, FormItem, Form, Row } from 'ant-design-vue'
import { useIntervalFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { checkPhoneNumber } from '@/utils/antd/form'
import { useRequest } from 'vue-request'

import { useUserStore } from '@/store/modules/user'
import { regPhone } from '@/utils/reg'
import { useDownInterval } from './useLogin'
const userStore = useUserStore()
const { start, time, clickCount } = useDownInterval()
const form = reactive({
  phoneNumber: '',
  verificationCode: '',
})
const { data, loading, run } = useRequest(() => {
  return userStore.login({
    account: 'test',
    password: form.verificationCode,
  })
})
const onFinish = (values: any) => {
  console.log('Success:', values)
  run()
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
<style lang="less" scoped>
.account-view {
  width: 344px;

  .valid-input {
    --bc: #dbdfdd;
    --caret-color: #62a1ff;
    @apply box-border w-full outline-none;
    width: 322px;
    border-radius: 60px;
    height: 50px;
    border: 1px solid var(--bc);
    font-size: 14px;
    font-weight: 400;
    color: #2d3a2f;

    .input {
      --bc: #dbdfdd;
      --caret-color: #62a1ff;
      @apply box-border w-full outline-none;
      height: 46px;
      padding: 15px 20px;
      padding-left: 10px !important;
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #2d3a2f;

      &:focus,
      &:hover,
      &:active {
        caret-color: var(--caret-color);
        border-color: var(--bc);
        font-size: 14px;
      }

      ::placeholder {
        color: #83867e;
        font-size: 14px;
      }
    }

    span {
      cursor: pointer;
      line-height: 50px;
    }
  }
}
</style>
