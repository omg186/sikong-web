<template>
  <div class="p-0 m-auto flex h-[1080px] bg-[#F4F4F4]">
    <div class="sider w-[80px] h-full bg-[#0C191D]">
      <div class="sider-user h-[59px] divide-y-2">
        <div class="bg-green-300 w-[40px] h-40px rounded-60"></div>
      </div>
      <div class="user pt-[10px] mb-[77px]">
        <div class="w-[40px] relative">
          <div
            class="user-circle absolute left-[30px] w-[9.45px] h-[9.45px] aspect-square flex justify-center items-center rounded-full"
            data-v-169b77f9=""
          >
            <div
              class="bg-[#17ef88] h-[5.45px] aspect-square rounded-full"
              data-v-169b77f9=""
            ></div>
          </div>
          <img
            src="../../assets/images/sider/user.jpeg"
            alt=""
            class="user-img"
          />
        </div>
      </div>
      <div class="flex flex-col">
        <div v-for="(item, index) of 4" :key="index" class="h-[66px]">
          <router-link
            to=""
            class="menu-icon w-[46px] h-[46px] p-[10px] flex justify-center cursor-pointer"
          >
            <img :src="getAssetsImages(index)" alt="" />
          </router-link>
        </div>
      </div>
    </div>
    <div class="w-[200px] mr-[1px] bg-[#FCFCFC]"></div>
    <div class="h-full w-full bg-[#F3F3F3]">
      <div class="h-[66px] bg-white"></div>
      <div class="p-[20px] w-full h-[1014px]">
        <div class="bg-white w-full h-[974px]"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { func } from 'vue-types'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(true)
const getAssetsImages = name => {
  return new URL('../../assets/images/sider/' + name + '.png', import.meta.url)
    .href //本地文件路径
}
</script>
<style lang="less" scoped>
.sider {
  background-image: url('../../assets/images/sider/bg-sider.png');
  background-repeat: no-repeat;
  background-position: 50% 80%;
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
  }
}
</style>
