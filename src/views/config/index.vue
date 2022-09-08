<template>
  <div>
    <div class="flex gap-30px p-30px">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="config-item min-w-320px min-h-164px px-30px py-26px bg-white cursor-pointer fill-[#A5A8B4]"
        s:border="rounded-16px 3px solid [#D4F5DE]"
        s:hover=" text-white fill-white"
      >
        <div class="flex gap-10px items-center justify-between" s:font="bold">
          <span>{{ item.title }}</span>
          <SvgIcon
            name="down"
            class="w-10px h-6px transform rotate-270"
          ></SvgIcon>
        </div>
        <div class="w-193px pt-17px" s:text="xs $text-color">
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import SvgIcon from '../../components/SvgIcon.vue'

const data = ref([
  {
    title: '测评管理',
    desc: '根据系统内置的模板，轻松定制门店需要的各类型发展测评，并提供精美报告',
  },
  {
    title: '企业管理',
    desc: '企业架构设置，人员，场地和经营时间，系统权限与功能设置',
  },
  {
    title: '客户管理',
    desc: '维护客户数据字段，设置字段字典，使用户数据更贴近实际应用场景',
  },
])
</script>

<style lang="scss" scoped>
.config-item {
  background-image: url('@/assets/images/bg-config.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  --text-color: #83867e;
  &:hover {
    --text-color: white;
    background: linear-gradient(90deg, #02fd7c 0%, #3bd89c 100%);
    box-shadow: 0px 12px 36px 0px rgba(47, 224, 149, 0.4);
  }
  &:active {
    background: linear-gradient(90deg, #02fd7c 0%, #3bd89c 100%);
  }
}
</style>
