<template>
  <div class="relative text-xs">
    <div
      class="absolute block w-1px h-full left-6px top-10px z-1"
      v-if="!props.end"
    >
      <slot name="line">
        <i class="inline-block h-full" s:border="1px dotted [#DBDFDD]"></i>
      </slot>
    </div>
    <div class="flex gap-x-10px pb-7px">
      <div class="flex w-14px items-center justify-center z-2 relative">
        <slot name="line-icon">
          <i class="inline-block w-10px h-10px rounded-full bg-primary"></i>
        </slot>
      </div>
      <div>
        <slot name="title">
          <span class="font-bold">{{ props.title }}</span>
        </slot>
      </div>
    </div>
    <div class="grid grid-cols-[18px,auto] gap-x-10px pl-24px fill-[#D7D7D7]">
      <slot name="contents-icon">
        <div class="flex items-center h-18px">
          <SvgIcon name="naozhong" class="w-18px h-18px"></SvgIcon>
        </div>
      </slot>
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
  end: {
    type: Boolean,
    default: false,
  },
})
</script>
