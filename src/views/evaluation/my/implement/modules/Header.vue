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
      <SvgIcon
        :name="props.type"
        class="w-20px h-21px stroke-[#2F3231] fill-#2F3231] cursor-pointer"
        s:hover="fill-primary stroke-primary"
        @click="emits('clickIcon')"
      ></SvgIcon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const props = withDefaults(
  defineProps<{
    type?: 'list' | 'calendar'
  }>(),
  { type: 'list' }
)
const emits = defineEmits<{
  (event: 'clickIcon'): void
}>()

function onJump() {
  router.push({ name: 'MyEvaluationAgency' })
}
</script>
