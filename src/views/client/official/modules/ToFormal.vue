<template>
  <div>
    <div class="flex gap-20px py-25px">
      <TextItem title="意向客户" contents="李睿曦" />
      <!-- 联系人：包女士 -->
      <TextItem title="联系人" contents="包女士" />
      <TextItem title="所属顾问" contents="张燕玲（猫猫）" />
    </div>
    <Form layout="vertical">
      <!-- 调整客户状态 -->
      <FormItem label="所属教练" prop="status">
        <Select placeholder="请选择所属教练" class="select-icon min-w-118px">
          <template #suffixIcon>
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
          <SelectOption value="0">调整客户状态</SelectOption>
          <SelectOption value="1">意向</SelectOption>
          <SelectOption value="2">正式</SelectOption>
          <SelectOption value="3">流失</SelectOption>
        </Select>
      </FormItem>
      <!-- 记录内容 -->
      <FormItem label="备注" prop="content">
        <Textarea type="textarea" :auto-size="{ minRows: 5, maxRows: 8 }" />
      </FormItem>
      <!-- 按钮 -->
      <div class="flex gap-15px">
        <CancelButton @click="onCancel"> 取消 </CancelButton>

        <OkButton @click="onSubmit"> 保存 </OkButton>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import TextItem from '@/components/TextItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import {
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  Button,
} from 'ant-design-vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
// emits
const emits = defineEmits(['onSubmit', 'onCancel'])
// 取消 按钮
const onCancel = () => {
  emits('onCancel')
}
// 保存 按钮
const onSubmit = () => {
  emits('onSubmit', {})
}
</script>
