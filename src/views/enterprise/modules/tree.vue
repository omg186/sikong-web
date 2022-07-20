<template>
  <Spin :spinning="loading">
    <div class="enterprise-modules-tree">
      <Tree
        :tree-data="treeData"
        @select="onActiveChange"
        v-model:selectedKeys="selectedKeys"
        defaultExpandAll
        v-if="treeData?.length"
        :field-names="fieldNames"
      >
        <template #icon>
          <img
            src="@/assets/images/file-icon.png"
            class="h-18px w-22px mr-10px"
          />
        </template>
        <template #title="{ dataRef, selected }">
          <div class="flex items-center flex-1">
            <div class="w-22px mr-10px flex-center" v-if="!dataRef.children">
              <template
                v-if="
                  dataRef.type === OrgTreeTypeEnum.GS ||
                  dataRef.type === OrgTreeTypeEnum.BM
                "
              >
                <div :class="selected ? 'fill-primary' : 'fill-[#9299A7]'">
                  <svg width="22px" height="18px" class="svg-symbol">
                    <use xlink:href="#icon-wenjianjia-dangqian" />
                  </svg>
                </div>
              </template>
              <template v-else-if="dataRef.type === OrgTreeTypeEnum.XZ">
                <div :class="selected ? 'fill-primary' : 'fill-[#A5A8B4]'">
                  <svg width="9px" height="6px" class="svg-symbol">
                    <use xlink:href="#icon-zubiao-moren" />
                  </svg>
                </div>
              </template>
            </div>

            <span> {{ dataRef.title }}</span>
            <img
              v-if="!selected"
              src="@/assets/images/more-icon.png"
              class="more h-4px w-16px absolute right-10px opacity-0"
            />
            <Popover placement="bottom" v-else>
              <template #title> </template>
              <template #content>
                <div class="cursor-pointer">
                  <p @click="emits('onEdit', dataRef.value)">编辑部门</p>
                  <p @click="emits('onAdd', dataRef.value)">添加子部门</p>
                  <p @click="emits('onDel', dataRef.value)">删除部门</p>
                </div>
              </template>
              <div class="absolute right-10px" @click.stop="">
                <div
                  class="w-24px h-24px flex-center items-center"
                  :class="selected ? 'fill-primary' : 'fill-[#9299A7]'"
                >
                  <svg width="16px" height="4px" class="svg-symbol">
                    <use xlink:href="#icon-gengduo" />
                  </svg>
                </div>
              </div>
            </Popover>
          </div>
        </template>
        <template #switcherIcon="{ dataRef, expanded, selected }">
          <template
            v-if="
              dataRef.type === OrgTreeTypeEnum.GS ||
              dataRef.type === OrgTreeTypeEnum.BM
            "
          >
            <img
              v-if="expanded || selected"
              src="@/assets/images/file-open-icon.png"
              class="h-18px w-22px mr-10px"
            />
            <img
              v-else
              src="@/assets/images/file-icon.png"
              class="h-18px w-22px mr-10px"
            />
          </template>
        </template>
      </Tree>
    </div>
  </Spin>
</template>
<script lang="ts" setup>
import { OrgTreeTypeEnum } from '@/enums'
import { Tree, Popover, Spin, TreeProps } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import { getOrgTreeApi } from '@/api/org'
import { computed, onMounted, ref, unref, watchEffect } from 'vue'
import { GetTreeParams } from '@/api/model/org-model'
import { useRoute, useRouter } from 'vue-router'
const emits = defineEmits<{
  (event: 'onEdit', key: string): void
  (event: 'onAdd', key: string): void
  (event: 'onDel', key: string): void
  (event: 'onClick', value: GetTreeParams): void
}>()
const fieldNames: TreeProps['fieldNames'] = {
  children: 'children',
  title: 'title',
  key: 'value',
}
const route = useRoute()
// selectedKeys: string[]
const selectedKeys = ref([])
const selectedNode = ref<GetTreeParams>()

const routeData = computed(() => route.query?.org as unknown as GetTreeParams)
const {
  data: treeData,
  run,
  loading,
} = useRequest(() => {
  return getOrgTreeApi()
})
watchEffect(() => {
  const r = unref(routeData)
  console.log('r', r)
  if (!unref(selectedKeys).length && r) {
    selectedKeys.value = [r.value]
  }
})
onMounted(() => {
  console.log('Tree mounted')
  // selectedKeys.value = route.query?.org ? [route.query.id] : ['0-0-0']
  run()
})
function onActiveChange(selectedKeys: string[], { selected, selectedNodes }) {
  console.log(selectedKeys)
  selectedNode.value = selectedNodes[0]
  emits('onClick', selectedNodes[0])
}
</script>

<style lang="scss">
.enterprise-modules-tree {
  .ant-tree-treenode {
    height: 46px;
    @apply w-full flex items-center  pl-10px pr-14px cursor-pointer;
    &:hover {
      .more {
        opacity: 1;
      }
    }
    .ant-tree-switcher {
      @apply flex items-center;
    }
    &.ant-tree-treenode-selected {
      @apply text-primary bg-[#E5FFF2] rounded-8px;
    }
    .ant-tree-node-content-wrapper {
      position: unset;
      &:hover {
        background-color: transparent;
      }
    }
  }
  .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: transparent;
  }
}
</style>
