import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const MyEvaluation: AppRouteRecordRaw = {
  path: '/my-evaluation',
  name: 'MyEvaluation',
  component: LAYOUT,
  redirect: '/my-evaluation/implement/list',
  meta: { title: '测评' },
  children: [
    {
      path: 'implement',
      name: 'MyEvaluationImplement',
      component: () => import('@/views/evaluation/my/implement/index.vue'),
      meta: { title: '测评执行管理' },
      children: [
        {
          path: 'list',
          name: 'MyEvaluationImplementList',
          component: () => import('@/views/evaluation/my/implement/list.vue'),
          meta: { title: '测评列表' },
        },
        {
          path: 'calendar',
          name: 'MyEvaluationImplementCalendar',
          component: () =>
            import('@/views/evaluation/my/implement/calendar.vue'),
          meta: { title: '测评日历' },
        },
        {
          path: 'agency',
          name: 'MyEvaluationAgency',
          component: () => import('@/views/evaluation/my/implement/agency.vue'),
          meta: { title: '待处理事项', ignoreTab: true },
        },
      ],
    },

    {
      path: 'booking',
      name: 'MyEvaluationBooking',
      component: () => import('@/views/evaluation/my/booking/index.vue'),
      meta: { title: '测评预约管理' },
    },
  ],
}
export default MyEvaluation
