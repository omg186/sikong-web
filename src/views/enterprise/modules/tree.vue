<template>
  <div class="enterprise-modules-tree">
    <!-- <ul
      v-for="tree in treeData"
      :key="tree.key"
      s:text="[#1F311F] sm"
      class="box-border"
    > -->
    <!-- <tree-item :tree-data="treeData" /> -->
    <!-- </ul> -->
    <Tree :tree-data="treeData">
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
</template>
<script lang="ts" setup>
import {
  DownOutlined,
  SmileOutlined,
  FrownOutlined,
  FrownFilled,
} from '@ant-design/icons-vue'
import { OrgTreeTypeEnum } from '@/enums'
import { Tree, Popover } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import { getOrgTreeApi } from '@/api/org'
const emits = defineEmits<{
  (event: 'onEdit', key: string): void
  (event: 'onAdd', key: string): void
  (event: 'onDel', key: string): void
}>()
const { data: treeData } = useRequest(
  () => {
    return getOrgTreeApi()
  },
  { manual: false }
)
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
