<template>
  <div class="p-0 m-auto flex h-[1080px] bg-[#F4F4F4]">
    <div class="sider w-[80px] h-full bg-[#0C191D]">
      <div class="sider-user h-[59px] divide-y-2">
        <div class="bg-green-300 w-[40px] h-40px rounded-60"></div>
      </div>
      <div class="pt-[10px]">
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
          <img src="../../assets/images/user.jpeg" alt="" class="user-img" />
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
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(true)
</script>
<style lang="less" scoped>
.sider {
  background-image: url('../../assets/images/bg-sider.png');
  background-repeat: no-repeat;
  background-position: 50% 80%;
  padding: 22px 17px 25px;
  .sider-user {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .user-circle {
    background: #165542;
  }
  .user-img {
    @apply rounded-1/2 border-2;
    box-shadow: 0px 2px 15px 1px rgba(50, 57, 65, 0.16);
    opacity: 1;
    border: 2px solid rgba(47, 224, 149, 0.3);
    &:hover {
      box-shadow: 0px 2px 15px 1px rgba(50, 57, 65, 0.16);
      opacity: 1;
      border: 2px solid rgba(47, 224, 149, 0.5);
    }
    &:hover + .user-circle {
      background: red;
    }
    &:active {
      box-shadow: 0px 2px 15px 1px rgba(50, 57, 65, 0.16);
      opacity: 1;
      border: 2px solid rgba(47, 224, 149, 0.1);
    }
  }
}
</style>
