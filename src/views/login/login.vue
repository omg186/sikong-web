<script lang="ts" setup>
import { computed, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routeName = ref(route.name)
const defaultActiveClass = reactive(['font-bold', 'text-[#2D3A2F]'])
watchEffect(() => {
  const { name } = route
  routeName.value = name
})
const tabList = reactive([
  {
    name: 'account-login',
    title: '账号登录',
    x: 200,
    activeClass: defaultActiveClass,
  },
  {
    name: 'msg-login',
    title: '短信登录',
    x: 330,
    activeClass: defaultActiveClass,
  },
])
const activeIndex = computed(() => {
  return tabList.findIndex(item => item.name === routeName.value)
})
// return params
</script>

<template>
  <div
    class="login-layout bg-[#D5FFED] h-screen flex justify-center items-center min-h-[676px] min-w-[1200px]"
  >
    <div
      class="w-[1200px] h-[676px] bg-white rounded-lg grid grid-cols-2 grid-cols-[574px,626px]"
    >
      <div>
        <div
          class="flex justify-between items-center pt-[34px] pr-[50px] pl-[42px]"
        >
          <img src="@/assets/images/logo.png" />
          <router-link
            to="/"
            class="text-[#83867E] font-medium"
            hover="text-[#2D3A2F]"
            active="text-[#2D3A2F]"
          >
            注册
          </router-link>
        </div>
        <div class="pt-[66px]">
          <div class="login-form-title">
            <div class="flex justify-center gap-[66px]">
              <template v-for="(item, index) in tabList" :key="index">
                <router-link
                  class="text-center"
                  :class="
                    activeIndex === index
                      ? `active ${item.activeClass.join(' ')} `
                      : ' text-[#83867E] font-medium'
                  "
                  :to="{ name: item.name }"
                >
                  {{ item.title }}
                </router-link>
              </template>
            </div>
            <div
              class="active-line transition-transform"
              :style="`--tx:${tabList[activeIndex].x}px`"
            ></div>
          </div>
          <div class="login-form flex justify-center pt-[26px]">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!-- <div> -->
      <img src="@/assets/images/login/form-right.png" />
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-layout {
  .login-form-title {
    .active-line {
      // @apply flex;
      width: 40px;
      height: 7px;
      background-image: url('@/assets/images/login/active-line.png');
      transform: translateX(var(--tx));
    }
  }
}
</style>
