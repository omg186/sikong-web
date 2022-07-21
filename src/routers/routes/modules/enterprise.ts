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
      component: () => import('@/views/enterprise/index.vue'),
      redirect: '/enterprise/org/list',
      meta: {
        title: '组织架构',
        ignoreTransition: true,
      },
      children: [
        {
          path: 'list',
          name: 'EnterpriseOrgList',
          component: () => import('@/views/enterprise/org.vue'),
          meta: {
            title: '组织架构',
            hideTab: true,
            currentActiveMenu: '/enterprise/org',
            ignoreTransition: true,
          },
        },
        {
          path: 'person-detail/:id',
          name: 'EnterpriseOrgPersonDetail',
          component: () => import('@/views/enterprise/person-detail.vue'),
          meta: {
            title: '组织架构',
            hideTab: true,
            currentActiveMenu: '/enterprise/org',
            ignoreTransition: true,
          },
        },
      ],
    },
    {
      path: 'setting',
      name: 'EnterpriseSetting',
      component: () => import('@/views/enterprise/setting/setting.vue'),
      redirect: '/enterprise/setting/list',
      meta: {
        title: '场馆设置',
        ignoreTransition: true,
      },
      children: [
        {
          path: 'list',
          name: 'EnterpriseSettingList',
          component: () => import('@/views/enterprise/setting/list.vue'),
          meta: {
            title: '场馆设置',
            hideTab: true,
            currentActiveMenu: '/enterprise/setting',
          },
        },
      ],
    },
  ],
}

export default Enterprise
