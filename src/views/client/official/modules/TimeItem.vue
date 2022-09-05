<template>
  <div
    v-for="(i, index) in props.times.length - 1"
    class="w-46px h-38px flex justify-center items-center cursor-pointer fill-[#CCCCCC]"
    style="line-height: 1"
    :class="{
      'border-1px text-primary': props.isEdit,
      'evaluation-time-1': props.timeData[index].status === 1 && props.isEdit,
      'evaluation-time-2': props.timeData[index].status === 2,
      'evaluation-time-3': props.timeData[index].status === 3,
      'evaluation-time-hover': props.selIndex === `${props.rowIndex}.${index}`,
    }"
    @click="onItemClick(props.timeData[index].status, index)"
  >
    <SvgIcon
      v-if="props.timeData[index].status === 1 && props.isEdit"
      name="add"
      class="w-15px h-15px"
    ></SvgIcon>
    <span v-if="props.timeData[index].status === 3"> 测评 </span>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    times: Array<any>
    timeData: Array<any>
    selIndex: string
    rowIndex: number
    isEdit?: boolean
  }>(),
  { isEdit: true }
)

// emits
const emits = defineEmits(['onItemClick', 'onCancel'])
function rowWidth(index: number) {
  const item = props.timeData[index]
  const itemNext = props.timeData[index + 1]
  if (itemNext) {
    if (itemNext.status === 2) {
      return itemNext.width + item.width
    }
  }
  return 46
}
function onItemClick(status, index) {
  //   selIndex = `${type}.${index}`
  if (!props.isEdit) {
    return false
  }
  if (status !== 2) {
    emits('onItemClick', { rowIndex: props.rowIndex, index })
  }
}
</script>

<style lang="scss" scoped>
.evaluation-time {
  &-1 {
    @apply bg-white border-dashed border-[#DBDFDD] rounded-6px;
  }
  &-2 {
    @apply bg-[#F3F3F3] border-[#F3F3F3] border-solid rounded-0px border-1px text-primary;
  }
  &-3 {
    @apply bg-[#F7FEFB] border-[#C7F7E3] border-solid rounded-6px border-1px text-primary;
  }
  &-hover {
    @apply border-1px bg-primary border-primary border-solid rounded-6px text-white fill-white;
  }
}
</style>
