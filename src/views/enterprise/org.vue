<template>
  <div class="enterprise-org">
    <div
      class="h-100px w-full flex items-center gap-20px px-20px bg-black bg-opacity-10"
    >
      <Avatar
        style="background-color: #87d068"
        class="w-58px h-58px"
        :src="userInfo.avatar"
      >
      </Avatar>
      <div class="text-white font-bold">
        {{ userInfo.realName }} <span class="ml-10px">[组织架构]</span>
      </div>
    </div>
    <div class="flex">
      <div class="h-full w-280px flex-shrink-0 px-20px">
        <div class="mt-20px h-60px flex items-center justify-between">
          <Input class="w-200px h-full rounded-60" placeholder="搜索员工或部门">
            <template #prefix> icon </template>
          </Input>
          <Popover placement="bottom">
            <template #title> </template>
            <template #content>
              <div class="cursor-pointer">
                <p class="text-gray-300 cursor-not-allowed">添加员工</p>
                <p>添加部门</p>
              </div>
            </template>
            <img
              src="@/assets/images/add-icon.png"
              class="h-18px aspect-square cursor-pointer"
            />
          </Popover>
        </div>
        <div class="pt-33px pl-10px">
          <Tree />
        </div>
      </div>
      <div class="h-full"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Avatar, Input, Popover } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { computed } from 'vue'
import Tree from './modules/tree.vue'
const userStore = useUserStore()
const userInfo = computed(() => userStore.getUserInfo)
</script>
