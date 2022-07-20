import qs from 'qs'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { basicRoutes } from './routes'

// 白名单应该包含基本静态路由
export const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)
console.log(basicRoutes, WHITE_NAME_LIST)
// 工厂函数来创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 其他配置...
  //@ts-ignore
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
})
// reset router
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
