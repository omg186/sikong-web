<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'

import { ConfigProvider } from 'ant-design-vue'
import { useTitle } from './hooks/web/use-title'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import * as echarts from 'echarts'
import { provide } from 'vue'
provide('echarts', echarts)
useTitle()
</script>

<template>
  <!-- <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite1" /> -->
  <ConfigProvider :autoInsertSpaceInButton="false" :locale="zhCN">
    <RouterView></RouterView>
  </ConfigProvider>
</template>

<style>
#app {
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
