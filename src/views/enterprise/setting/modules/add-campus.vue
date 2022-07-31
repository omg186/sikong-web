<template>
  <Form class="w-full h-full add-campus-view" layout="vertical">
    <Row :gutter="[20, 0]">
      <Col :span="24">
        <FormItem label="校区照片" :colon="false">
          <div class="flex flex-col">
            <Upload
              v-model:file-list="formData.fileList"
              name="avatar"
              list-type="picture"
              class="avatar-uploader"
              :show-upload-list="true"
              :before-upload="beforeUpload"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <div class="ant-upload ant-upload-select file-inline w-[172px]">
                <span tabindex="0" class="ant-upload" role="button"
                  ><input type="file" style="display: none" />
                  <div class="">
                    <loading-outlined
                      v-if="loadingFile"
                      style="font-size: 32px"
                    ></loading-outlined>
                    <plus-outlined
                      v-else
                      style="color: #d8d8d8; font-size: 32px"
                    ></plus-outlined></div
                ></span>
              </div>
              <template #itemRender="{ file, actions }">
                <div class="avatar relative w-[80px] h-[46px]">
                  <img
                    class="avatar-edit absolute top-[-1px] right-[-1px] cursor-pointer"
                    src="@/assets/images/avatar-edit.png"
                    @click="actions.remove"
                  />
                  <div
                    class="flex w-full h-full justify-center items-center w-[80px] h-[46px]"
                  >
                    <img
                      :src="file.thumbUrl"
                      alt="avatar"
                      class="w-[80px] h-[46px] border-1 border-[#DBDFDD] border-dashed rounded-8px"
                    />
                  </div>
                </div>
              </template>
            </Upload>
            <span class="text-xs text-[#F3AB51] font-400 pt-17px"
              >推荐尺寸800*800px，大小不超过5M，jpg、jpeg、png格式均可</span
            >
          </div>
        </FormItem>
      </Col>
      <Col :span="24">
        <FormItem
          :colon="false"
          v-bind="validateInfos.campusName"
          label="校区名称"
          class="flex-reverse-end"
        >
          <Input
            name="campusName"
            placeholder="请输入场地名称"
            v-model:value="formData.campusName"
            class="rounded-8px"
          ></Input>
        </FormItem>
      </Col>
      <!-- 所属校区 -->

      <Col :span="24">
        <FormItem
          v-bind="validateInfos.dept"
          label="校区所属部门"
          class="flex-reverse-end"
        >
          <Select
            v-model:value="formData.dept"
            placeholder="请选择所属部门"
            name="dept"
            class="select-icon"
            showSearch
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
            <SelectOption v-for="item in deptList" :value="item.id">
              {{ item.name }}
            </SelectOption>
          </Select>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="[20, 0]">
      <Col :span="8">
        <FormItem
          label="校区详细地址"
          class="flex-reverse-end"
          v-bind="validateInfos.province"
        >
          <Select
            name="province"
            v-model:value="formData.province"
            :options="
              provinceData.map(pro => ({ value: pro.code, label: pro.name }))
            "
            class="select-icon check-style"
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
        <FormItem label="" v-bind="validateInfos.citys">
          <Select
            v-model:value="formData.citys"
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
        <FormItem name="areas" v-bind="validateInfos.areas">
          <Select
            v-model:value="formData.areas"
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
        <FormItem label="" name="street" v-bind="validateInfos.street">
          <Select
            v-model:value="formData.street"
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
        <FormItem name="address" v-bind="validateInfos.address">
          <Input
            v-model:value="formData.address"
            placeholder="请输入详细地址，门牌号"
            style="width: 387px"
          ></Input>
        </FormItem>
      </Col>
    </Row>
    <Col> 设置校区经营日历 </Col>
    <Col> 日历描述 </Col>
    <div
      class="border-1 border-[#C3CAC6] border-opacity-20 h-[369px] rounded-20px px-30px pt-26px"
    >
      <Row :gutter="20">
        <Col :span="12">
          <FormItem
            class="flex-reverse-end"
            label="校区日历有效期"
            v-bind="validateInfos.startTime"
          >
            <DatePicker
              show-time
              v-model:value="formData.startTime"
              placeholder="日历开始时间"
              class="w-full"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            class="flex-reverse-end"
            label=""
            v-bind="validateInfos.endTime"
          >
            <DatePicker
              class="mt-[30px] w-full"
              show-time
              v-model:value="formData.endTime"
              placeholder="日历结束时间"
            ></DatePicker> </FormItem
        ></Col>
        <Col :span="24">
          <FormItem
            class="flex-reverse-end"
            label="校区日历名称"
            v-bind="validateInfos.calendarName"
          >
            <Input
              v-model:value="formData.calendarName"
              placeholder="请输入校区日历名称"
            ></Input>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem
            class="flex-reverse-end"
            label="校区日历模板"
            v-bind="validateInfos.calendarTemplate"
          >
            <Select
              v-model:value="formData.calendarTemplate"
              :options="[
                { value: '校区日历模板1' },
                { value: '校区日历模板2' },
              ]"
              class="select-icon"
              placeholder="请选择校区日历模板"
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
    </div>
    <div class="flex gap-10px pt-30px">
      <Button class="btn cancel h-40px w-90px" @click="onCancel"> 取消 </Button>

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
  RadioGroup,
  Textarea,
  Button,
  Upload,
  UploadProps,
  message,
  UploadChangeParam,
  Row,
  Col,
  DatePicker,
} from 'ant-design-vue'

