<template>
  <div class="account-view">
    <form class="flex flex-col gap-y-[24px]">
      <div>
        <input
          type="text"
          class="input"
          placeholder="请输入账号"
          autocomplete="off"
          name="account"
        />
      </div>
      <div>
        <input
          type="password"
          class="input"
          autocomplete="off"
          placeholder="请输入密码"
          name="password"
        />
      </div>
      <div>
        <div
          class="valid-input input !p-0 flex items-center cursor-pointer min-h-[50px] rounded-[60px]"
        >
          <div
            class="ml-[20px] h-[20px] aspect-square flex justify-center items-center bg-[#C7F7E3] rounded-full animate-pulse"
          >
            <div class="h-[10px] aspect-square bg-[#2FE095] rounded-full"></div>
          </div>
          <div
            class="text absolute translate-x-[-50%] transform text-[#2FE095] text-sm left-1/2"
          >
            点击按钮进行验证
          </div>
        </div>
      </div>
      <div class="pt-[10px]">
        <button class="btn login">登录</button>
      </div>
    </form>
    <div
      class="flex justify-center text-[#E3E4E2] font-medium mt-[36px] hover:text-[#C3CAC6]"
    >
      <router-link to="/"> 忘记密码 </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="less" scoped>
.account-view {
  width: 322px;
  .valid-input {
    @apply flex pl-[15px] relative bg-[#F7FEFB]
    border-radius: 60px;
    border: 1px solid #c7f7e3;
    &:hover,
    &:focus {
      border: 1px solid #9aebc9;
      background: #ddfff0;
    }
  }
}
</style>
