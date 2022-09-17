<template>
  <Modal
    v-model:visible="visible"
    :title="props.title"
    :footer="null"
    @cancel="updateVisible()"
  >
    <template #closeIcon>
      <ImgIcon src="close.png" hover-src="close.png"></ImgIcon>
    </template>
    <Form
      class="sikong-form2"
      :model="formData"
      :colon="false"
      layout="vertical"
    >
      <FormItem label="是否评估" class="font-bold">
        <Switch v-model:checked="formData.checked"></Switch>
      </FormItem>
      <FormItem label="评估项目和权重" class="font-bold">
        <Row
          class="w-full"
          :gutter="[20, 10]"
          v-for="(formItem, index) in formData.item"
          :key="index"
        >
          <Col :span="12">
            <FormItem>
              <Select
                v-model:value="formData.item[index].id"
                class="rounded-8px"
                placeholder="请选择"
              >
                <SelectOption v-for="item in props.SelectData" :value="item.id">
                  {{ item.name }}
                </SelectOption>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem>
              <Input v-model:value="formItem.value">
                <template #addonAfter> % </template>
              </Input>
            </FormItem>
          </Col>
          <Col :span="4">
            <SvgIcon
              name="del2"
              class="w-24px h-24px mt-5px fill-white cursor-pointer"
              @click="onDelItem(index)"
            ></SvgIcon>
          </Col>
        </Row>
        <FormItem>
          <div
            class="flex items-center gap-10px fill-[#C6C6C6] cursor-pointer text-[#83867E] text-xs"
            @click="onAddItem"
          >
            <SvgIcon name="add-project" class="w-24px h-24px"></SvgIcon>
            <span>添加自定义字段</span>
          </div>
        </FormItem>
      </FormItem>
      <div class="flex gap-10px pt-30px">
        <CancelButton @click="emits('update:visible', false)">
          取消
        </CancelButton>
        <OkButton @click="emits('update:visible', false)"> 确定 </OkButton>
      </div>
      <div s:text="[#F3AB51] xs" class="mt-25px">
        建议不要在测评使用过程中变更身体素质的测评项目和权重，这样会导致前
        后统计口径不一致的情况发生
      </div>
    </Form>
  </Modal>
</template>
<script lang="ts" setup>
import { DemoOptionsItem } from '@/api/model/optionsModel'
import {
  Form,
  FormItem,
  Modal,
  Switch,
  Select,
  Input,
  Row,
  Col,
  Button,
  SelectOption,
} from 'ant-design-vue'
import { PropType, ref, watch } from 'vue'
import SvgIcon from '../../../../components/SvgIcon.vue'
import { ItemDto } from '../interface'
import { cloneDeep } from 'lodash-es'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  SelectData: {
    type: Array as PropType<DemoOptionsItem[]>,
    default: () => [],
  },
  formData: {
    type: Object as () => {
      checked: boolean
      item: Array<ItemDto>
    },
    required: false,
    default: () => ({
      checked: false,
      item: [
        { id: '1', value: 1 },
        { id: '2', value: 1 },
      ],
    }),
  },
  visible: {
    type: Boolean,
    required: true,
  },
})
const visible = ref(props.visible)
const formData = ref(props.formData)
const emits = defineEmits(['update:visible'])
watch(
  () => props.visible,
  val => {
    visible.value = val
  }
)
watch(
  () => props.formData,
  val => {
    console.log('val', val)
    formData.value = val
  },
  {
    immediate: true,
  }
)
function updateVisible() {
  emits('update:visible', visible.value)
}
// 删除Item
function onDelItem(index: number) {
  const cloneFormData = cloneDeep(formData.value)
  cloneFormData.item.splice(index, 1)
  formData.value = cloneFormData
}
// 增加Item
function onAddItem() {
  const cloneFormData = cloneDeep(formData.value)
  cloneFormData.item.push({})
  formData.value = cloneFormData
}
</script>
