<template>
  <div class="flex justify-between px-30px py-20px">
    <p s:text="[#2D3E2D]" class="font-bold">我的测评</p>
    <div class="flex gap-x-40px">
      <span class="relative cursor-pointer" @click="onJump">
        <span
          class="inline-block absolute right-[-20px] top-[-5px] w-26px h-18px bg-[#F4274E]"
          s:border="rounded-20px rounded-l-15px"
          s:text="xs white center"
        >
          26
        </span>
        待处理
      </span>
      <ImgIcon
        v-if="props.visibleType"
        :src="'calendar.png'"
        hover-src="calendar-hover.png"
        @click="emits('clickIcon')"
        width="19px"
        height="22px"
      >
      </ImgIcon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import ImgIcon from '@/components/ImgIcon.vue'

import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    type?: 'list' | 'calendar'
    visibleType?: boolean
  }>(),
  { type: 'list', visibleType: true }
)
const emits = defineEmits<{
  (event: 'clickIcon'): void
}>()

function onJump() {
  router.push({ name: 'MyEvaluationAgency' })
}
</script>
