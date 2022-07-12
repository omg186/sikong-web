import { RoleEnum } from '@/enums/role-enum'
import { AppRouteRecordRaw } from '@/routers/types'

export const Task: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: () => import('@/views/task/task.vue'),
  meta: {
    title: '任务',
    roles: [RoleEnum.SUPER, RoleEnum.TEST],
  },
}

export default Task
