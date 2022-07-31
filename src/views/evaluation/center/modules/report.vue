<template>
  <div class="r-body">
    <div class="text-light-50 text-center">
      <div class="text-32px font-bold pt-36px pb-10px">
        白河狸少儿体适能发展测评
      </div>
      <div class="text-16px font-medium">(幼儿版)</div>
    </div>
    <div class="text-light-50 mt-11px px-30px">
      <div class="flex items-center">
        <img
          src="@/assets/images/avatar-boy.png"
          class="w-34px h-34px rounded-40"
        />
        <span class="text-sm ml-10px font-medium">李睿曦（男·5岁11月）</span>
        <span class="ml-200px text-xs">测试时间：2022.3.25</span>
      </div>
      <div class="text-center"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Avatar } from 'ant-design-vue'
</script>
<style lang="less">
.r-body {
  @apply h-859px w-full;
  background: url('@/assets/images/evaluation/ligthning.png') no-repeat top
      right,
    linear-gradient(to right, #3bd89c, #02fd7c);
}
</style>
