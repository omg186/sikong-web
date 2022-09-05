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
  return {
    width: props.width,
    height: props.height,
    // backgroundImage: `url(../../assets/images/view-reserve.png)`,
    backgroundSize: 'cover',
    backgroundImage: unref(isHovered)
      ? `url(${getAssetsFile(props.hoverSrc)})`
      : `url(${getAssetsFile(props.src)})`,
  }
})
</script>
