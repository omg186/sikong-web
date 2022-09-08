import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Client: AppRouteRecordRaw = {
  path: '/config',
  name: 'Config',
  component: LAYOUT,
  redirect: '/config/index',
  meta: {
    title: '配置首页',
  },
  children: [
    {
      path: 'index',
      name: 'ConfigIndex',
      component: () => import('@/views/config/index.vue'),
      meta: {
        title: '配置首页',
      },
    },
  ],
}

export default Client
