<template>
  <Modal
    v-model:visible="visible"
    title="添加员工"
    width="660px"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <Form
      class="w-full h-full"
      layout="vertical"
      ref="formRef"
      :model="formState"
      :rules="validateRules"
      @finish="onFinish"
      @finish-failed="onFinishFailed"
    >
      <FormItem label="头像" name="imageUrl">
        <div class="felx flex-col">
          <div class="flex mb-[17px]">
            <Upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader w-[104px] h-[104px]"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <div v-if="imageUrl" class="avatar relative w-full h-full">
                <img
                  class="avatar-edit absolute top-[-1px] right-[-1px]"
                  src="../../assets/images/avatar-edit.png"
                />
                <div class="flex h-full justify-center items-center">
                  <img :src="imageUrl" alt="avatar" />
                </div>
              </div>
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else style="color: #d8d8d8"></plus-outlined>
                <div class="ant-upload-text"></div>
              </div>
            </Upload>
            <div
              class="w-[104px] h-[104px] ml-[30px] cursor-pointer border-gray-300 border-dashed"
            >
              <img src="../../../assets/images/avatar-boy.png" alt="" />
            </div>
            <div class="w-[104px] h-[104px] ml-[20px] cursor-pointer">
              <img src="../../../assets/images/avatar-girl.png" alt="" />
            </div>
          </div>
          <span class="text-xs text-[#F3AB51] font-400"
            >推荐尺寸800*800px，大小不超过5M，jpg、jpeg、png格式均可</span
          >
        </div>
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'

import {
  Modal,
  Form,
  FormItem,
  Upload,
  message,
  UploadChangeParam,
  UploadProps,
} from 'ant-design-vue'
const confirmLoading = ref<boolean>(false)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})
const imageUrl = ref<string>('')
const fileList = ref([])
const formState = reactive({
  account: '北京腾讯少儿体能馆',
  business: '',
  businessEntity: '',
  imageUrl: '',
  fileList: [],
  createTime: '2022/3/17 11:29',
  projectName: [],
  projectId: [],
  projectSelect: [],
  province: null,
  citys: null,
  areas: null,
  street: null,
  cellPhone: '',
  officialWebsite: 'www.whitebeave.net.cn',
  address: '',
})
const validateRules = reactive({
  imageUrl: [{ required: true, message: '请选择头像' }],
  business: [{ required: true, message: '请输入企业主体简称' }],
  projectName: [{ required: true, message: '请选择培训项目' }],
  street: [{ required: true, message: '请选择地址' }],
  province: [{ required: true, message: '请选择地址' }],
})
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
const loading = ref<boolean>(false)
const getBase64 = (img: Blob, callback: (base64Url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}
const handleOk = () => {
  // modalText.value = 'The modal will be closed after two seconds';
  confirmLoading.value = true
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const onFinish = (values: any) => {
  console.log('Success:', values, formState)
}
</script>
