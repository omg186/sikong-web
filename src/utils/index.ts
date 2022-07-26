import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import type { App, Plugin } from 'vue'

import { unref } from 'vue'
import { isObject } from '@/utils/is'
import { Recordable } from '/#/global'
import { TargetContext } from '/#/index'
import { Dayjs } from 'dayjs'
import { Lunar } from 'lunar-typescript'

export const noop = () => {}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {}

  Object.keys(props).map(key => {
    ret[key] = unref((props as Recordable)[key])
  })

  return ret as Partial<U>
}

export function getRawRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map(item => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 获取assets静态资源
export const getAssetsFile = function (url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

export type LunarFormat = 'T' | 'Y' | 'M' | 'm' | 'D' | 'd' | 'YMD'
/**
 * solarToLunar
 * 公立转成农历
 * @param date
 * @param format
 * @param lunarFormat T返回传统的天干地支年份
 * A返回生肖属相
 * Y返回中文的年，如二〇一二
 * y返回英文数字的年，如2012
 * m返回中文的月份，如五
 * M返回传统的月份，如腊月和正月
 * d返回传统的天名称，如初四、十八、卅
 * D返回传统的天名称，但是如果是初一的话，会返回这个月的月份名称，例如四月初一返回的是四月而非初一
 * @returns
 */
export const solarToLunar = function (
  date: Dayjs,
  lunarFormat: LunarFormat = 'YMD'
) {
  const c = `${date.year()}-${date.month() + 1}-${date.date()}`
  const lunar = Lunar.fromDate(new Date(c))

  // console.log('lunar', lunar.getDayInChinese())
  // const lunar = chineseLunar.solarToLunar(new Date(c))
  switch (lunarFormat) {
    case 'D':
      return lunar.getDayInChinese()
    default:
      break
  }
  return '' //chineseLunar.format(lunar, lunarFormat)
}
/**
 * 获取节日
 * @param date 日期
 * @returns
 */
export const getLunarFestivals = (date: Dayjs) => {
  const c = `${date.year()}-${date.month() + 1}-${date.date()}`
  const lunar = Lunar.fromDate(new Date(c))
  const festivals = lunar.getFestivals()
  if (festivals.length > 0) {
    return festivals
  }
  // console.log('lunar', c, lunar.getFestivals())
  return undefined
}
