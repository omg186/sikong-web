<template>
  <Form layout="vertical">
    <!-- 记录内容 -->
    <FormItem label="记录内容" prop="content">
      <Textarea type="textarea" :auto-size="{ minRows: 2, maxRows: 5 }" />
    </FormItem>
    <!-- 调整客户状态 -->
    <FormItem label="调整客户状态" prop="status">
      <Select placeholder="调整客户状态" class="select-icon min-w-118px">
        <template #suffixIcon>
          <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
        </template>
        <SelectOption value="0">调整客户状态</SelectOption>
        <SelectOption value="1">意向</SelectOption>
        <SelectOption value="2">正式</SelectOption>
        <SelectOption value="3">流失</SelectOption>
      </Select>
    </FormItem>
    <!-- 按钮 -->
    <div class="flex gap-15px">
      <Button class="btn cancel h-40px w-90px" @click="onCancel"> 取消 </Button>

      <Button
        class="rounded-40px h-40px w-90px bg-primary text-white"
        s:border="1px solid [#C7F7E3]"
        type="primary"
        @click="onSubmit"
      >
        保存
      </Button>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  Button,
} from 'ant-design-vue'
import SvgIcon from '@/components/SvgIcon.vue'

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
