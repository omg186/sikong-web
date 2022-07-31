import { LAYOUT } from '@/routers/constant'
import { AppRouteRecordRaw } from '@/routers/types'

export const Evaluation: AppRouteRecordRaw = {
  path: '/evaluation',
  name: 'Evaluation',
  component: LAYOUT,
  redirect: '/evaluation/center',
  meta: { title: '测评管理' },
  children: [
    {
      path: 'center',
      name: 'EvaluationCenter',
      component: () => import('@/views/evaluation/center/index.vue'),
      meta: { title: '测评中心' },
    },

    {
      path: 'project',
      name: 'EvaluationProject',
      component: () => import('@/views/evaluation/project/index.vue'),
      meta: { title: '测评项目' },
    },
    {
      path: 'body',
      name: 'EvaluationBody',
      component: () => import('@/views/evaluation/body/index.vue'),
      meta: { title: '身体素质和运动' },
    },
  ],
}
export default Evaluation
