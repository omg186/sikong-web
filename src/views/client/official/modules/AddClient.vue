<template>
  <div>
    <Form layout="vertical">
      <p class="text-sm font-bold">1.学员基本信息</p>
      <Row :gutter="[20, 10]">
        <Col :span="12">
          <!-- 记录内容 -->
          <FormItem label="姓名">
            <Input type="text" placeholder="请输入姓名" />
          </FormItem>
        </Col>
        <!-- 昵称 -->
        <Col :span="12">
          <FormItem label="昵称">
            <Input type="text" placeholder="请输入昵称" />
          </FormItem>
        </Col>
        <!-- 生日 -->
        <Col :span="12">
          <FormItem label="生日">
            <DatePicker class="w-full" placeholder="请选择生日" />
          </FormItem>
        </Col>
        <!-- 性别 -->
        <Col :span="12">
          <FormItem label="性别">
            <Select placeholder="请选择性别" class="select-icon min-w-118px">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
              <SelectOption value="1">男</SelectOption>
              <SelectOption value="2">女</SelectOption>
            </Select>
          </FormItem>
        </Col>
        <!-- 教育阶段 -->
        <Col :span="24">
          <Row :gutter="[10, 10]">
            <Col :span="8">
              <FormItem label="教育阶段">
                <Input type="text" placeholder="请选择教育阶段" />
              </FormItem>
            </Col>
            <!-- 请选择班级 -->
            <Col :span="8">
              <FormItem label=" ">
                <Select placeholder="请选择班级" class="select-icon">
                  <template #suffixIcon>
                    <SvgIcon
                      name="down"
                      class="w-full h-full fill-[#A5A8B4]"
                    ></SvgIcon>
                  </template>
                </Select>
              </FormItem>
            </Col>
            <!-- 请选择教育阶段、年级 -->
            <Col :span="8">
              <FormItem label=" ">
                <Select placeholder="请选择教育阶段、年级" class="select-icon">
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
        </Col>
        <Col :span="24">
          <Row :gutter="[10, 10]">
            <Col :span="8">
              <FormItem label="家庭住址">
                <Select>
                  <SelectOption value="1">北京</SelectOption>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label=" ">
                <Select>
                  <SelectOption value="1">北京</SelectOption>
                </Select>
              </FormItem>
            </Col>
            <Col :span="8">
              <FormItem label=" ">
                <Select>
                  <SelectOption value="1">朝阳区</SelectOption>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="[10, 10]">
            <Col :span="8">
              <FormItem label=" ">
                <Select>
                  <SelectOption value="1">安贞街道</SelectOption>
                </Select>
              </FormItem>
            </Col>
            <Col :span="16">
              <FormItem label=" ">
                <Input type="text" placeholder="请输入详细地址" />
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <div class="flex justify-between">
        <p class="text-sm font-bold">2.联系人基本信息</p>
        <p
          class="flex items-center gap-10px cursor-pointer"
          @click="onAddContact"
        >
          <SvgIcon
            name="add"
            class="w-18px h-18px fill-gray-300 stroke-gray-300"
          ></SvgIcon>
          <span>添加其他联系人</span>
        </p>
      </div>
      <div v-for="(c, index) in contact" :key="index">
        <Row :gutter="[10, 10]">
          <Col :span="8">
            <FormItem label="称呼">
              <Input type="text" placeholder="请输入家长姓名" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="与学员关系">
              <Input type="text" placeholder="请输入家长与学员关系" />
            </FormItem>
          </Col>

          <Col :span="8">
            <FormItem label="手机">
              <Input type="text" placeholder="请输入手机号" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="[20, 10]">
          <Col :span="12">
            <FormItem label="固话">
              <Input type="text" placeholder="请输入座机号码" />
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="微信">
              <Input type="text" placeholder="请输入微信号码" />
            </FormItem>
          </Col>
        </Row>
      </div>

      <p class="text-sm font-bold">3.市场和运营信息</p>
      <Row :gutter="[20, 10]">
        <Col :span="12">
          <!-- 客户来源 -->
          <FormItem label="客户来源">
            <Select placeholder="请选择渠道" class="select-icon">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>
        <Col :span="12">
          <!-- 请选择上门时间 -->
          <FormItem label=" ">
            <DatePicker placeholder="请选择上门时间" class="w-full">
            </DatePicker>
          </FormItem>
        </Col>

        <Col :span="12">
          <!-- 客户来源 -->
          <FormItem label="专属顾问">
            <Select placeholder="请选择专属顾问" class="select-icon">
              <template #suffixIcon>
                <SvgIcon
                  name="down"
                  class="w-full h-full fill-[#A5A8B4]"
                ></SvgIcon>
              </template>
            </Select>
          </FormItem>
        </Col>

        <Col :span="12">
          <!-- 客户来源 -->
          <FormItem label="客户状态">
            <Select placeholder="请选择客户状态" class="select-icon">
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

      <p class="text-sm font-bold">4.运动发展的相关信息</p>
      <FormItem label="锻炼的目标">
        <Input
          placeholder="请选择锻炼目标"
          readonly
          name="exerciseSelectName"
          @click="visibleExercise = true"
          v-model:value="formData.exerciseSelectName"
        >
        </Input>
      </FormItem>

      <FormItem label="性格特征">
        <Input
          placeholder="请选择性格特征"
          readonly
          name="traitSelectName"
          @click="isTrait = true"
          v-model:value="formData.traitSelectName"
        >
        </Input>
      </FormItem>

      <p class="text-sm">当前的运动强度</p>
      <div class="grid grid-cols-3 gap-32px mb-20px">
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#2EE094] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(46, 224, 148, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">低等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色基本没变化;没汗或微出汗;能说完整句子
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>同家人散步; 收拾玩具; 遛狗; 给宠物洗澡; 户外玩耍</p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <FormItem>
              <Select placeholder="请选择运动频度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
            <FormItem>
              <Select placeholder="请选择时间长度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
          </div>
        </div>
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#F3AB51] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(243, 171, 81, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">中等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色微红;满头汗;能说出简短的句子
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>
                骑车\跑步等有氧运动; 力量练习; 拉伸练习; 跳绳; 徒步;
                登山等休闲体育运动
              </p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <FormItem>
              <Select placeholder="请选择运动频度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
            <FormItem>
              <Select placeholder="请选择时间长度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
          </div>
        </div>
        <div
          class="rounded-sm overflow-hidden"
          style="box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.05)"
        >
          <div
            class="min-h-180px bg-[#FF7C7C] px-15px text-white"
            style="box-shadow: 0px 6px 12px 0px rgba(255, 124, 124, 0.5)"
          >
            <div class="pt-16px">
              <p class="text-center text-sm font-bold mb-0">高等强度运动</p>
            </div>
            <div class="pt-10px font-bold text-xs">
              面色红,甚至发紫;满头汗;只能说简单的词语
            </div>
            <div class="pt-10px font-bold text-xs">
              <p class="mb-0">例如：</p>
              <p>篮球\足球等比较激烈的运动和游戏; 和正式的训练</p>
            </div>
          </div>
          <div class="min-h-70px p-15px bg-white">
            <FormItem>
              <Select placeholder="请选择运动频度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
            <FormItem>
              <Select placeholder="请选择时间长度" class="select-icon">
                <template #suffixIcon>
                  <SvgIcon
                    name="down"
                    class="w-full h-full fill-[#A5A8B4]"
                  ></SvgIcon>
                </template>
              </Select>
            </FormItem>
          </div>
        </div>
      </div>
      <FormItem label="有无喜欢的运动项目">
        <RadioGroup>
          <Radio value="1">有</Radio>
          <Radio value="1">无</Radio>
        </RadioGroup>
        <div class="flex gap-20px mt-20px">
          <Tag contents="网球"></Tag>
          <Tag contents="游泳"></Tag>
          <Tag contents="徒步"></Tag>
          <span
            class="w-36px h-36px bg-white rounded-sm"
            s:border="1px solid #DBDFDD"
            @click="isSelect = true"
          ></span>
        </div>
      </FormItem>

      <FormItem label="父母运动习惯">
        <RadioGroup>
          <Radio value="1">有</Radio>
          <Radio value="1">无</Radio>
        </RadioGroup>
        <div class="flex gap-20px mt-20px">
          <Tag contents="网球"></Tag>
          <Tag contents="游泳"></Tag>
          <Tag contents="徒步"></Tag>
          <span
            class="w-36px h-36px bg-white rounded-sm"
            s:border="1px solid #DBDFDD"
            @click="isSelect = true"
          ></span>
        </div>
      </FormItem>
      <FormItem label="有无先天或遗传病史？">
        <RadioGroup>
          <Radio value="1">有</Radio>
          <Radio value="1">无</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Input placeholder="填写备注"></Input>
      </FormItem>
      <FormItem label="有无运动损伤或手术？">
        <RadioGroup>
          <Radio value="1">有</Radio>
          <Radio value="1">无</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Input placeholder="填写备注"></Input>
      </FormItem>
      <FormItem label="运动中惯用手">
        <RadioGroup>
          <Radio value="1">右手</Radio>
          <Radio value="1">左手</Radio>
          <Radio value="2">尚未建立</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="运动中惯用脚">
        <RadioGroup>
          <Radio value="1">右脚</Radio>
          <Radio value="1">左脚</Radio>
          <Radio value="2">尚未建立</Radio>
        </RadioGroup>
      </FormItem>
      <!-- 按钮 -->
      <div class="flex gap-15px">
        <Button class="btn cancel h-40px w-90px" @click="onCancel">
          取消
        </Button>

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
    <SelectProject
      v-if="isSelect"
      title="喜欢的项目"
      :data="projectData"
      @onOk="onSelectProject"
      :selected="formData.projectSelect"
      v-model:visible="isSelect"
    />
    <SelectProject
      v-if="isTrait"
      title="性格特征"
      :data="projectData"
      @onOk="onSelectTrait"
      :selected="formData.traitSelect"
      v-model:visible="isTrait"
    >
      <p>根据家长的同事的反馈，以及对孩子现场的观察，确定其性格特征</p>
    </SelectProject>
    <Modal
      v-model:visible="visibleExercise"
      width="660px"
      :footer="null"
      title="锻炼的目标"
    >
      <Exercise
        v-if="visibleExercise"
        :selected="formData.exerciseSelect"
        @on-cancel="visibleExercise = false"
        @on-submit="onSubmitExercise"
      ></Exercise>
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
    </Modal>
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
import Exercise from './Exercise.vue'
const contact = ref([1])
const visibleExercise = ref(false)
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
function onSubmitExercise(selected: Map<number, any>) {
  // console.log(selected, toArray(selected.values()), toArray(selected.keys()))
  const arr = toArray(selected.values())
  console.log('arr', arr)
  //   formData.projectId = toArray(selected.keys())
  formData.value.exerciseSelect = arr.map(p => p)
  formData.value.exerciseSelectName = arr.map(p => p.name).join(',')
  visibleExercise.value = false
}
</script>
