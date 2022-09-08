<template>
  <div class="confirm-modules">
    <div class="flex justify-between items-center">
      <div class="flex gap-x-20px">
        <div
          v-for="(person, i) in personList"
          :key="i"
          class="grid grid-cols-1 gap-y-5px"
        >
          <div class="flex items-center gap-x-20px">
            <SvgIcon
              v-if="i !== 0"
              name="lizhi2"
              class="w-36px h-22px fill-[#A5A8B4]"
              :class="{ '!fill-primary': person.name === '执行人' }"
            ></SvgIcon>
            <img
              src="@/assets/images/avatar-boy.png"
              alt=""
              srcset=""
              class="w-40px h-40px rounded-full"
              :class="{
                'border-2px border-primary border-solid':
                  person.name === '执行人',
              }"
            />
          </div>
          <span
            s:text="[#6C766E] right"
            :class="{
              '!text-primary': person.name === '执行人',
            }"
            >{{ person.name }}</span
          >
        </div>
      </div>
      <div s:text="[#F3AB51]" s:font="bold">预约状态 - 取消预约中</div>
      <!-- <div s:text="primary" s:font="bold">预约状态 - 申请中</div> -->
    </div>
    <div class="grid grid-cols-[360px,auto] gap-x-20px my-28px">
      <div s:border="1px solid #F9F9F9 rounded-sm" class="p-20px bg-[#FDFDFD]">
        <TimeLineTitle contents="预约信息">
          <div class="flex flex-col gap-y-15px">
            <TextItem title="测评地点" contents="教室01"></TextItem>
            <TextItem
              title="测评地点"
              contents="2022年3月22日 星期三15:00-16:00"
            ></TextItem>
            <TextItem
              title="测评项目"
              contents="国家体质测评标准测评(幼儿版)"
            ></TextItem>
            <TextItem title="预约类型" contents="体验与摸底"></TextItem>
            <TextItem
              class-name="grid grid-cols-[60px,auto] text-xs pb-25px"
              title="申请说明"
              contents="孩子当天只有这个时间段有时间，推荐了已有安排，没办法调剂"
            ></TextItem>
          </div>
        </TimeLineTitle>
        <TimeLineItem>
          <template #line-icon>
            <ImgIcon src="time.png" width="14px" height="14px"></ImgIcon>
          </template>
          <template #title>
            <span s:font="400" s:text="xs [#6C766E]">2022-6-24 17:34</span>
          </template>
          <template #contents-icon><span class="pb-25px"></span></template>
        </TimeLineItem>
        <TimeLineTitle contents="审核信息">
          <div class="flex flex-col gap-y-15px">
            <TextItem title="审核人" contents="张玲燕(猫猫)"></TextItem>
            <TextItem title="预约类型" contents="体验与摸底"></TextItem>
            <TextItem
              class-name="grid grid-cols-[60px,auto] text-xs pb-20px"
              title="申请说明"
              contents="以满足客户需求为主，同意新开待办测评"
            ></TextItem>
          </div>
        </TimeLineTitle>
        <TimeLineItem :end="true">
          <template #line-icon>
            <ImgIcon src="time.png" width="14px" height="14px"></ImgIcon>
          </template>
          <template #title>
            <span s:font="400" s:text="xs [#6C766E]">2022-6-24 17:34</span>
          </template>
          <template #contents-icon><span class="pb-25px"></span></template>
        </TimeLineItem>
      </div>
      <div class="p-20px bg-[#FDFDFD]" s:border="1px solid #F9F9F9 rounded-sm">
        <p s:text="sm" s:font="bold">参与者信息</p>
        <div class="flex flex-col gap-y-22px">
          <div class="flex gap-x-10px items-center">
            <img
              src="@/assets/images/avatar-boy.png"
              alt=""
              srcset=""
              class="flex-shrink-0 w-30px h-30px"
              s:border="2px solid white rounded-full"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span s:text="sm [#6C766E]" s:font="400">李大海(大鱼)·申请人 </span>
          </div>
          <div class="flex gap-x-10px items-center">
            <img
              src="@/assets/images/avatar-boy.png"
              alt=""
              srcset=""
              class="flex-shrink-0 w-30px h-30px"
              s:border="2px solid white rounded-full"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span s:text="sm [#6C766E]" s:font="400">李总·主考官 </span>
          </div>
          <div class="flex gap-x-10px items-center">
            <img
              src="@/assets/images/avatar-boy.png"
              alt=""
              srcset=""
              class="flex-shrink-0 w-30px h-30px"
              s:border="2px solid white rounded-full"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span s:text="sm [#6C766E]" s:font="400">李睿曦·受试者 </span>
          </div>
          <div class="flex gap-x-10px items-center">
            <img
              src="@/assets/images/avatar-boy.png"
              alt=""
              srcset=""
              class="flex-shrink-0 w-30px h-30px"
              s:border="2px solid white rounded-full"
              style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
            />
            <span s:text="sm [#6C766E]" s:font="400">海佳·受试者 </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="flex gap-15px">
      <Button class="btn cancel h-40px w-90px" @click="onCancel"> 取消 </Button>

      <Button
        class="rounded-40px h-40px w-90px bg-primary text-white"
        s:border="1px solid [#C7F7E3]"
        type="primary"
        @click="onSubmit"
      >
        确定
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Form,
  FormItem,
  Input,
  Textarea,
  Select,
  SelectOption,
  Button,
} from 'ant-design-vue'

import TimeLineItem from '@/components/TimeLine/TimeLineItem.vue'
import TimeLineTitle from '@/components/TimeLine/TimeLineTitle.vue'
import { computed, ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import TextItem from '@/components/TextItem.vue'
import ImgIcon from '@/components/ImgIcon.vue'
// emits
const emits = defineEmits(['onSubmit', 'onCancel'])
const personList = ref([
  { name: '申请人' },
  { name: '申请人' },
  { name: '执行人' },
])
const personLen = computed(() => personList.value.length)
// 取消 按钮
const onCancel = () => {
  emits('onCancel')
}
// 保存 按钮
const onSubmit = () => {
  emits('onSubmit', {})
}
</script>
