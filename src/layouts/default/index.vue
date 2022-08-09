<template>
  <div
    class="p-0 m-auto grid grid-cols-[80px,200px,auto] min-h-screen bg-[#F4F4F4]"
  >
    <div
      class="sider grid grid-rows-[50px,minmax(40px,10%),auto,auto] bg-[#0C191D] relative"
    >
      <!-- grid-cols-[200px,repeat(auto-fill,minmax(15%,100px)),300px]] -->
      <div class="sider-user divide-y-2 flex-center">
        <div class="bg-green-300 w-[40px] h-40px rounded-60"></div>
      </div>
      <div class="user pt-[10px] flex-center">
        <div class="w-[40px] relative">
          <div
            class="user-circle absolute left-[30px] w-[9.45px] h-[9.45px] aspect-square flex justify-center items-center rounded-full"
          >
            <div
              class="bg-[#17ef88] h-[5.45px] aspect-square rounded-full"
            ></div>
          </div>
          <img src="@/assets/images/sider/user.jpeg" alt="" class="user-img" />
        </div>
      </div>
      <div class="flex-center">
        <div class="flex flex-col gap-20px">
          <div v-for="(item, index) of leftMenus" :key="index">
            <router-link
              :to="item.path"
              :title="item.name"
              v-slot="{ isActive, href, navigate }"
              class="menu-icon w-[46px] h-[46px] p-[10px] flex justify-center cursor-pointer"
            >
              <img v-if="!isActive" :src="getAssetsImages(item.icon)" alt="" />
              <img v-else :src="getAssetsImages(item.iconActive)" alt="" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex justify-end flex-col items-center gap-30px pt-10px">
        <img
          src="../../assets/images/sider/bg-sider.png"
          class="aspect-3.1/15.8"
        />
        <div
          class="w-46px h-46px rounded-16px flex-center items-center cursor-pointer fill-white"
          s:hover="bg-[#061011]"
          s:active="bg-[#061011] fill-primary"
          @click="loginOut"
        >
          <svg width="18px" height="100%" class="svg-symbol">
            <use xlink:href="#icon-tuichu" />
          </svg>
        </div>
      </div>
    </div>
    <div class="mr-[1px] bg-[#FCFCFC]">
      <Menus />
    </div>
    <div class="bg-[#F3F3F3] flex flex-col overflow-y-auto">
      <div class="h-[66px] bg-white">
        <TabsView />
      </div>
      <div class="p-[20px] w-full box-border flex-1">
        <!-- <UseElementSize v-slot="{ width, height }"> -->
        <!-- {{ width }} {{ height }} -->
        <!-- <Spin
          size="large"
          :spinning="getPageLoading && getOpenPageLoading"
          :delay="400"
        > -->
        <div class="ly-content bg-white w-full h-full">
          <!-- <KeepRouterView /> -->
          <template v-if="route.meta?.ignoreTransition">
            <RouterView> </RouterView>
          </template>
          <template v-else>
            <KeepRouterView />
          </template>
        </div>
        <!-- </Spin> -->
        <!-- </UseElementSize> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import Menus from './menu/index.vue'
import TabsView from './tabs/index.vue'
import { leftMenus } from '@/settings/menuSetting'
import { getAssetsFile } from '@/utils'
import KeepRouterView from '@/components/KeepRouterView.vue'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { Spin } from 'ant-design-vue'
import { useRoute } from 'vue-router'
const userStore = useUserStore()
const route = useRoute()
const { getPageLoading } = useRootSetting()
const { getOpenPageLoading } = useTransitionSetting()
function loginOut() {
  userStore.logout(true)
}

const getAssetsImages = name => {
  return getAssetsFile(name)
}
</script>
<style lang="less" scoped>
.sider {
  // background-image: url('../../assets/images/sider/bg-sider.png');
  // background-repeat: no-repeat;
  // background-position: 50% 80%;
  padding: 22px 17px 25px;
  .sider-user {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .user-circle {
    background: rgba(47, 224, 149, 0.3);
  }
  .user {
    .user-img {
      @apply rounded-1/2 border-2;
      box-shadow: 0px 2px 15px 1px rgba(50, 57, 65, 0.16);
      opacity: 1;
      border: 2px solid rgba(47, 224, 149, 0.3);
    }
    &:hover .user-img {
      border: 2px solid rgba(47, 224, 149, 0.5);
    }
    &:hover .user-circle {
      background: rgba(47, 224, 149, 0.5);
    }
    &:active .user-img {
      border: 2px solid rgba(47, 224, 149, 0.1);
    }
  }
  .menu-icon {
    &:hover {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
    }
    &:active,
    :focus {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: inset 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
    }
    &.router-link-active {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: inset 0px 2px 6px 1px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      @apply relative;
      &::before {
        @apply absolute block w-2px h-12px left-0px top-1/2 translate-y-[-50%] transform bg-primary;
        content: '';
      }
    }
  }
}
.ly-content {
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 66px - 50px);
  box-shadow: 0px 0px 20px 1px rgb(0 0 0 / 6%);
}
</style>
