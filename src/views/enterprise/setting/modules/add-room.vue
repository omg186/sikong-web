<template>
  <Form class="sikong-form2 add-room-view ant-row" layout="vertical">
    <Row :gutter="[20, 0]">
      <Col :span="24">
        <FormItem label="企业LOGO" :colon="false">
          <div class="flex flex-col">
            <Upload
              v-model:file-list="formData.fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader w-172px h-98px"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <div v-if="imageUrl" class="avatar relative w-full h-full">
                <img
                  class="avatar-edit absolute top-[-1px] right-[-1px]"
                  src="@/assets/images/avatar-edit.png"
                />
                <div class="flex h-full justify-center items-center">
                  <img :src="imageUrl" alt="avatar" />
                </div>
              </div>
              <div v-else class="">
                <loading-outlined
                  v-if="loadingFile"
                  style="font-size: 32px"
                ></loading-outlined>
                <plus-outlined
                  v-else
                  style="color: #d8d8d8; font-size: 32px"
                ></plus-outlined>
                <div class="ant-upload-text"></div>
              </div>
            </Upload>
            <span class="text-xs text-[#F3AB51] font-400 pt-17px"
              >推荐尺寸800*800px，大小不超过5M，jpg、jpeg、png格式均可</span
            >
          </div>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem
          :colon="false"
          v-bind="validateInfos.roomName"
          label="教室/场地名称"
          class="flex-reverse-end"
        >
          <Input
            placeholder="请输入场地名称"
            v-model:value="formData.roomName"
            class="rounded-8px"
          ></Input> </FormItem
      ></Col>
      <!-- 所属校区 -->

      <Col :span="12">
        <FormItem
          v-bind="validateInfos.schoolName"
          label="所属校区"
          class="flex-reverse-end"
        >
          <Select
            v-model:value="formData.schoolId"
            placeholder="请选择所属校区"
            showSearch
          >
            <SelectOption v-for="item in schoolList" :value="item.id">
              {{ item.name }}
            </SelectOption>
          </Select>
        </FormItem>
      </Col>
      <FormItem v-bind="validateInfos.deptCode">
        <Select placeholder="请选择所属部门" class="rounded-8px">
          <SelectOption value="技术部">技术部</SelectOption>
          <SelectOption value="产品部">产品部</SelectOption>
        </Select>
      </FormItem>
    </Row>
    <div class="flex gap-10px pt-30px">
      <Button class="btn cancel h-40px w-90px" @click="onCancel"> 取消 </Button>
      <Button
        v-if="!props.isEdit"
        class="rounded-40px h-40px w-137px bg-primary text-white"
        s:border="1px solid [#C7F7E3]"
        type="primary"
        @click="onSubmit(true)"
      >
        保持并继续添加
      </Button>
      <Button
        class="rounded-40px h-40px w-90px bg-primary text-white"
        s:border="1px solid [#C7F7E3]"
        type="primary"
        @click="onSubmit(false)"
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
  Select,
  SelectOption,
  Button,
  Upload,
  UploadProps,
  message,
  UploadChangeParam,
  Row,
  Col,
} from 'ant-design-vue'

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { ref, watchEffect } from 'vue'
import { RoomDto } from './interface'
import { useRequest } from 'vue-request'
import { getOptionsListApi } from '@/api/select'
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
  (event: 'onOk', value: RoomDto, isContinue: boolean): void
}>()
const formData = ref<RoomDto>({})
const loadingFile = ref<boolean>(false)
const imageUrl = ref<string>('')
const rules = ref({
  roomName: [{ required: true, message: '请输入教室/场地名称' }],
  deptCode: [{ required: true, message: '请选择所属部门' }],
})
const { data: schoolList } = useRequest(
  () => {
    return getOptionsListApi({
      keyword: '学校',
    })
  },
  { manual: false }
)
const { resetFields, validate, validateInfos } = Form.useForm(formData, rules)
watchEffect(() => {
  if (props.code && props.isEdit) {
    formData.value = {}
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

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg'
  if (!isJpgOrPng) {
    message.error('只能上传指定格式!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('图片大小不能超过5MB!')
  }
  return isJpgOrPng && isLt5M
}
const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loadingFile.value = true
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      loadingFile.value = false
    })
  }
  if (info.file.status === 'error') {
    loadingFile.value = false
    message.error('upload error')
  }
}
</script>

<style lang="less">
.add-room-view {
  .avatar-uploader {
    .ant-upload-select-picture-card {
      @apply w-172px h-98px;
    }
  }
}
</style>
