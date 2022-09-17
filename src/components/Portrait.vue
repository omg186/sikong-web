<template>
  <span
    class="portrait rounded-40 overflow-hidden"
    :class="{
      'portrait-shadow': shadow,
      'portrait-border': border,
    }"
  >
    <img :src="portraitUrl" />
  </span>
</template>

<script lang="ts" setup>
import { getAssetsFile } from '@/utils'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    url: string
    isLocalUrl?: boolean
    shadow?: boolean
    border?: boolean
  }>(),
  { shadow: true, border: true, isLocalUrl: false }
)
const portraitUrl = computed(() => {
  if (props.isLocalUrl) {
    return getAssetsFile(props.url)
  }
  return props.url
})
</script>
<style lang="scss" scoped>
.portrait {
  &-shadow {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  }
  &-border {
    border: 2px solid #ffffff;
  }
}
</style>
