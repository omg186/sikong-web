<template>
  <Layout>
    <LayoutSider
      class="bg-[#02C160]"
      style="
         {
          min-width: 40px;
        }
      "
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo"></div>

      <Menu
        v-model:selectedKeys="selectedKeys"
        theme="light"
        mode="inline"
        class="bg-[#02C160]"
      >
        <MenuItem name="ss" key="1">
          <user-outlined />
          <span>nav 1</span>
        </MenuItem>
        <MenuItem key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </MenuItem>
        <MenuItem key="3">
          <upload-outlined />
          <span>nav 3</span>
        </MenuItem>
      </Menu>
    </LayoutSider>
    <Layout>
      <LayoutHeader style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </LayoutHeader>
      <LayoutContent
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        <router-view style="height: 820px"></router-view>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import {
  Layout,
  LayoutSider,
  Menu,
  MenuItem,
  LayoutHeader,
  LayoutContent,
} from 'ant-design-vue'
import { ref } from 'vue'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(true)
</script>
