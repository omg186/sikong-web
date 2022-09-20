<template>
  <div class="p-30px" s:border="1px solid #8b8b8b rounded-8px">
    <Form layout="vertical">
      <Row :gutter="[20, 10]">
        <Col :span="12">
          <!-- 记录内容 -->
          <FormItem
            label="项目名称"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '请输入项目名称' }]"
          >
            <Input type="text" placeholder="请输入项目名称" />
          </FormItem>
        </Col>
        <!-- 昵称 -->
        <Col :span="12">
          <FormItem
            label="项目ID"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '请输入项目ID' }]"
          >
            <Input type="text" placeholder="请输入项目ID" />
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            label="原始测量单位"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '请输入原始测量单位' }]"
          >
            <Input type="text" placeholder="请输入原始测量单位" />
          </FormItem>
        </Col>
        <Col :span="12">
          <div class="grid grid-cols-[auto,auto,20px,auto,auto] gap-x-10px">
            <FormItem
              label="适用年龄"
              class="flex-reverse-end"
              :rules="[{ required: true, message: '请输入年龄' }]"
            >
              <Input type="text" placeholder="请输入年龄" />
            </FormItem>
            <FormItem label=" ">
              <Input type="text" placeholder="请输入月" />
            </FormItem>
            <span class="self-center text-center">至</span>
            <FormItem label=" ">
              <Input type="text" placeholder="请输入年龄" />
            </FormItem>

            <FormItem label=" ">
              <Input type="text" placeholder="请输入月" />
            </FormItem>
          </div>
        </Col>
        <Col :span="12">
          <FormItem
            label="测试类型"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试类型' }]"
          >
            <RadioGroup>
              <Radio value="1">测结果</Radio>
              <Radio value="2">测过程</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            label="支持的输入方式"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '支持的输入方式' }]"
          >
            <CheckboxGroup>
              <Checkbox value="1">司空云平台</Checkbox>
              <Checkbox value="3">白河狸AI陪练</Checkbox>
              <Checkbox value="4">智能硬件写入</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem
            label="过程得分项数量"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '过程得分项数量' }]"
          >
            <Input type="text" placeholder="过程得分项数量" />
          </FormItem>
        </Col>
        <Col :span="24">
          <p s:text="14px" class="pb-10px">
            得分项说明
            <span
              class="text-[#ff4d4f]"
              style="font-family: SimSun, sans-serif"
            >
              *
            </span>
          </p>

          <Row :gutter="[20, 10]">
            <Col :span="12">
              <FormItem class="flex-reverse-end" :no-style="true">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 1 </template>
                </Input>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label=" " :no-style="true" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 2 </template>
                </Input>
              </FormItem>
            </Col>

            <Col :span="12">
              <FormItem label="" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 3 </template>
                </Input>
              </FormItem>
            </Col>

            <Col :span="12">
              <FormItem label="" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 4 </template>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
        <Col :span="24">
          <FormItem
            label="项目描述"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '项目描述' }]"
          >
            <Input
              type="text"
              placeholder="反映人体关节灵活性和肌肉、韧带的延展性，是综合评价身体柔韧性发展水平的常用指标"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem
            label="测试场地需求"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试场地需求' }]"
          >
            <Input
              type="text"
              placeholder="坐位体前屈测试简单易行，空旷，干净场地即可"
            />
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem
            label="测试仪器需求"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试场地需求' }]"
          >
            <div class="flex gap-x-10px">
              <div
                class="min-w-110px min-h-36px bg-[#F4F4F4] flex justify-center items-center px-20px py-10px rounded-8px"
                s:text="12px [#2D3A2F]"
                s:font="400"
              >
                瑜伽垫
              </div>
              <div
                class="min-w-110px min-h-36px bg-[#F4F4F4] flex justify-center items-center px-20px py-10px rounded-8px"
                s:text="12px [#2D3A2F]"
                s:font="400"
              >
                坐位体前屈仪
              </div>
            </div>
          </FormItem>
        </Col>
        <Col :span="24">
          <FormItem
            label="测试要求"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试标准' }]"
          >
            <Textarea
              type="text"
              placeholder="测试者双腿伸直，双脚平踩测试纵板。保持双腿和双脚姿势不变，上半身逐渐前倾，双臂和双手伸直并平行于地面向前移动， 用双手中指将游标逐渐推向前方最远处，此时游标所在的刻度记为坐位体前屈测试成绩。坐位体前屈成绩通常精确到0.1厘米 。注意：双腿、双臂和双手必须保持伸直，且不可猛然向前推游标。"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Row,
  Col,
  RadioGroup,
  Radio,
  DatePicker,
  Select,
  SelectOption,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Button,
  Modal,
} from 'ant-design-vue'
import { toArray } from 'lodash-es'
import SelectProject from '@/components/SelectModal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'
import Tag from '@/components/Tag.vue'
import { getCompanyProjectList } from '@/api/company'
import { useRequest } from 'vue-request'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
const contact = ref([1])
const formData = ref({
  projectSelect: [],
  exerciseSelect: [{ id: 1 }, { id: 4 }],
  exerciseSelectName: '',
  projectSelectName: '',
  traitSelect: [],
  traitSelectName: '',
})
const isSelect = ref(false)
const isTrait = ref(false)
const { data: projectData, loading } = useRequest(
  () => {
    return getCompanyProjectList()
  },
  { manual: false }
)
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
// 添加联系人 按钮
const onAddContact = () => {
  contact.value.push(2)
}

function onSelectProject(selected: Map<number, any>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  console.log('arr', arr)
  //   formData.projectId = toArray(selected.keys())
  formData.value.projectSelect = arr.map(p => p)
  formData.value.projectSelectName = arr.map(p => p.name).join(',')
  isSelect.value = false
}
function onSelectTrait(selected: Map<number, any>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  console.log('arr', arr)
  //   formData.projectId = toArray(selected.keys())
  formData.value.traitSelect = arr.map(p => p)
  formData.value.traitSelectName = arr.map(p => p.name).join(',')
  isTrait.value = false
}
</script>
