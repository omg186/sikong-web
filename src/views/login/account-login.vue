<template>
  <div class="account-view">
    <form class="flex flex-col gap-y-[10px]">
      <div class="form-group">
        <input
          type="text"
          class="input"
          placeholder="请输入账号"
          autocomplete="off"
          name="account"
          @blur="handleBlurAccount"
          v-model="form.account"
        />
        <div class="feedback">
          {{ modelControl['account'] }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="password"
          class="input"
          autocomplete="off"
          placeholder="请输入密码"
          name="password"
          v-model="form.password"
        />
        <div class="feedback">
          {{ modelControl['password'] }}
        </div>
      </div>
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
        <Button class="btn-linear min-h-50px rounded-60px" @click="onSubmit">
          登录
        </Button>
        <!-- <button class="btn login bg-gradient-hero" @click="onSubmit">
          登录
        </button> -->
      </div>
    </form>
    <div
      class="flex justify-center text-[#E3E4E2] font-medium mt-[36px] hover:text-[#C3CAC6] active:text-[#83867E]"
    >
      <router-link to="/" class="custom-rule custom-rule m-1">
        忘记密码
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Schema from 'async-validator'
import { reactive } from 'vue'
import { Button, FormItem, InputPassword } from 'ant-design-vue'
import { useApiLogin } from './useLogin'
import { useRequest } from 'vue-request'
import { useUserStore } from '@/store/modules/user'
// import { Button } from '@/components/Button'
const modelControl = reactive({})

const userStore = useUserStore()
const form = reactive({
  account: 'test',
  password: '123456',
})
const rules = {
  account: {
    required: true,
    message: '请输入账号',
  },
  password: {
    required: true,
    message: '请输入密码',
  },
}
const validator = new Schema(rules)
const handleBlurAccount = e => {
  const prop = e.target.attributes.name.value
  if (!prop) {
    return false
  }
  validator.validate({ account: form.account }, (errors, fields) => {
    if (errors && fields.account) {
      console.log(fields.account[0].message)
      modelControl[prop] = fields[prop][0].message
      return errors
    }
    modelControl[prop] = null
  })
}
const { data, loading, run } = useRequest(() => {
  return userStore.login({ account: form.account, password: form.password })
})
function onSubmit(e) {
  e.preventDefault()
  validator.validate(form, (errors, fields) => {
    if (errors) {
      for (let key of errors) {
        console.log(key.message)
      }
      return errors
    } else {
      run()
      console.log(data)
    }
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
