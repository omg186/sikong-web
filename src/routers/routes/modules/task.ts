import { RoleEnum } from '@/enums/role-enum'
import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Task: AppRouteRecordRaw = {
  path: '/task',
  name: 'Task',
  component: LAYOUT,
  redirect: '/task/info',
  meta: {
    title: '任务',
  },
  children: [
    {
      path: 'info',
      name: 'TaskInfo',
      component: () => import('@/views/task/task.vue'),
      meta: {
        title: '任务列表',
      },
    },
  ],
}

export default Task
