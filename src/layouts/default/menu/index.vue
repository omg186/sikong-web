<template>
  <div class="menus-view flex flex-col">
    <h3 s:text="24px [#1F311F] bold" class="pl-20px pt-22px">
      {{ menus?.name }}
    </h3>
    <ul class="flex flex-col gap-10px mx-10px mt-37px">
      <li s:text="sm" v-for="(menu, index) in menus?.children" :key="index">
        <router-link
          :to="menu.path"
          class="menu-item h-46px flex items-center pl-15px rounded-sm cursor-pointer text-[#2D3A2F] text-14px font-medium"
        >
          <i
            class="block w-10px h-10px rounded-full mr-6px"
            s:border="2px solid [#A5A8B4]"
          >
          </i>
          {{ menu.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { REDIRECT_NAME } from '@/routers/constant'
import { usePermissionStore } from '@/store/modules/permission'
import { computed, ref, unref } from 'vue'
const currentActiveMenu = ref('')
const permission = usePermissionStore()
const menus = computed(() => permission.getByPathFrontMenuList)
listenerRouteChange(route => {
  if (route.name === REDIRECT_NAME) return
  currentActiveMenu.value = route.meta?.currentActiveMenu as string

  if (unref(currentActiveMenu)) {
  }
})
</script>

<style lang="less" scoped>
.menus-view {
  .menu-item {
    &:hover {
      @apply bg-[#E5FFF2] text-[##2D3A2F];
    }
  }
  .router-link-active {
    @apply !text-primary bg-[#E5FFF2];
    i {
      @apply bg-primary border-none;
    }
  }
}
</style>
