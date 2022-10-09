import { Menu } from '@/routers/types'

export const leftMenus: Menu[] = [
  {
    name: '我的测评',
    path: '/my-evaluation',
    icon: 'sider/0.png',
    iconHover: 'sider/0-hover.png',
    iconActive: 'sider/0-active.png',
  },
  {
    name: '我的客户',
    path: '/client',
    icon: 'sider/1.png',
    iconHover: 'sider/1-hover.png',
    iconActive: 'sider/1-active.png',
  },
  // {
  //   name: '配置管理',
  //   path: '/config',
  //   icon: 'sider/2.png',
  //   iconHover: 'sider/2-hover.png',
  //   iconActive: 'sider/2-active.png',
  // },
  {
    name: '测评管理',
    path: '/evaluation',
    icon: 'sider/3.png',
    iconHover: 'sider/3-hover.png',
    iconActive: 'sider/3-active.png',
  },
  {
    name: '企业管理',
    path: '/enterprise',
    icon: 'sider/4.png',
    iconHover: 'sider/4-hover.png',
    iconActive: 'sider/4-active.png',
  },
]
