<template>
  <div class="relative">
    <i
      class="absolute block w-1px h-full left-6px top-14px z-1"
      s:border="1px dotted [#DBDFDD]"
    ></i>

    <div class="flex gap-x-10px pb-20px">
      <div class="flex w-14px items-center z-2 bg-white relative">
        <i class="w-14px h-14px rounded-full" s:border="2px solid primary"></i>
      </div>
      <span class="font-bold">{{ props.contents }}</span>
    </div>
    <div class="pl-24px">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  contents: {
    type: String,
    default: '',
  },
})
</script>
