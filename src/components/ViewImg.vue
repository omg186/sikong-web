<template>
  <div class="z-100 relative">
    <transition
      appear
      enter-active-class="animate__fadeInRight"
      leave-active-class="animate__fadeOutLeft"
      mode="out-in"
    >
      <div class="animate__animated" v-if="props.visible">
        <div
          class="fixed min-w-screen min-h-screen bg-black bg-opacity-[0.88] top-0 left-0 z-100"
        ></div>
        <div
          class="fixed right-67px top-49px z-103"
          @click="emits('update:visible', false)"
        >
          <ImgIcon
            src="close-white.png"
            hover-src="close-white.png"
            width="30px"
            height="30px"
          ></ImgIcon>
        </div>
        <div
          class="bg-white fixed top-20px left-0 z-101 w-full h-full bg-transparent flex justify-center items-center"
        >
          <div
            class="grid grid-cols-[46px,800px,46px] h-450px items-center gap-x-80px"
          >
            <div>
              <ImgIcon
                src="left-1@2x.png"
                hover-src="left-hover-1@2x.png"
                width="46px"
                height="46px"
                @click="goToPrev"
              ></ImgIcon>
            </div>
            <div class="bg-white rounded-8px h-full overflow-hidden">
              <Carousel
                ref="refCarousel"
                :dots="false"
                class="view-img-carousel"
                :autoplay="false"
              >
                <div
                  class="flex w-800px h-450px"
                  v-for="item in props.list"
                  :class="'bg-red-' + item + '00'"
                ></div>
                <!-- <div class="flex bg-yellow-500 h-800px"></div> -->
              </Carousel>
            </div>
            <div>
              <ImgIcon
                src="right-1@2x.png"
                hover-src="right-hover-1@2x.png"
                width="46px"
                height="46px"
                @click="goToNext"
              ></ImgIcon>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { Carousel } from 'ant-design-vue'
import { CarouselRef } from 'ant-design-vue/lib/carousel'
import { ref } from 'vue'
import ImgIcon from './ImgIcon.vue'
const props = withDefaults(
  defineProps<{
    /**
     * 图片列表
     */
    list: Array<string>
    /**
     * 是否显示
     */
    visible: boolean
  }>(),
  {}
)
const emits = defineEmits<{
  (event: 'update:visible', value: boolean): void
}>()

const refCarousel = ref<CarouselRef>()
function goToNext() {
  refCarousel.value?.next()
}
function goToPrev() {
  refCarousel.value?.prev()
}
</script>
<style lang="scss">
.view-img-carousel {
  width: 800px;
  height: 450px;
  &.ant-carousel {
    width: 800px;
    height: 450px;
    flex-shrink: 0;
    text-align: center;
    height: 450px;
    overflow: hidden;
  }
}
</style>
