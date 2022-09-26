<template>
  <Modal
    v-model:visible="visible"
    :title="title"
    width="660px"
    :confirm-loading="confirmLoading"
    destroyOnClose
  >
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
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
            <div>
              <div v-show="!isEdit" class="text-[#1F311F] h-[30px]">
                自定义头像
              </div>
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
                    src="@/assets/images/avatar-edit.png"
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
            </div>
            <div v-if="!isEdit">
              <div class="pl-[30px] text-[#1F311F] h-[30px]">系统头像</div>
              <div class="flex">
                <div
                  class="w-[104px] h-[104px] ml-[30px] cursor-pointer border-1 border-gray-400 border-dashed"
                >
                  <img src="../../../assets/images/avatar-boy.png" alt="" />
                </div>
                <div
                  class="w-[104px] h-[104px] ml-[20px] cursor-pointer border-1 border-gray-400 border-dashed"
                >
                  <img src="../../../assets/images/avatar-girl.png" alt="" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="flex">
                <div class="flex flex-col ml-18px">
                  <img
                    src="@/assets/images/avatar-girl.png"
                    alt=""
                    class="w-[58px] cursor-pointer mb-10px border-1 border-[#DBDFDD] border-solid rounded-8px"
                  />
                  <img
                    src="@/assets/images/avatar-girl.png"
                    alt=""
                    class="w-[30px] cursor-pointer border-1 border-[#DBDFDD] border-solid rounded-8px"
                  />
                </div>
                <div class="w-[104px] h-[104px] ml-[30px] cursor-pointer">
                  <img src="@/assets/images/avatar-boy.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <span class="text-xs text-[#F3AB51] font-400"
            >如果不使用自定义头像，系统将默认使用系统头像自定义头像的推荐尺寸为800*800px，大小不能超过5M，
            jpg、jpeg、png格式均可。</span
          >
        </div>
      </FormItem>

      <FormItem label="所在部门" name="departName" :wrapper-col="{ span: 24 }">
        <Select
          v-model:value="formState.departName"
          :options="[{ value: '部门1' }, { value: '部门2' }]"
          class="select-checkbox w-[590px] absolute top-[-5px]"
          placeholder="请选择部门"
        >
          <template #suffixIcon>
            <SvgIcon
              name="down"
              class="w-[12px] h-full fill-[#A5A8B4]"
            ></SvgIcon>
            <div class="divide-border mr-100px ml-10px"></div>
          </template>
        </Select>
        <Checkbox
          v-model:value="formState.Leader"
          class="pl-10px relative left-8/10 bottom-[5px] text-[#C1C2BE]"
          >部门Leader</Checkbox
        >
      </FormItem>
      <Row :gutter="20">
        <Col :span="12">
          <FormItem label="姓名" name="realName">
            <Input
              v-model:value="formState.realName"
              placeholder="请输入姓名"
            ></Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="昵称" name="nickName">
            <Input
              v-model:value="formState.nickName"
              placeholder="请输入员工昵称"
            ></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="12">
          <FormItem label="性别" name="sex">
            <Select
              v-model:value="formState.sex"
              :options="[{ value: '男' }, { value: '女' }]"
              class="select-icon"
              placeholder="请选择性别"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-[12px] h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="生日" name="birthday">
            <DatePicker
              v-model:value="formState.birthday"
              placeholder="请输入员工生日"
              class="w-full"
            />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="12">
          <FormItem label="职务" name="job">
            <Input
              v-model:value="formState.job"
              placeholder="请输入职务"
            ></Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="员工角色" name="roleJob">
            <Select
              v-model:value="formState.roleJob"
              :options="[{ value: '角色1' }, { value: '角色2' }]"
              class="select-icon"
              placeholder="请选择员工角色"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-[12px] h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="12">
          <FormItem label="账号" name="account">
            <Input
              v-model:value="formState.account"
              placeholder="请输入账号"
            ></Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="密码" name="passWord">
            <Input
              v-model:value="formState.passWord"
              placeholder="请输入密码"
            ></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="12">
          <FormItem label="座机" name="phoneNum">
            <Input
              v-model:value="formState.phoneNum"
              placeholder="请输入座机"
            ></Input>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="邮箱" name="email">
            <Input
              v-model:value="formState.email"
              placeholder="请输入员工邮箱"
            ></Input>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="企业详细地址" name="province">
            <Select
              v-model:value="formState.province"
              style="width: 184px"
              :options="
                provinceData.map(pro => ({ value: pro.code, label: pro.name }))
              "
              class="select-icon"
              placeholder="请选择省份"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>

        <Col :span="8">
          <FormItem label="" name="citys">
            <Select
              v-model:value="formState.citys"
              :options="
                cityData.map(pro => ({ value: pro.code, label: pro.name }))
              "
              class="select-icon w-[184px] mt-[30px]"
              placeholder="请选择市"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select> </FormItem
        ></Col>
        <Col :span="8">
          <FormItem name="areas">
            <Select
              v-model:value="formState.areas"
              style="width: 184px"
              :options="
                areasData.map(pro => ({ value: pro.code, label: pro.name }))
              "
              class="select-icon w-[184px] mt-[30px]"
              placeholder="请选择区"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="20">
        <Col :span="8">
          <FormItem label="" name="street">
            <Select
              v-model:value="formState.street"
              style="width: 184px"
              :options="
                streetsData.map(pro => ({ value: pro.code, label: pro.name }))
              "
              class="select-icon"
              placeholder="请选择街道"
            >
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>
        <Col :span="16">
          <FormItem name="address">
            <Input
              v-model:value="formState.address"
              placeholder="请输入详细地址，门牌号"
              style="width: 387px"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem class="flex gap-10px py-16px">
        <Space>
          <CancelButton @click="visible = false"> 取消 </CancelButton>
          <OkButton> 保存并继续添加 </OkButton>
          <OkButton> 确定 </OkButton>
        </Space>
      </FormItem>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import SvgIcon from '@/components/SvgIcon.vue'
import provinceData from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import streets from 'china-division/dist/streets.json'
import {
  Modal,
  Form,
  FormItem,
  Upload,
  message,
  UploadChangeParam,
  UploadProps,
  Select,
  Input,
  Row,
  Col,
  Button,
  Space,
  FormInstance,
  Checkbox,
  DatePicker,
} from 'ant-design-vue'
import { nextTick } from 'vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const confirmLoading = ref<boolean>(false)
const imageUrl = ref<string>('')
const isEdit = ref<boolean>(false)
const fileList = ref([])
let visible = ref<boolean>(false)
const formRef = ref<FormInstance>()
defineProps({
  title: {
    type: String,
    required: false,
    default: '添加员工',
  },
})
const show = record => {
  // formRef.value.resetFields() //重置
  if (Object.keys(record).length > 0) {
    isEdit.value = true
  } else {
    isEdit.value = false
  }
  nextTick(() => {
    formState.value = record
  })
  visible.value = true
}
defineExpose({
  show,
})
const formState = ref({
  imageUrl: '',
  fileList: [],
  departName: null,
  Leader: false,
  realName: null,
  nickName: '',
  sex: null,
  birthday: '',
  job: '',
  roleJob: null,
  account: '',
  passWord: '',
  phoneNum: '',
  email: '',
  province: null,
  citys: null,
  areas: null,
  address: '',
  street: null,
})
const validateRules = reactive({
  imageUrl: [{ required: true, message: '请选择头像' }],
  departName: [{ required: true, message: '请选择部门' }],
  realName: [{ required: true, message: '请输入真实姓名' }],
  nickName: [{ required: true, message: '请输入员工昵称' }],
  sex: [{ required: true, message: '请选择员工性别' }],
  birthday: [{ required: true, message: '请选择员工生日' }],
  job: [{ required: true, message: '请输入员工职务' }],
  roleJob: [{ required: true, message: '请选择职位角色' }],
  account: [{ required: true, message: '请输入员工账号' }],
  phoneNum: [{ required: true, message: '请输入手机号' }],
  passWord: [{ required: true, message: '请输入密码' }],
  email: [{ required: true, message: '请输入邮箱' }],
  street: [{ required: true, message: '请选择街道' }],
  province: [{ required: true, message: '请选择省' }],
  citys: [{ required: true, message: '请选择市' }],
  address: [{ required: true, message: '请输入地址' }],
  areas: [{ required: true, message: '请选择区' }],
})
const cityData = computed(() => {
  return cities.filter(x => x.provinceCode === formState.value.province)
})
const areasData = computed(() => {
  return areas.filter(
    x =>
      x.cityCode === formState.value.citys &&
      x.provinceCode === formState.value.province
  )
})
const streetsData = computed(() => {
  return streets.filter(
    x =>
      x.areaCode === formState.value.areas &&
      x.cityCode === formState.value.citys &&
      x.provinceCode === formState.value.province
  )
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
  visible.value = false
  console.log('Success:', values, formState)
}
</script>
