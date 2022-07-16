<template>
  <div class="menus-view flex justify-center flex-col items-center pt-22px">
    <h3 s:text="size-24px #1F311F bold">{{ menus?.name }}</h3>
    <ul class="flex flex-col gap-10px ml-11px mr-9px mt-37px">
      <li s:text="sm" v-for="(menu, index) in menus?.children" :key="index">
        <router-link
          :to="menu.path"
          class="menu-item w-180px h-46px flex-center items-center rounded-sm cursor-pointer text-[##2D3A2F]"
        >
          <i
            class="block w-10px h-10px rounded-full mr-10px"
            s:border="[2px] solid [#A5A8B4]"
          >
          </i>
          {{ menu.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { usePermissionStore } from '@/store/modules/permission'
import { computed } from 'vue'

const permission = usePermissionStore()
const menus = computed(() => permission.getByPathFrontMenuList)
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
