<template>
  <RouterView :data="data">
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" />
        </keep-alive>
        <component v-else :is="Component" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'

// import FrameLayout from '@/layouts/iframe/index.vue'

// import { useRootSetting } from '@/hooks/setting/useRootSetting'

import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
// import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { getTransitionName } from './transition'

import { useMultipleTabStore } from '@/store/modules/multipleTab'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'KeepRouterView',
  props: { key: { type: String, default: 'key' }, data: {} },
  //   components: { FrameLayout },
  setup() {
    const route = useRoute()
    const { getShowMultipleTab } = useMultipleTabSetting()
    const tabStore = useMultipleTabStore()

    const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting()

    const { getBasicTransition, getEnableTransition } = useTransitionSetting()
    console.log(getOpenKeepAlive, 'getOpenKeepAlive')
    const openCache = computed(
      () => unref(getOpenKeepAlive) && unref(getShowMultipleTab)
    )

    const getCaches = computed((): string[] => {
      if (!unref(getOpenKeepAlive)) {
        return []
      }
      return tabStore.getCachedTabList
    })

    return {
      route,
      getTransitionName,
      openCache,
      getEnableTransition,
      getBasicTransition,
      getCaches,
      //   getCanEmbedIFramePage,
    }
  },
})
</script>
