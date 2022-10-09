<template>
  <div :class="props.class" ref="target">
    <i class="inline-block cursor-pointer" :style="styles" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, unref } from 'vue'
import { getAssetsFile } from '@/utils'
import { useElementHover } from '@vueuse/core'
const props = withDefaults(
  defineProps<{
    class?: string
    src: string
    hoverSrc?: string
    width?: string
    height?: string
    activeWidth?: string
    activeHeight?: string
  }>(),
  {
    width: '20px',
    height: '20px',
    hover: false,
  }
)
const target = ref()
const isHovered = useElementHover(target)
const styles = computed(() => {
  let w = props.width
  let h = props.height
  let url = props.src
  if (unref(isHovered)) {
    w = props.activeWidth || props.width
    h = props.activeHeight || props.height
    url = props.hoverSrc || props.src
  }
  return {
    width: w,
    height: h,
    // backgroundImage: `url(../../assets/images/view-reserve.png)`,
    backgroundSize: 'cover',
    backgroundImage: `url(${getAssetsFile(url)})`,
  }
})
</script>
