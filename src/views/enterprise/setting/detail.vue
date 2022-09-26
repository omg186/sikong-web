<template>
  <div
    class="enterprise-setting-detail flex flex-col justify-between h-full pb-40px"
  >
    <div class="pt-29px flex-1">
      <p
        @click="back"
        class="flex gap-9px items-center fill-[#A5A8B4] cursor-pointer"
        s:hover="fill-[#9299A7]"
      >
        <SvgIcon name="back" class="w-9px h-14px"></SvgIcon>
        <span s:text="[#1F311F]" class="font-bold">返回</span>
      </p>
      <p class="mb-10px" s:text="22px" s:font="bold">狂拽炫酷体能教室01</p>
      <p class="mb-14px" s:text="14px" s:font="medium">房山店校区</p>
      <p class="mb-23px" s:text="12px [#6C766E]">创建时间:2022.3.18</p>
      <p class="mb-17px" s:text="14px" s:font="bold">场地照片</p>
      <div class="flex">
        <Carousel ref="refCarousel" :dots="false" autoplay>
          <div class="!align-top">
            <div class="flex gap-15px">
              <div class="w-172px h-98px rounded-8px bg-blue-300">1</div>
              <div class="w-172px h-98px rounded-8px bg-blue-500">1</div>
              <div class="w-172px h-98px rounded-8px bg-blue-700">1</div>
            </div>
          </div>
          <div class="!align-top">
            <div class="flex gap-15px">
              <div class="w-172px h-98px rounded-8px bg-red-300">2</div>
              <div class="w-172px h-98px rounded-8px bg-red-500">2</div>
              <div class="w-172px h-98px rounded-8px bg-red-700">2</div>
            </div>
          </div>
          <div class="!align-top">
            <div class="flex gap-15px">
              <div class="w-172px h-98px rounded-8px bg-orange-300">3</div>
              <div class="w-172px h-98px rounded-8px bg-orange-500">3</div>
              <div class="w-172px h-98px rounded-8px bg-orange-700">3</div>
            </div>
          </div>
        </Carousel>
        <div
          class="w-30px h-98px rounded-8px flex flex-col gap-4px items-center justify-center cursor-pointer ml-15px hover:bg-[#F9F9F9]"
        >
          <span
            class="w-4px h-4px bg-[#A5A8B4] rounded-full"
            @click="goToCarouse(0)"
          ></span>
          <span
            class="w-4px h-4px bg-[#A5A8B4] rounded-full"
            @click="goToCarouse(1)"
          ></span>
          <span
            class="w-4px h-4px bg-[#A5A8B4] rounded-full"
            @click="goToCarouse(2)"
          ></span>
        </div>
      </div>
      <p class="mb-17px mt-26px" s:text="14px" s:font="bold">场地信息</p>
      <div
        class="w-70px h-28px flex justify-center items-center mb-17px rounded-30px bg-[#FFFADF]"
        s:text="12px [#F3AB51]"
      >
        室内场地
      </div>
      <div class="flex gap-x-92px mb-19px">
        <div s:font="bold">
          <span s:text="14px [#6C766E]">场地面积：</span>
          <span s:text="14px">80㎡</span>
        </div>
        <div s:font="bold">
          <span s:text="14px [#6C766E]">场地层高：</span>
          <span s:text="14px">3.5m</span>
        </div>
        <div s:font="bold">
          <span s:text="14px [#6C766E]">有无立柱：</span>
          <span s:text="14px">3根</span>
        </div>
      </div>
      <div
        s:text="[#6C766E] 12px"
        class="w-567px mb-20px"
        style="line-height: 16.8px"
      >
        此场地相当的哇塞，地面平整，环保橡胶地面，支持50米折返跑距离，体能器械均采购司空官方旗舰店，原装进口！
      </div>
      <div class="mb-20px" s:text="14px" s:font="bold">
        场地经营日历（房山校区经营日历）
      </div>

      <div class="flex pb-40px"><CalendarShow></CalendarShow></div>
      <div class="flex gap-x-10px">
        <CancelButton>取消</CancelButton>
        <OkButton @click="onRoom(true)">编辑</OkButton>
      </div>
    </div>
    <Modal
      v-model:visible="isModalRoot"
      :title="isRootEdit ? '编辑教室/场地' : '添加教室/场地'"
      width="800px"
      :footer="null"
    >
      <template #closeIcon>
        <ImgIcon
          class="flex w-full h-full justify-center items-center"
          src="close.png"
          hover-src="close.png"
        ></ImgIcon>
      </template>
      <AddRoom
        :is-edit="isRootEdit"
        @on-cancel="isModalRoot = false"
        @on-ok="onRootOk"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
// antd-vue
import { Carousel, Modal } from 'ant-design-vue'

// import AddStaff from './modules/add-staff.vue'
//checkPhoneNumber
import { ref } from 'vue'
import { CarouselRef } from 'ant-design-vue/lib/carousel'
import CalendarShow from '@/components/Calendar/CalendarShow.vue'
import CancelButton from '@/components/Button/CancelButton.vue'
import OkButton from '@/components/Button/OkButton.vue'
import AddRoom from './modules/add-room.vue'

const refCarousel = ref<CarouselRef>()
const router = useRouter()
// 修改账号
const isModalRoot = ref(false)
const isRootEdit = ref(false)
// 添加/修改场地click
const onRoom = (isEdit: boolean) => {
  isModalRoot.value = true
  isRootEdit.value = isEdit
}
function onRootOk() {
  isModalRoot.value = false
}
// onModifyAccount
// 返回页面
const back = () => {
  router.back()
}
function goToCarouse(index: number) {
  refCarousel.value?.goTo(index)
}
</script>

<style lang="less">
.enterprise-setting-detail {
  .ant-carousel {
    width: 548px;
    flex-shrink: 0;
    text-align: center;
    height: 106px;
    padding: 5px;
    margin-bottom: 26px;
    line-height: 160px;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
}
</style>
