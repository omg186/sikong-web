<template>
  <div class="grid grid-cols-2 grid-cols-[644px,auto] min-h-500px h-full">
    <!-- <div class="grid grid-cols-2 min-h-500px"> -->
    <div class="bg-blue-500 aspect-1080/644"></div>
    <div class="bg-white pl-17px pr-50px">
      <p class="flex justify-between pt-41px">
        <img src="@/assets/images/logo2.png" />
        <span>
          已有账号，
          <router-link
            to="/login"
            s:text="primary underline underline-offset-4"
            s:hover="text-primary underline underline-offset-4"
          >
            直接登录
          </router-link>
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
