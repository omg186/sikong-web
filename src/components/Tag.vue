<template>
  <span class="py-10px px-15px bg-[#F4F4F4] rounded-sm" s:text="xs center">
    {{ props.contents }}
  </span>
</template>
<script lang="ts" setup>
const props = defineProps({
  contents: {
    type: String,
    default: '',
  },
})
</script>
