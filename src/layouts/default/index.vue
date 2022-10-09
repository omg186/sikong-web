<template>
  <div
    class="p-0 m-auto grid grid-cols-[70px,180px,1fr] min-h-screen bg-[#F4F4F4]"
  >
    <div
      class="sider grid grid-rows-[55px,34px,auto,auto] bg-[#2B3C4C] relative"
    >
      <!-- grid-cols-[200px,repeat(auto-fill,minmax(15%,100px)),300px]] -->
      <div class="sider-user flex flex-col items-center flex-center">
        <div class="w-[30px] h-33px">
          <img
            src="@/assets/images/logo-icon@2x.png"
            class="w-full h-full rounded-60"
            alt=""
          />
        </div>
      </div>
      <div class="user pt-[20px] flex-center">
        <div class="w-[34px] h-[34px] relative cursor-pointer">
          <div
            class="user-circle absolute right-0 w-[9.45px] h-[9.45px] aspect-square flex justify-center items-center rounded-full"
          >
            <div
              class="bg-[#17ef88] h-[5.45px] aspect-square rounded-full"
            ></div>
          </div>
          <img src="@/assets/images/sider/user.jpeg" alt="" class="user-img" />
        </div>
      </div>
      <div class="flex-center pt-36px">
        <div class="flex flex-col gap-20px">
          <div v-for="(item, index) of leftMenus" :key="index">
            <router-link
              :to="item.path"
              :title="item.name"
              v-slot="{ isActive, href, navigate }"
              class="flex items-center cursor-pointer"
            >
              <ImgIcon
                v-if="!isActive"
                :src="item.icon"
                :hover-src="item.iconHover"
                width="40px"
                height="40px"
                alt=""
                class="flex items-center justify-center !bg-contain"
              />
              <ImgIcon
                v-else
                :src="item.iconActive"
                width="40px"
                height="40px"
                class="flex items-center justify-center !bg-contain"
                alt=""
              />
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
          class="rounded-16px flex-center items-center cursor-pointer fill-white"
          @click="loginOut"
        >
          <ImgIcon
            src="sider/exit.png"
            hover-src="sider/exit-hover.png"
            width="40px"
            height="40px"
          >
          </ImgIcon>
        </div>
      </div>
    </div>
    <div
      class="border-r border-r-[#F1F1F1] border-solid bg-[#FCFCFC]"
      style="box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.5)"
    >
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
import { useRoute } from 'vue-router'
import ImgIcon from '@/components/ImgIcon.vue'
const userStore = useUserStore()
const route = useRoute()
function loginOut() {
  userStore.logout(true)
}

const getAssetsImages = name => {
  return getAssetsFile(name)
}
</script>
<style lang="scss" scoped>
.sider {
  padding: 20px 0px;
  .sider-user {
    @apply gap-y-20px;
    &::after {
      content: '';
      @apply w-27px h-1px bg-[#F4F4F4] rounded-10px opacity-10;
    }
  }
  .user-circle {
    background: rgba(47, 224, 149, 0.3);
  }
  .user {
    .user-img {
      @apply rounded-1/2 border-2 w-full h-full;
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
  /* .menu-icon {
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
  } */
}
.ly-content {
  border-radius: 10px;
  overflow: hidden;
  overflow-y: auto;
  height: calc(100vh - 66px - 50px);
  box-shadow: 0px 0px 20px 1px rgb(0 0 0 / 6%);
}
</style>
