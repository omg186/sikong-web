<template>
  <ul
    v-for="tree in treeData || []"
    :key="tree.key"
    s:text="[#1F311F] sm"
    class="box-border"
  >
    <li
      class="enterprise-modules-tree-li h-46px w-240px pl-10px pr-14px flex items-center cursor-pointer select-none"
      :style="getClassLev(tree.lev)"
      :class="{
        opened: openKey === tree.value,
        selected: openSelect === tree.value,
      }"
      @click="onSelect(tree)"
    >
      <div class="flex-center">
        <div @click.stop="onOpen(tree)">
          <img
            v-if="openKey === tree.value || openSelect === tree.value"
            src="@/assets/images/file-open-icon.png"
            class="h-18px w-22px mr-10px"
          />
          <img
            v-else
            src="@/assets/images/file-icon.png"
            class="h-18px w-22px mr-10px"
          />
        </div>

        <span>{{ tree.title }}</span>
      </div>
      <div class="flex-1 flex justify-end">
        <img src="@/assets/images/more-icon.png" class="h-4px w-16px" />
      </div>
    </li>
    <transition>
      <ul
        v-if="tree.children"
        v-show="openKey === tree.value"
        class="transition-all"
      >
        <tree-item :tree-data="tree.children"></tree-item>
      </ul>
    </transition>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  treeData: {
    type: Array<any>,
    required: false,
  },
})
const openKey = ref('1')
const openSelect = ref('1')
function getClassLev(lev: number) {
  if (lev == 1) {
    return ''
  }
  return `padding-left: ${lev * 20}px`
}
function onOpen(value: any) {
  console.log(value)
  if (value.children && value.children.length) {
    // openKey.value = value.value
    if (openKey.value === value.value) {
      openKey.value = ''
      return
    }
    openKey.value = value.value
  } else {
    openSelect.value = value.value
  }
}
function onSelect(value: any) {
  console.log(value)
  if (openSelect.value === value.value) {
    openSelect.value = ''
    return
  }
  openSelect.value = value.value
}
</script>

<style lang="scss" scoped>
.enterprise-modules-tree-li {
  &.opened {
  }
  &.selected {
    @apply text-primary bg-[#E5FFF2];
  }
}
</style>
