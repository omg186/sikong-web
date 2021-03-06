<template>
  <div :class="getWrapClass">
    <div class="flex items-center h-66px">
      <div class="flex divide-x-2">
        <div
          class="tab-item w-166px flex-center items-center cursor-pointer"
          :class="activeKeyRef === (item.fullPath || item.path) ? 'active' : ''"
          v-for="item in getTabsState"
          :key="item.query ? item.fullPath : item.path"
          @click="handleChange(item.fullPath || item.path)"
        >
          <span>{{ item.meta.title }}</span>
          <i
            @click.stop="handleEdit(item.fullPath || item.path)"
            v-if="!(item && item.meta && item.meta.affix)"
          >
            <close-outlined />
          </i>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { RouteLocationNormalized, RouteMeta, useRoute } from 'vue-router'

import { defineComponent, computed, unref, ref, watchEffect } from 'vue'

import { Tabs } from 'ant-design-vue'
import { CloseOutlined } from '@ant-design/icons-vue'
// import TabContent from './components/TabContent.vue'
// import FoldButton from './components/FoldButton.vue'
// import TabRedo from './components/TabRedo.vue'

import { useGo } from '@/hooks/web/use-page'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useUserStore } from '@/store/modules/user'

import { initAffixTabs, useTabsDrag } from './useMultipleTabs'

import { REDIRECT_NAME } from '@/routers/constant'

import { useRouter } from 'vue-router'
import { listenerRouteChange } from '@/logics/mitt/routeChange'

export default defineComponent({
  name: 'MultipleTabs',
  components: {
    // TabRedo,
    // FoldButton,
    CloseOutlined,
    Tabs,
    TabPane: Tabs.TabPane,
    // TabContent,
  },
  setup() {
    const affixTextList = initAffixTabs()
    const activeKeyRef = ref('')

    useTabsDrag(affixTextList)
    const tabStore = useMultipleTabStore()
    const userStore = useUserStore()
    const router = useRouter()
    const { prefixCls } = { prefixCls: 'multiple-tabs' }
    const go = useGo()
    // const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()

    const getTabsState = computed(() => {
      return tabStore.getTabList.filter(item => !item.meta?.hideTab)
    })

    const unClose = computed(() => unref(getTabsState).length === 1)

    const getWrapClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--hide-close`]: unref(unClose),
        },
      ]
    })

    listenerRouteChange(route => {
      const { name } = route
      if (name === REDIRECT_NAME || !route || !userStore.getToken) {
        return
      }

      const { path, fullPath, meta = {} } = route
      const { currentActiveMenu, hideTab, ignoreTab } = meta as RouteMeta
      const isHide = !hideTab ? null : currentActiveMenu
      const p = isHide || fullPath || path

      if (ignoreTab) {
        return
      }
      if (activeKeyRef.value !== p) {
        activeKeyRef.value = p as string
      }
      if (isHide) {
        const findParentRoute = router
          .getRoutes()
          .find(item => item.path === currentActiveMenu)

        findParentRoute &&
          tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized)
      } else {
        tabStore.addTab(unref(route))
      }
    })

    function handleChange(activeKey: any) {
      activeKeyRef.value = activeKey
      go(activeKey, false)
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
      // Added operation to hide, currently only use delete operation
      if (unref(unClose)) {
        return
      }

      tabStore.closeTabByKey(targetKey, router)
    }
    return {
      getWrapClass,
      handleEdit,
      handleChange,
      activeKeyRef,
      getTabsState,
      //   getShowQuick,
      //   getShowRedo,
      //   getShowFold,
    }
  },
})
</script>
<style lang="scss" scoped>
.multiple-tabs {
  .tab-item {
    color: #83867e;
    position: relative;
    i {
      width: 24px;
      height: 24px;
      @apply w-24px h-24px absolute right-15px text-[#83867e] flex-center items-center rounded-8px;
      &:hover {
        background: #f4f6f3;
      }
      &:active {
        background: #f4f6f3;
      }
    }

    &.active {
      @apply text-[#2D3A2F] relative;
      &::after {
        content: '';
        width: 56px;
        height: 5px;
        @apply bg-primary absolute bottom-[-20px] rounded-sm;
      }
    }
  }
}
</style>
