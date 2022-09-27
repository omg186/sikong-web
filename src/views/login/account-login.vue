<template>
  <div class="account-view">
    <Form
      class="sikong-form flex flex-col gap-y-[10px]"
      @keyup.enter="onSubmit"
    >
      <FormItem class="form-group" v-bind="validateInfos.account">
        <Input
          type="text"
          class="input"
          placeholder="请输入账号"
          autocomplete="off"
          name="account"
          v-model:value="form.account"
        />
      </FormItem>
      <FormItem class="form-group" v-bind="validateInfos.password">
        <Input
          type="password"
          class="input"
          autocomplete="off"
          placeholder="请输入密码"
          name="password"
          v-model:value="form.password"
        />
      </FormItem>
      <div>
        <div
          class="valid-input input flex items-center cursor-pointer min-h-[50px] rounded-[60px]"
        >
          <div
            class="ml-[20px] h-[20px] aspect-square flex justify-center items-center bg-[#C7F7E3] rounded-full animate-pulse"
          >
            <div class="h-[10px] aspect-square bg-[#2FE095] rounded-full"></div>
          </div>
          <div
            class="absolute translate-x-[-50%] transform text-[#2FE095] text-sm left-1/2"
          >
            点击按钮进行验证
          </div>
        </div>
      </div>
      <div class="pt-[30px]">
        <Button
          class="btn-linear min-h-50px rounded-60px"
          @click="onSubmit"
          :loading="loading"
        >
          登录
        </Button>
        <!-- <button class="btn login bg-gradient-hero" @click="onSubmit">
          登录
        </button> -->
      </div>
    </Form>
    <div
      class="flex justify-center text-[#E3E4E2] font-medium mt-[36px] hover:text-[#C3CAC6] active:text-[#83867E]"
    >
      <router-link to="/" class="custom-rule custom-rule m-1 text-12px">
        忘记密码
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRaw } from 'vue'
import { Button, Form, FormItem, Input } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import { useUserStore } from '@/store/modules/user'
// import { Button } from '@/components/Button'
const modelControl = reactive({})

const useForm = Form.useForm
const userStore = useUserStore()
const form = reactive({
  account: 'test',
  password: '123456',
})
const rules = reactive({
  account: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
})
const { resetFields, validate, validateInfos } = useForm(form, rules, {
  onValidate: (...args) => console.log(...args),
})
const { data, loading, run } = useRequest(() => {
  return userStore.login({ account: form.account, password: form.password })
})
function onSubmit() {
  validate()
    .then(() => {
      run()
      console.log(toRaw(form))
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<style lang="less" scoped>
.account-view {
  width: 322px;
  .valid-input {
    @apply flex pl-[15px] relative bg-[#F7FEFB]
    border-radius: 60px;
    border: 1px solid #c7f7e3;
    &:hover,
    &:focus {
      border-color: #9aebc9;
      background: #ddfff0;
    }
    &:active {
      background: #c6fce4;
      border-color: #75e4b5;
    }
  }
}
</style>
