<template>
  <Form
    class="pt-[35px] ml-[40px] w-full h-full"
    layout="vertical"
    ref="formRef"
    :model="formState"
    :rules="validateRules"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <!-- <Upload
        v-model:file-list="formState.fileList"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        list-type="picture-card"
        @preview="handlePreview"
        class="relative"
      >
        <div v-if="formState.fileList.length < 1">
          <plus-outlined style="color: #dbdfdd" />
        </div>
        <template #removeIcon
          ><edit-outlined style="position: absolute; top: -45px; right: -20px"
        /></template>
      </Upload> -->
    <row>
      <Col :span="24">
        <FormItem label="企业LOGO">
          <div class="felx flex-col">
            <Upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
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
            <span class="text-xs text-[#F3AB51] font-400"
              >推荐尺寸800*800px，大小不超过5M，jpg、jpeg、png格式均可</span
            >
          </div>
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem
          label="企业主体全称"
          name="businessEntity"
          :wrapper-col="{ span: 12 }"
        >
          <Input
            v-model:value="formState.businessEntity"
            placeholder="请输入企业主体全称"
          />
        </FormItem>
      </Col>

      <Col :span="24">
        <FormItem label="企业账户全称">
          <span>{{ formState.account }}</span>
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem label="账户创建时间">
          <span>{{ formState.createTime }}</span>
        </FormItem>
      </Col>
    </row>
    <Col :span="24">
      <FormItem
        label="企业主体简称"
        name="business"
        :wrapper-col="{ span: 12 }"
      >
        <Input
          v-model:value="formState.business"
          placeholder="请输入企业主体简称"
        />
      </FormItem>
    </Col>
    <Col>
      <FormItem
        label="培训项目(可多选)"
        name="projectName"
        :wrapper-col="{ span: 12 }"
      >
        <Select
          v-model:value="formState.projectName"
          mode="multiple"
          :options="pxData.map(pro => ({ value: pro }))"
          class="select-icon w-[184px]"
          placeholder="请选择培训项目"
        >
          <template #suffixIcon>
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
          <!-- <template #suffixIcon
            ><smile-outlined class="ant-select-suffix"
          /></template> -->
        </Select>
        <!-- <Input
          v-model:value="formState.projectName"
          placeholder="请输入企业主体全称"
          readonly
          @click="data.isSelect = true"
        >
          <template #suffix>
            <div class="h-30px w-30px aspect-square">
              <img src="@/assets/images/down-icon.png" />
            </div> </template
        ></Input> -->
      </FormItem>
    </Col>
    <FormItem label="企业详细地址" name="province" :wrapper-col="{ span: 12 }">
      <Space :size="20">
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
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
        </Select>
        <Select
          v-model:value="formState.citys"
          style="width: 184px"
          :options="cityData.map(pro => ({ value: pro.code, label: pro.name }))"
          class="select-icon w-[184px]"
          placeholder="请选择市"
        >
          <template #suffixIcon>
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
        </Select>
        <Select
          v-model:value="formState.areas"
          style="width: 184px"
          :options="
            areasData.map(pro => ({ value: pro.code, label: pro.name }))
          "
          class="select-icon w-[184px]"
          placeholder="请选择区"
        >
          <template #suffixIcon>
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
        </Select>
      </Space>
    </FormItem>
    <FormItem label="" name="street" :wrapper-col="{ span: 12 }">
      <Space :size="20">
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
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
        </Select>
        <Input
          v-model:value="formState.address"
          placeholder="请输入详细地址，门牌号"
          style="width: 387px"
        ></Input>
      </Space>
    </FormItem>
    <FormItem label="企业电话" :wrapper-col="{ span: 12 }">
      <Input
        v-model:value="formState.cellPhone"
        placeholder="请输入企业服务热线"
      />
    </FormItem>
    <FormItem label="企业官网" :wrapper-col="{ span: 12 }">
      <Input
        v-model:value="formState.officialWebsite"
        placeholder="请输入企业官网"
      />
    </FormItem>
    <Row>
      <FormItem>
        <Space>
          <Button class="rounded-40 h-[40px] w-[90px]" type="primary" ghost
            >取消</Button
          >
          <Button
            html-type="submit"
            class="rounded-40 h-[40px] w-[140px]"
            type="primary"
            >下一步 组织架构</Button
          >
        </Space>
      </FormItem>
    </Row>
    <SelectProject
      v-if="data.isSelect"
      :data="projectData"
      @onOk="onSelectProject"
      :selected="formState.projectSelect"
      v-model:visible="data.isSelect"
    />
  </Form>
</template>
<script lang="ts" setup>
import { computed, reactive, ref, watchEffect, onMounted, watch } from 'vue'
import type { UnwrapRef } from 'vue'
import { toArray } from 'lodash-es'
import SelectProject from '../login/modules/select-project.vue'
import { SmileOutlined } from '@ant-design/icons-vue'
import {
  Form,
  FormItem,
  Button,
  Col,
  Row,
  Upload,
  message,
  UploadChangeParam,
  UploadProps,
  Space,
  Select,
  Input,
} from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { getCompanyProjectList } from '@/api/company'
import { useRequest } from 'vue-request'
import { SelectItem, useDownInterval } from '../login/useLogin'
import SvgIcon from '../../components/SvgIcon.vue'
import provinceData from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import streets from 'china-division/dist/streets.json'
const data = reactive({
  isSelect: false,
  isDisabled: false,
})
const imageUrl = ref<string>('')
const fileList = ref([])
// console.log(provinces)
// const infoForm = Form.useForm
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
  businessEntity: [{ required: true, message: '请输入企业主体全称' }],
  business: [{ required: true, message: '请输入企业主体简称' }],
  projectName: [{ required: true, message: '请选择培训项目' }],
  street: [{ required: true, message: '请选择地址' }],
  province: [{ required: true, message: '请选择地址' }],
})

const cityData = computed(() => {
  return cities.filter(x => x.provinceCode === formState.province)
})
const areasData = computed(() => {
  return areas.filter(
    x => x.cityCode === formState.citys && x.provinceCode === formState.province
  )
})
const streetsData = computed(() => {
  return streets.filter(
    x =>
      x.areaCode === formState.areas &&
      x.cityCode === formState.citys &&
      x.provinceCode === formState.province
  )
})
const pxData = ['培训1', '培训2']
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
const { data: projectData } = useRequest(
  () => {
    return getCompanyProjectList()
  },
  { manual: false }
)
watch([() => formState.province], ([v1], [oldName]) => {
  if (v1) {
    formState.citys = null
    formState.street = null
    formState.areas = null
  }
})
watch([() => formState.areas], ([v1], [oldName]) => {
  if (v1) {
    formState.street = null
  }
})
watchEffect(() => {
  if (formState.citys) {
    formState.areas = null
    formState.street = null
  }
})
function onSelectProject(selected: Map<number, SelectItem>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  formState.projectId = toArray(selected.keys())
  formState.projectSelect = arr.map(p => p)
  formState.projectName = arr.map(p => p.name).join(',')
  data.isSelect = false
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const onFinish = (values: any) => {
  console.log('Success:', values, formState)
}
</script>
<style lang="less" scoped>
.avatar:hover .avatar-edit {
  content: url('../../assets/images/avatar-edit-hover.png');
}
</style>
