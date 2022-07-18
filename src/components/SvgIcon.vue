<template>
  <svg :class="svgClass" :style="styleObject" @click="emit('on-click')">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
}
</script>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  clickable: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: '1em',
  },
  className: {
    type: String,
    default: '',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgClass = computed(() => 'svg-icon ' + props.className || '')
const styleObject = computed(() => {
  return {
    // width: props.size,
    // height: props.size,
    cursor: props.clickable ? 'pointer' : '',
  }
})
const emit = defineEmits(['on-click'])
</script>
