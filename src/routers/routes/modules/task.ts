import { RoleEnum } from '@/enums/role-enum'
import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Task: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: LAYOUT, // () => import('@/views/task/task.vue'),
  meta: {
    title: '首页',
    roles: [RoleEnum.SUPER, RoleEnum.TEST],
  },
  children: [
    {
      path: '',
      name: 'task',
      component: () => import('@/views/task/task.vue'),
      meta: {
        title: '任务列表',
        roles: [RoleEnum.SUPER, RoleEnum.TEST],
      },
    },
  ],
}

export default Task
