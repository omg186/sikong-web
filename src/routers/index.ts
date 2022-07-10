import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { basicRoutes } from './routes'

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)
console.log(basicRoutes)
// 工厂函数来创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
})

export default router
