import { RoleEnum } from '@/enums/role-enum'
import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Enterprise: AppRouteRecordRaw = {
  path: '/enterprise',
  name: 'Enterprise',
  component: LAYOUT,
  redirect: '/enterprise/info',
  meta: {
    title: '企业管理',
  },
  children: [
    {
      path: 'info',
      name: 'EnterpriseInfo',
      component: () => import('@/views/enterprise/info.vue'),
      meta: {
        title: '企业信息',
      },
    },
    {
      path: 'org',
      name: 'EnterpriseOrg',
      component: () => import('@/views/enterprise/org.vue'),
      meta: {
        title: '组织架构',
      },
    },
  ],
}

export default Enterprise
