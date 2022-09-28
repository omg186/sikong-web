<template>
  <Form class="sikong-form2">
    <FormItem v-bind="validateInfos.deptName">
      <Input
        placeholder="请输入部门名称"
        v-model:value="formData.deptName"
        class="rounded-8px"
      ></Input>
    </FormItem>

    <FormItem v-bind="validateInfos.deptCode" v-show="isEdit">
      <Select
        placeholder="请选择所属部门"
        v-model:value="formData.deptCode"
        class="rounded-8px"
      >
        <SelectOption value="技术部">技术部</SelectOption>
        <SelectOption value="产品部">产品部</SelectOption>
      </Select>
    </FormItem>
    <div class="flex gap-10px pt-30px">
      <CancelButton @click="onCancel"> 取消 </CancelButton>
      <OkButton v-if="!props.isEdit" @click="onSubmit(true)">
        保持并继续添加
      </OkButton>
      <OkButton @click="onSubmit(false)"> 保存 </OkButton>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  Button,
} from 'ant-design-vue'
import { ref, watchEffect } from 'vue'
import { DeptFormData } from './interface'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: '',
  },
})

const emits = defineEmits<{
  (event: 'onCancel'): void
  (event: 'onOk', value: DeptFormData, isContinue: boolean): void
}>()
const formData = ref({
  deptName: '',
  deptCode: undefined,
})
const rules = ref({
  deptName: [
    { required: true, message: '请输入部门名称' },
    { max: 20, message: '部门名称不能超过20个字符' },
  ],
  deptCode: [{ required: true, message: '请选择所属部门' }],
})
const { resetFields, validate, validateInfos } = Form.useForm(formData, rules)
watchEffect(() => {
  if (props.code && props.isEdit) {
    formData.value = {
      deptName: 'edit',
      deptCode: '',
    }
  } else {
    resetFields()
  }
})
function onCancel() {
  resetFields()
  emits('onCancel')
}
function onOk(isContinue: boolean) {
  emits('onOk', formData.value, isContinue)
  resetFields()
}
function onSubmit(isContinue: boolean) {
  validate()
    .then(() => {
      onOk(isContinue)
    })
    .catch(err => {
      console.log(err)
    })
}
</script>
