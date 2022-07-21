<template>
  <div
    class="h-100px w-full flex-shrink-0 flex items-center gap-20px px-20px bg-black"
  >
    <img
      style="background-color: #87d068"
      class="w-58px h-58px rounded-full"
      :src="userInfo.avatar"
    />
    <div class="text-white font-bold">
      {{ userInfo.realName }}
      <span class="ml-10px">[{{ route.meta?.title }}]</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/store/modules/user'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
const route = useRoute()
</script>
