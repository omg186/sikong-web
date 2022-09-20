<template>
  <div class="run-evaluation p-30px" s:border="1px solid #8b8b8b rounded-8px">
    <p class="text-[#1F311F] font-bold pb-15px">粗大动作发展测试-TGMD</p>
    <Form layout="vertical">
      <Row :gutter="[20, 10]">
        <Col :span="12">
          <!-- 记录内容 -->
          <FormItem
            label="测试次数"
            class="flex-reverse-end"
            :rules="[{ required: true, message: '测试次数' }]"
          >
            <Input type="text" placeholder="测试次数" />
          </FormItem>
        </Col>
        <Col :span="24">
          <p class="text-[#1F311F] text-14px font-bold">
            过程得分项分数<span class="text-[#ff4d4f]">*</span>
          </p>
        </Col>
        <Col>
          <p class="text-[#F3AB51] text-xs">
            一次动作测评，动作标准达到得分项说明中的要求，测评记录单记为"通过"，得1分；记为“未通过”，得0分
          </p>
        </Col>

        <Col :span="24">
          <Row :gutter="[20, 10]">
            <Col :span="12">
              <FormItem class="flex-reverse-end" :no-style="true">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 1 </template>
                  <template #addonAfter>
                    <span class="text-[#8B8B8B]">1分 </span>
                  </template>
                </Input>
              </FormItem>
            </Col>
            <Col :span="12">
              <FormItem label=" " :no-style="true" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 2 </template>
                  <template #addonAfter>
                    <span class="text-[#8B8B8B]">2分 </span>
                  </template>
                </Input>
              </FormItem>
            </Col>

            <Col :span="12">
              <FormItem label="" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 3 </template>
                  <template #addonAfter>
                    <span class="text-[#8B8B8B]">3分 </span>
                  </template>
                </Input>
              </FormItem>
            </Col>

            <Col :span="12">
              <FormItem label="" class="flex-reverse-end">
                <Input type="text" placeholder="跳跃时手臂弯曲至与腰部水平">
                  <template #addonBefore> 4 </template>
                  <template #addonAfter>
                    <span class="text-[#8B8B8B]">4分 </span>
                  </template>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>

      <p class="text-[#1F311F] font-bold pb-10px">测评记录单的展现样式</p>
      <p class="text-[#F3AB51] text-xs pb-10px">
        过程得分项测试两次均为通过，代表该得分项已“掌握”，记2分，否则为“未掌握”；全部得分项都掌握，该动作为“掌握”，
        否则为“未掌握”
      </p>
      <div s:border="1px solid #8b8b8b rounded-8px" class="mt-20px">
        <Table
          class="sikong-table-2"
          :bordered="false"
          :columns="columns1"
          :pagination="false"
          :data-source="tableList1"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'name'">
              <div>
                <span class="font-bold text-xs" v-if="index === 0">
                  {{ record.name }}
                </span>
                <span class="text-xs text-[#A9ACA4]" v-else>
                  {{ record.name }}
                </span>
              </div>
            </template>
            <template v-if="column.key === 'name1'">
              <div>
                <CheckboxGroup>
                  <Checkbox value="1">通过</Checkbox>
                  <Checkbox value="0">未通过</Checkbox>
                </CheckboxGroup>
              </div>
            </template>

            <template v-if="column.key === 'name2'">
              <div>
                <CheckboxGroup>
                  <Checkbox value="1">掌握</Checkbox>
                </CheckboxGroup>
              </div>
            </template>
            <template v-if="column.key === 'name3'">
              <div>
                <span class="gray-input flex">
                  <input type="text" class="flex-1" />
                  <span>分</span>
                </span>
              </div>
            </template>
          </template>
        </Table>
      </div>
      <p class="text-[#1F311F] font-bold pb-10px pt-20px">
        各年龄组技术动作掌握分布表
      </p>
      <p class="text-[#F3AB51] text-xs pb-10px">
        TGMD测评是针对3岁到10岁儿童的粗大动作发展测评，按照年龄分为7个组，下表为各个年龄组在跑步动作和4个得分项上的掌
        握情况的分布数据
      </p>
      <div s:border="1px solid #8b8b8b rounded-8px" class="mt-20px">
        <Table
          class="sikong-table-2"
          :bordered="false"
          :columns="columns2"
          :pagination="false"
          :data-source="tableList2"
        >
        </Table>
      </div>
      <p class="text-[#F3AB51] text-xs pb-10px pt-15px">
        以上数据源自《TGMD测试者指导手册》
      </p>
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
  Table,
  TableColumnsType,
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
const tableList1 = [
  {
    name: '跑步测评项目的整体情况',
    name1: '15.9',
  },
  {
    name: '跳跃时手臂弯曲至与腰部水平',
    name1: '15.9',
  },
  {
    name: '前脚先向前迈一步，后脚再向 前迈一步，到达与前脚相邻或 稍后的位置',
    name1: '15.9',
  },
  {
    name: '有一个短暂的时间，双脚同时 离开地面',
    name1: '15.9',
  },
  {
    name: '保持连续四次马步跳在同一节 奏上',
    name1: '15.9',
  },
]
const tableList2 = [
  {
    name: '跑步',
    name1: '通过',
    name2: '8',
    name3: '60%',
  },
  {
    name: '得分项一',
    name1: '通过',
    name2: '2',
    name3: '60%',
  },
  {
    name: '得分项二',
    name1: '通过',
    name2: '2',
    name3: '60%',
  },
  {
    name: '得分项三',
    name1: '通过',
    name2: '2',
    name3: '60%',
  },
  {
    name: '得分项四',
    name1: '通过',
    name2: '2',
    name3: '60%',
  },
]
const columns1 = ref<TableColumnsType>([
  {
    title: '',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
    width: 200,
    customCell: (data, index, column) => {
      return {
        colSpan: index === 0 ? 3 : 1,
        rowSpan: 1,
      }
    },
  },
  {
    title: '测试1数据',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
    customCell: (data, index, column) => {
      return {
        colSpan: index === 0 ? 0 : 1,
        rowSpan: 1,
      }
    },
  },
  {
    title: '测试2数据',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
    customCell: (data, index, column) => {
      return {
        colSpan: index === 0 ? 0 : 1,
        rowSpan: 1,
      }
    },
  },
  {
    title: '是否掌握',
    dataIndex: 'name2',
    key: 'name2',
    align: 'center',
  },
  {
    title: '原始得分',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
])
const columns2 = ref<TableColumnsType>([
  {
    title: '得分',
    dataIndex: 'name',
    align: 'center',
    key: 'name',
  },
  {
    title: '等级',
    dataIndex: 'name1',
    key: 'name1',
    align: 'center',
  },
  {
    title: '分数',
    dataIndex: 'name2',
    key: 'name2',
    align: 'center',
  },
  {
    title: '3岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
  {
    title: '4岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
  {
    title: '5岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },

  {
    title: '6岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
  {
    title: '7岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },

  {
    title: '8岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },

  {
    title: '9岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },

  {
    title: '10岁组',
    dataIndex: 'name3',
    key: 'name3',
    align: 'center',
  },
])
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
<style lang="scss">
.run-evaluation {
  .ant-checkbox-wrapper {
    @apply text-[#6C766E];
  }
}
</style>
