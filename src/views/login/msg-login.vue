<template>
  <div class="account-view">
    <form class="flex flex-col">
      <div class="form-group">
        <input type="text" class="input" placeholder="请输入手机号" autocomplete="off" name="phoneNumber"
          @blur="handleBlurPhone" v-model="form.phoneNumber" />
        <div class="feedback">
          {{ modelControl['phoneNumber'] }}
        </div>
      </div>
      <div class="form-group">
        <div class="flex valid-input">
          <input type="text" class="input" autocomplete="off" placeholder="请输入验证码" name="verificationCode"
            v-model="form.verificationCode" />
          <span class="text-[#2FE095] text-center" @click="start(60)">{{ !time?(!clickCount?'获取验证码':'再次获取'):time + 's'}}</span>
        </div>
        <div class="feedback">
          {{ modelControl['verificationCode'] }}
        </div>
      </div>
      <div>
        <Button class="btn-linear min-h-50px rounded-60px" @click="onSubmit"> 登录 </Button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { Button, FormItem, InputPassword } from 'ant-design-vue'
import Schema from 'async-validator'
import { useIntervalFn } from '@vueuse/core'
import { message } from 'ant-design-vue';
const time = ref(0)
const clickCount = ref(0)
const { pause, resume } = useIntervalFn(
  () => {
    time.value--
    if (time.value <= 0) {
      pause()
    }
  },
  1000,
  { immediate: false }
)
const start = (num: number) => {
  if(form.phoneNumber){
    clickCount.value = clickCount.value +1
    // 赋值
    time.value = num
    // 调用
    resume()
  }else{
    message.warning('请输入手机号')
  }
 
}

const modelControl = reactive({})
const form = reactive({
  phoneNumber: '',
  verificationCode: '',
})
const rules = {
  phoneNumber: {
    required: true,
    message: '请输入手机号',
  },
  verificationCode: {
    required: true,
    message: '请输入验证码',
  },
}
const validator = new Schema(rules)
const handleBlurPhone = e => {
  const prop = e.target.attributes.name.value
  if (!prop) {
    return false
  }
  validator.validate({ phoneNumber: form.phoneNumber }, (errors, fields) => {
    if (errors && fields.phoneNumber) {
      console.log(fields.phoneNumber[0].message)
      modelControl[prop] = fields[prop][0].message
      return errors
    }
    modelControl[prop] = null
  })
}
function onSubmit(e) {
  e.preventDefault()
  validator.validate(form, (errors, fields) => {
    if (errors) {
      for (let key of errors) {
        console.log(key.message)
      }
      return errors
    }
  })
}
</script>
<style lang="less" scoped>
.account-view {
  width: 322px;

  .valid-input {
    --bc: #DBDFDD;
    --caret-color: #62A1FF;
    @apply box-border w-full outline-none;
    border-radius: 60px;
    height: 50px;
    border: 1px solid var(--bc);
    font-size: 14px;
    font-weight: 400;
    color: #2D3A2F;

    .input {
      --bc: #DBDFDD;
      --caret-color: #62A1FF;
      @apply box-border w-full outline-none;
      height: 46px;
      padding: 15px 20px;
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #2D3A2F;

      &:focus,
      &:hover,
      &:active {
        caret-color: var(--caret-color);
        border-color: var(--bc);
        font-size: 14px;
      }

      ::placeholder {
        color: #83867E;
        font-size: 14px;
      }
    }

    span {
      cursor: pointer;
      width: 43%;
      line-height: 50px;
    }
  }
}
</style>
