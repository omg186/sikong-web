<template>
  <div class="potential-person-info">
    <div
      class="flex justify-between pl-30px pr-20px py-30px bg-[#FBFCFB]"
      s:border="b solid light-500"
    >
      <div class="grid grid-cols-[80px,auto] gap-20px">
        <div class="grid grid-rows-[80px,auto] gap-5px">
          <!-- 头像 -->
          <div
            class="avatar-wrapper w-68px h-68px flex justify-center items-center"
          >
            <img
              class="z-10 w-60px h-60px relative rounded-full"
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
              alt=""
            />
          </div>
          <!-- 意向客户 -->
          <div
            class="px-11px py-4px max-h-24px bg-[#FFFADF] text-[#F3AB51] text-center text-xs rounded-60"
          >
            意向客户
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-37px gap-y-15px">
          <div class="flex flex-col gap-5px">
            <span class="text-lg">李睿曦(Ricky)</span>
            <span>男 5岁11个月</span>
          </div>
          <div class="flex fill-[#A5A8B4]">
            <!-- SVG -->
            <Tooltip title="新建预约测评">
              <SvgIcon
                name="client"
                class="w-28px h-28px cursor-pointer"
                s:hover="fill-[#363B39]"
                @click="visibleAddEvaluation = true"
              />
            </Tooltip>
            <Tooltip title="分配调整顾问">
              <SvgIcon
                name="switch"
                class="w-28px h-28px cursor-pointer"
                s:hover="fill-[#363B39]"
                @click="visibleDistribute = true"
              />
            </Tooltip>
            <Tooltip title="转为正式客户">
              <ImgIcon
                src="add2.png"
                class="h-28px"
                width="28px"
                height="28px"
                hover-src="add2-hover.png"
                @click="visibleToFormal = true"
              ></ImgIcon>
            </Tooltip>
          </div>
          <div class="flex flex-col gap-5px text-xs">
            <span>
              创建时间
              <span class="text-[#9E9E9E]">:2022.3.5 10:18</span>
            </span>
            <span>渠道来源<span class="text-[#9E9E9E]">:主动上门</span> </span>
          </div>
          <div class="flex flex-col gap-5px text-xs">
            <span>
              联系人
              <span class="text-[#9E9E9E]">:包女士（母亲）</span>
            </span>
            <span>
              顾问
              <span class="text-[#9E9E9E]">:张艳玲（猫猫） </span>
            </span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[36px,36px] gap-10px fill-[#A5A8B4]">
        <span
          class="flex items-center justify-center h-36px rounded-10px cursor-pointer"
          s:hover="fill-primary"
          s:border="1px solid [#DBDFDD]"
        >
          <SvgIcon
            name="down"
            class="w-10px h-6px transform rotate-90"
          ></SvgIcon>
        </span>
        <span
          class="flex items-center justify-center h-36px rounded-10px cursor-pointer"
          s:hover="fill-primary"
          s:border="1px solid [#DBDFDD]"
        >
          <SvgIcon
            name="down"
            class="w-10px h-6px transform rotate-270"
          ></SvgIcon>
        </span>
      </div>
    </div>
    <div class="px-30px pt-10px">
      <Tabs v-model:activeKey="activeKey">
        <TabPane key="1" tab="学员资料"><Information></Information></TabPane>
        <TabPane key="2" tab="沟通&动态"><Communicate /></TabPane>
        <TabPane key="3" tab="测评&报告"><Evaluation /></TabPane>
        <template #rightExtra>
          <Button
            type="primary"
            size="large"
            class="rounded-60 flex items-center"
            v-if="activeKey === '1'"
            @click="visibleAddClient = true"
          >
            修改
            <template #icon>
              <SvgIcon
                name="modify1"
                class="inline-block w-18px h-12px fill-white mr-5px"
              ></SvgIcon>
            </template>
          </Button>
          <Button
            type="primary"
            size="large"
            class="rounded-60 flex items-center"
            v-else-if="activeKey === '2'"
            @click="visibleRecording = true"
          >
            添加跟进记录
            <template #icon>
              <SvgIcon
                name="add"
                class="inline-block w-24px h-24px fill-white mr-5px"
              ></SvgIcon>
            </template>
          </Button>
          <Button
            type="primary"
            size="large"
            class="rounded-60 flex items-center"
            v-else-if="activeKey === '3'"
            @click="visibleAddEvaluation = true"
          >
            预约测评
            <template #icon>
              <SvgIcon
                name="add"
                class="inline-block w-24px h-24px fill-white mr-5px"
              ></SvgIcon>
            </template>
          </Button>
        </template>
      </Tabs>
    </div>
    <!-- 添加更进记录 -->
    <Modal
      v-model:visible="visibleRecording"
      title="添加跟进记录"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <AddRecording
        @onCancel="visibleRecording = false"
        @onSubmit="visibleRecording = false"
      ></AddRecording>
    </Modal>

    <!-- 分配/调整顾问 -->
    <Modal
      v-model:visible="visibleDistribute"
      width="800px"
      title="分配/调整顾问"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <Distribute
        @on-cancel="visibleDistribute = false"
        @on-submit="visibleDistribute = false"
      ></Distribute>
    </Modal>
    <!-- 转为正式会员 -->
    <Modal
      v-model:visible="visibleToFormal"
      width="660px"
      title="转为正式会员"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <ToFormal
        @on-cancel="visibleToFormal = false"
        @on-submit="visibleToFormal = false"
      ></ToFormal>
    </Modal>
    <!-- 预约测评 -->
    <Modal
      v-model:visible="visibleAddEvaluation"
      width="800px"
      title="预约测评"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <AddEvaluation
        @on-cancel="visibleAddEvaluation = false"
        @on-submit="visibleAddEvaluation = false"
      ></AddEvaluation>
    </Modal>

    <!-- 新建意向客户 -->
    <Modal
      v-model:visible="visibleAddClient"
      width="660px"
      title="修改意向客户"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <AddClient
        @on-cancel="visibleAddClient = false"
        @on-submit="visibleAddClient = false"
      ></AddClient>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import ImgIcon from '@/components/ImgIcon.vue'
import { Tabs, TabPane, Button, Modal, Tooltip } from 'ant-design-vue'
import { ref } from 'vue'
import Information from './Information.vue'
import AddClient from './AddClient.vue'
import Communicate from './Communicate.vue'
import Evaluation from './Evaluation.vue'
import AddRecording from './AddRecording.vue'
import AddEvaluation from './AddEvaluation.vue'
import ToFormal from './ToFormal.vue'
import Distribute from './Distribute.vue'
const activeKey = ref('1')
const visibleAddEvaluation = ref(false)
const visibleDistribute = ref(false)
const visibleToFormal = ref(false)
const visibleAddClient = ref(false)
const visibleRecording = ref(false)
</script>
<style lang="scss">
.potential-person-info {
  .ant-tabs-nav::before {
    border: 0px;
  }
  .ant-tabs-content-holder {
    min-height: 400px;
    overflow-x: auto;
  }
}
</style>
<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  z-index: 4;
  &::before {
    content: '';
    position: absolute;
    display: block;
    width: 50%;
    height: 50%;
    background-color: #fff;
    opacity: 1;
    right: -5px;
    top: -10px;
    z-index: 2;
    @apply rounded-full;
  }
  &::after {
    /* @apply 4px solid [#2FE095]; */
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 4px solid #2fe095;
    border-radius: 50%;
  }
}
</style>
