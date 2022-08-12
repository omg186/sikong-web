<template>
  <div class="grid grid-cols-1 gap-20px font-bold">
    <div
      class="flex gap-20px fill-[#C4C4C4] hover:fill-[#ACACAE]"
      v-if="!record.childrenList || record.childrenList.length == 0"
    >
      <span> <Switch :checked="false"></Switch> </span>
      <SvgIcon
        name="add-project"
        class="w-24px h-24px cursor-pointer"
        @click="onSwitchClick(undefined)"
      />
    </div>
    <div
      class="flex gap-20px items-center"
      v-for="(child, i) in record.childrenList"
      :key="i"
    >
      <span>
        <Switch :checked="child.checked" @click="onSwitchClick(child)"></Switch>
      </span>

      <SvgIcon
        v-if="!child.item || child.item.length === 0"
        name="add-project"
        @click="onSwitchClick(child)"
        class="w-24px h-24px cursor-pointer fill-[#C4C4C4] hover:fill-[#ACACAE]"
      />
      <span
        v-for="(childItem, childIndex) in child.item"
        class="text-[#6C766E] text-xs"
        :key="childIndex"
      >
        {{ childItem.name }}{{ childItem.value }}%
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Table, TableColumnsType, Form, Switch } from 'ant-design-vue'
const props = defineProps({
  record: {
    type: Object,
    required: true,
  },
  column: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['onSwitchClick'])

function onSwitchClick(child) {
  emits('onSwitchClick', child, props.column)
}
</script>
