<template>
  <div :class="props.className">
    <span class="text-[#6C766E]">{{ props.title }}：</span>
    <span class="text-[#1F311F]"> {{ props.contents }} </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  contents: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: 'text-xs',
  },
})
</script>
