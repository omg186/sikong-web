<template>
  <Form class="sikong-form2 add-room-view ant-row" layout="vertical">
    <Row :gutter="[20, 0]">
      <Col :span="24">
        <FormItem label="教室/场地照片" :colon="false">
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
              <!-- <div v-if="imageUrl" class="avatar relative w-full h-full">
                <img
                  class="avatar-edit absolute top-[-1px] right-[-1px]"
                  src="@/assets/images/avatar-edit.png"
                />
                <div class="flex h-full justify-center items-center">
                  <img :src="imageUrl" alt="avatar" />
                </div>
              </div> -->

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
              <!-- <div class="">
                <loading-outlined
                  v-if="loadingFile"
                  style="font-size: 32px"
                ></loading-outlined>
                <plus-outlined
                  v-else
                  style="color: #d8d8d8; font-size: 32px"
                ></plus-outlined>
              </div> -->
              <!-- <Button>
                <upload-outlined></upload-outlined>
                上传
              </Button> -->
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
            name="roomName"
            placeholder="请输入场地名称"
            v-model:value="formData.roomName"
            class="rounded-8px"
          ></Input>
        </FormItem>
      </Col>
      <!-- 所属校区 -->

      <Col :span="12">
        <FormItem
          v-bind="validateInfos.schoolId"
          label="所属校区"
          class="flex-reverse-end"
        >
          <Select
            v-model:value="formData.schoolId"
            placeholder="请选择所属校区"
            name="schoolId"
            showSearch
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
            <SelectOption v-for="item in schoolList" :value="item.id">
              {{ item.name }}
            </SelectOption>
          </Select>
        </FormItem>
      </Col>
      <!-- 室内外场地 -->
      <Col :span="12">
        <FormItem
          v-bind="validateInfos.roomType"
          label="室内外场地"
          class="flex-reverse-end"
        >
          <RadioGroup
            v-model:value="formData.roomType"
            placeholder="请选择室内外场地"
            name="roomType"
            :options="roomTypeOptions"
            class="check-style"
          >
          </RadioGroup>
        </FormItem>
      </Col>
      <!-- 场地面积 -->
      <Col :span="12">
        <FormItem
          v-bind="validateInfos.area"
          label="场地面积(㎡)"
          class="flex-reverse-end"
        >
          <Input
            name="area"
            placeholder="请输入场地面积(㎡)"
            v-model:value="formData.area"
            class="rounded-8px"
          ></Input>
        </FormItem>
      </Col>
      <!-- 有无立柱 -->
      <Col :span="12">
        <FormItem
          v-bind="validateInfos.isPillar"
          label="有无立柱"
          class="flex-reverse-end"
        >
          <Select
            v-model:value="formData.isPillar"
            placeholder="请选择有无立柱"
            name="isPillar"
            showSearch
          >
            <template #suffixIcon>
              <SvgIcon
                name="down"
                class="w-full h-full fill-[#A5A8B4]"
              ></SvgIcon>
            </template>
            <SelectOption v-for="item in pillarList" :value="item.id">
              {{ item.name }}
            </SelectOption>
          </Select>
        </FormItem>
      </Col>
      <!-- 场地层高 -->
      <Col :span="12">
        <FormItem
          v-bind="validateInfos.floorHeight"
          label="场地层高(m)"
          class="flex-reverse-end"
        >
          <Input
            name="floorHeight"
            placeholder="请输入场地层高(m)"
            v-model:value="formData.floorHeight"
            class="rounded-8px"
          ></Input>
        </FormItem>
      </Col>
      <!-- 场地备注 -->
      <Col :span="24">
        <FormItem
          v-bind="validateInfos.remark"
          label="场地备注"
          class="flex-reverse-end"
        >
          <Textarea
            name="remark"
            placeholder="请输入场地备注"
            v-model:value="formData.remark"
            class="rounded-8px"
          ></Textarea>
        </FormItem>
      </Col>
      <!-- 教师/场地经营日历 -->
      <Col :span="24">
        <FormItem
          v-bind="validateInfos.isCalendar"
          label="教师/场地经营日历"
          class="flex-reverse-end"
        >
          <p class="text-[#F3AB51] pb-10px pt-10px">
            如果教室/场地经营时间与校区一致，请选择"使用校区经营日历",若教室/场地经营时间与校区不一致，
            请选择"设置独立经营日历"
          </p>
          <RadioGroup
            v-model:value="formData.isCalendar"
            placeholder="教室/场地经营日历"
            name="isCalendar"
            :options="calendarTypeOptions"
            class="check-style"
          >
          </RadioGroup>
        </FormItem>
      </Col>
    </Row>
    <div class="flex gap-10px pt-30px">
      <CancelButton @click="onCancel"> 取消 </CancelButton>

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
  RadioGroup,
  Textarea,
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
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const roomTypeOptions = [
  { label: '室内场地', value: 1 },
  { label: '室外场地', value: 2 },
]
const calendarTypeOptions = [
  { label: '使用校区经营日历', value: 1 },
  { label: '使用独立经营日历', value: 2 },
]
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits<{
  (event: 'onCancel'): void
  (event: 'onOk', value: RoomDto, isContinue: boolean): void
}>()
const formData = ref<RoomDto>({
  roomName: '',
  schoolId: undefined,
  roomType: undefined,
  area: undefined,
  isPillar: undefined,
  floorHeight: undefined,
  isCalendar: undefined,
})
const loadingFile = ref<boolean>(false)
const imageUrl = ref('')
const rules = ref({
  roomName: [{ required: true, message: '请输入教室/场地名称' }],
  schoolId: [{ required: true, message: '请选择所属校区' }],
  roomType: [{ required: true, message: '请选择室内外场地' }],
  // 场地面积
  area: [{ required: true, message: '请输入场地面积(㎡)' }],
  // 有无立柱
  isPillar: [{ required: true, message: '请选择有无立柱' }],
  // 场地层高
  floorHeight: [{ required: true, message: '请输入场地层高(m)' }],
  // 教师/场地经营日历
  isCalendar: [{ required: true, message: '请选择教师/场地经营日历' }],
})
const { data: schoolList } = useRequest(
  () => {
    return getOptionsListApi({
      keyword: '学校',
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
      roomName: '教师',
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
.add-room-view {
  // .ant-upload-list-picture-card-container {
  //   @apply w-172px h-98px;
  //   .ant-upload-list-item {
  //     @apply p-0;
  //   }
  // }
  // .avatar-uploader .ant-upload-list-item {
  //   .ant-upload-select-picture-card {
  //     @apply w-172px h-98px;
  //   }
  // }
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