import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { computed, ref, watchEffect } from 'vue'
import { campusDto } from './interface'
import { useRequest } from 'vue-request'
import { getOptionsListApi } from '@/api/select'
import provinceData from 'china-division/dist/provinces.json'
import cities from 'china-division/dist/cities.json'
import areas from 'china-division/dist/areas.json'
import streets from 'china-division/dist/streets.json'
const cityData = computed(() => {
  return cities.filter(x => x.provinceCode === formData.value.province)
})
const areasData = computed(() => {
  return areas.filter(
    x =>
      x.cityCode === formData.value.citys &&
      x.provinceCode === formData.value.province
  )
})
const streetsData = computed(() => {
  return streets.filter(
    x =>
      x.areaCode === formData.value.areas &&
      x.cityCode === formData.value.citys &&
      x.provinceCode === formData.value.province
  )
})
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (event: 'onCancel'): void
  (event: 'onOk', value: campusDto, isContinue: boolean): void
}>()
const formData = ref<campusDto>({
  campusName: '',
  dept: undefined,
  province: undefined,
  calendarName: '',
  endTime: '',
  startTime: '',
  calendarTemplate: undefined,
  citys: null,
  areas: null,
  address: '',
  street: null,
})
const loadingFile = ref<boolean>(false)
const imageUrl = ref('')
const rules = ref({
  campusName: [{ required: true, message: '请输入教室/场地名称' }],
  dept: [{ required: true, message: '请选择所属校区' }],
  province: [{ required: true, message: '请选择省' }],
  street: [{ required: true, message: '请选择街道' }],
  citys: [{ required: true, message: '请选择市' }],
  address: [{ required: true, message: '请输入地址' }],
  areas: [{ required: true, message: '请选择区' }],
  startTime: [{ required: true, message: '请选择开始时间' }],
  endTime: [{ required: true, message: '请选择结束时间' }],
  calendarTemplate: [{ required: true, message: '请选择校区日历模板' }],
  calendarName: [{ required: true, message: '请输入校区日历名称' }],
})
const { data: deptList } = useRequest(
  () => {
    return getOptionsListApi({
      keyword: '部门',
    })
  },
  { manual: false }
)
const { data: pillarList } = useRequest(
  () => {
    return getOptionsListApi({
      keyword: '立柱',
    })
  },
  { manual: false }
)
const { resetFields, validate, validateInfos } = Form.useForm(formData, rules)
watchEffect(() => {
  if (props.isEdit) {
    formData.value = {
      campusName: '教师',
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
  console.log('onSubmit')
  validate()
    .then(() => {
      console.log('formData.value', formData.value)
      // onOk(isContinue)
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
      // console.log(formData.fileList.url)
    })
  }
  if (info.file.status === 'error') {
    loadingFile.value = false
    message.error('upload error')
  }
}
</script>

<style lang="less">
.add-campus-view {
  .avatar-uploader {
    .ant-upload-list-picture {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      column-gap: 10px;
    }
    .ant-upload-list::after {
      display: none;
    }
    .ant-upload-list::before {
      display: none;
    }
    @apply flex;
    .file-inline {
      height: 104px;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      vertical-align: top;
      background-color: #fafafa;
      border: 1px dashed #dbdfdd;
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.3s;
      width: 172px;
      > .ant-upload {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        text-align: center;
      }
    }
    .ant-upload-list-item {
      float: left;
      width: 200px;
      margin-right: 8px;
    }
  }
  .avatar-uploader [class*='-upload-list-rtl'] :deep(.ant-upload-list-item) {
    float: right;
  }
}
</style>
