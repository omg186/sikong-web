<template>
  <div>
    <div class="flex gap-20px py-25px">
      <TextItem title="意向客户" contents="李睿曦" />
      <!-- 联系人：包女士 -->
      <TextItem title="当前状态" contents="意向客户" />
      <TextItem title="所属顾问" contents="张燕玲（猫猫）" />
    </div>
    <Form layout="vertical">
      <!-- 调整客户状态 -->
      <FormItem label="分配/调整顾问" prop="status">
        <Select placeholder="请分配/调整顾问" class="select-icon min-w-118px">
          <template #suffixIcon>
            <SvgIcon name="down" class="w-full h-full fill-[#A5A8B4]"></SvgIcon>
          </template>
          <SelectOption value="0">调整客户状态</SelectOption>
          <SelectOption value="1">意向</SelectOption>
          <SelectOption value="2">正式</SelectOption>
          <SelectOption value="3">流失</SelectOption>
        </Select>
      </FormItem>
    </Form>
    <p class="text-sm font-bold">当前顾问的客户分布</p>
    <Table
      class="sikong-table flex-1"
      size="small"
      :dataSource="listData"
      :columns="columns"
      :pagination="false"
      :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <div class="">
            <span class="font-bold text-black">{{ record.name }}</span>
          </div>
        </template>
      </template>
    </Table>
    <!-- 按钮 -->
    <div class="flex gap-15px mt-20px">
      <CancelButton @click="onCancel"> 取消 </CancelButton>

      <OkButton @click="onSubmit"> 保存 </OkButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDemoListApi } from '@/api/select'
import TextItem from '@/components/TextItem.vue'
import SvgIcon from '@/components/SvgIcon.vue'

import {
  Form,
  FormItem,
  Input,
  Textarea,
  Table,
  Select,
  SelectOption,
  Button,
  TableColumnsType,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { usePagination } from 'vue-request'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'

const {
  data: dataSource,
  run,
  loading,
  current,
  pageSize,
} = usePagination(
  params => {
    return getDemoListApi({ ...params })
  },
  {
    defaultParams: [
      {
        page: 1,
        pageSize: 5,
      },
    ],
    pagination: {
      currentKey: 'page',
      pageSizeKey: 'pageSize',
    },
    manual: false,
  }
)
const listData = computed(() => dataSource.value?.items || [])
const columns = ref<TableColumnsType>([
  {
    title: '顾问姓名',
    dataIndex: 'name',
    align: 'left',
    key: 'name',
  },
  {
    title: '客户总数',
    dataIndex: 'name1',
    key: 'job',
    align: 'center',
  },
  {
    title: '待开发',
    dataIndex: 'name1',
    key: 'dept',
    align: 'center',
  },
  {
    title: '有效新客户',
    dataIndex: 'name3',
    key: 'project',
    align: 'center',
  },
  {
    title: '意向客户',
    dataIndex: 'name4',
    key: 'account',
    align: 'center',
  },
  {
    title: '重点客户',
    dataIndex: 'name5',
    key: 'name5',
    align: 'center',
  },
  {
    title: '定金客户',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '正式会员',
    dataIndex: 'name5',
    key: 'status',
    align: 'center',
  },
  {
    title: '待续费会员',
    dataIndex: 'name5',
    key: 'status',
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
</script>
