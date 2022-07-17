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
    <Tree :default-expanded-keys="['0-0-0']" :tree-data="treeData">
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
              <img
                v-if="selected"
                src="@/assets/images/file-open-icon.png"
                class="h-18px w-22px"
              />
              <img
                v-else
                src="@/assets/images/file-icon.png"
                class="h-18px w-22px"
              />
            </template>
            <template v-else-if="dataRef.type === OrgTreeTypeEnum.XZ">
              <img
                v-if="selected"
                src="@/assets/images/xu-selected-icon.png"
                class="w-9px h-6px"
              />
              <img
                v-else
                src="@/assets/images/xu-icon.png"
                class="w-9px h-6px"
              />
            </template>
          </div>

          <span> {{ dataRef.title }}</span>
          <img
            v-if="!selected"
            src="@/assets/images/more-icon.png"
            class="more h-4px w-16px absolute right-10px opacity-0"
          />
          <img
            v-else
            src="@/assets/images/more-selected-icon.png"
            class="more h-4px w-16px absolute right-10px"
          />
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
import { defineComponent, ref } from 'vue'
import { OrgTreeTypeEnum } from '@/enums'
import type { TreeProps } from 'ant-design-vue'
import { Tree } from 'ant-design-vue'
import { useRequest } from 'vue-request'
import { getOrgTreeApi } from '@/api/org'
import TreeItem from './tree-item.vue'
const treeData2 = ref<TreeProps['treeData']>([
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf', key: '0-0-0-0' },
          {
            key: '0-0-0-1',
          },
          { title: 'leaf', key: '0-0-0-2' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: 'leaf', key: '0-0-1-0' }],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          { title: 'leaf 1', key: '0-0-2-0' },
          {
            title: 'leaf 2',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        children: [
          { title: 'leaf', key: '0-1-0-0' },
          { title: 'leaf', key: '0-1-0-1' },
        ],
      },
    ],
  },
])
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
