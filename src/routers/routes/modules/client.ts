import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Client: AppRouteRecordRaw = {
  path: '/client',
  name: 'Client',
  component: LAYOUT,
  redirect: '/client/potential',
  meta: {
    title: '我的客户',
  },
  children: [
    {
      path: 'potential',
      name: 'ClientPotential',
      component: () => import('@/views/client/potential/list.vue'),
      meta: {
        title: '意向客户',
      },
    },
    {
      path: 'official',
      name: 'ClientOfficial',
      component: () => import('@/views/client/official/list.vue'),
      meta: {
        title: '正式客户',
      },
    },
  ],
}

export default Client
