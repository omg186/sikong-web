<template>
  <div class="relative text-xs">
    <i
      class="absolute block w-1px h-full left-6px top-14px z-1"
      s:border="1px dotted [#DBDFDD]"
    ></i>
    <div class="flex gap-x-10px pb-7px">
      <div class="flex w-14px items-center justify-center z-2 relative">
        <i class="w-10px h-10px rounded-full bg-primary"></i>
      </div>
      <span class="font-bold">{{ props.title }}</span>
    </div>
    <div class="grid grid-cols-[18px,auto] gap-x-10px pl-24px fill-[#D7D7D7]">
      <div class="flex items-center h-18px">
        <SvgIcon name="naozhong" class="w-18px h-18px"></SvgIcon>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  contents: {
    type: String,
    default: '',
  },
})
</script>
