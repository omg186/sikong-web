import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { unref } from 'vue'
import { Router } from 'vue-router'
import { createParamMenuGuard } from './paramMenuGuard'
import { createPermissionGuard } from './permission-guard'
import { createStateGuard } from './stateGuard'

import nProgress from 'nprogress'
import { setRouteChange } from '@/logics/mitt/routeChange'
export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router)
  createPageGuard(router)
  createPermissionGuard(router)
  createParamMenuGuard(router)
  createStateGuard(router)
  createProgressGuard(router)
}
/**
 * Hooks for handling page state
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async to => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    // to.meta.loaded = !!loadedPageMap.get(to.path)
    // Notify routing changes
    setRouteChange(to)

    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)
  })
}

// Used to handle page loading status
function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async to => {
    if (!userStore.getToken) {
      return true
    }
    if (to.meta.loaded) {
      return true
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO Looking for a better way
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 500)
    }
    return true
  })
}

export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true
    }
    unref(getOpenNProgress) && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}
