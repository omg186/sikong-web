<template>
  <div
    class="grid grid-cols-2 grid-cols-[644px,minmax(900px,auto)] min-h-500px h-full"
  >
    <!-- <div class="grid grid-cols-2 min-h-500px"> -->
    <div class="bg-blue-500 aspect-1080/644"></div>
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
        <Form>
          <h3 s:text="[#1F311F] bold" class="ml-25px">企业信息</h3>
          <div class="pt-27px">
            <FormItem>
              <Input
                placeholder="请输入企业全称"
                class="h-50px w-460px rounded-60 pl-25px"
              ></Input>
              <span class="ml-8px" s:text="size-24px red-600">*</span>
            </FormItem>
            <FormItem>
              <Input
                placeholder="企业培训项目（可多选）"
                class="select h-50px w-460px rounded-60"
                readonly
                @click="data.isSelect = true"
              >
                <template #addonAfter> <DownOutlined /> </template>
              </Input>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
    <SelectProject :data="projectData" v-model:visible="data.isSelect" />
  </div>
</template>

<script lang="ts" setup>
import { Form, FormItem, Input, Select } from 'ant-design-vue'
import { DownOutlined } from '@ant-design/icons-vue'
import SelectProject from './modules/select-project.vue'
import { useRequest } from 'vue-request'
import { getCompanyProjectList } from '@/api/company'
import { reactive, watchEffect } from 'vue'
const data = reactive({
  isSelect: false,
})
const { data: projectData, loading } = useRequest(
  () => {
    return getCompanyProjectList()
  },
  { manual: false }
)
watchEffect(() => {
  console.log(projectData.value)
})
</script>
