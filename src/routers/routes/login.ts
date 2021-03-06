import { AppRouteRecordRaw } from '@/routers/types'

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login.vue'),
  meta: {
    title: '登录',
  },
  children: [
    {
      path: '',
      name: 'account-login',
      component: () => import('@/views/login/account-login.vue'),
      meta: { title: '账号登录' },
    },
    {
      path: 'msg',
      name: 'msg-login',
      component: () => import('@/views/login/msg-login.vue'),
      meta: { title: '短信登录' },
    },
  ],
}
export const RegisterRoute: AppRouteRecordRaw = {
  path: '/register',
  name: 'register',
  component: () => import('@/views/login/register.vue'),
  meta: {
    title: '注册',
    ignoreAuth: true,
  },
}
