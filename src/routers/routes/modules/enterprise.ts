import { RoleEnum } from '@/enums/role-enum'
import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Task: AppRouteRecordRaw = {
  path: '/enterprise',
  name: 'enterprise',
  component: LAYOUT, // () => import('@/views/task/task.vue'),
  meta: {
    title: '企业管理',
  },
  children: [
    {
      path: 'info',
      name: 'enterprise-info',
      component: () => import('@/views/enterprise/info.vue'),
      meta: {
        title: '企业信息',
      },
    },
    {
      path: 'org',
      name: 'enterprise-org',
      component: () => import('@/views/enterprise/org.vue'),
      meta: {
        title: '组织架构',
      },
    },
  ],
}

export default Task
