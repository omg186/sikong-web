import { resultSuccess } from 'mock/_util'
import { MockMethod } from 'vite-plugin-mock'
import { Recordable } from '/#/global'

const demoTreeList = keyword => {
  const result = {
    list: [] as Recordable[],
  }
  //   for (let index = 0; index < 5; index++) {
  const children: Recordable[] = []
  children.push({
    title: `技术部`,
    type: 'BM',
    value: `${1}-${1}`,
    lev: `${2}`,
  })
  children.push({
    title: `中海店`,
    type: 'BM',
    value: `${1}-${2}`,
    lev: `${2}`,
  })

  children.push({
    title: `运营组`,
    type: 'XZ',
    value: `${1}-${3}`,
    lev: `${2}`,
  })
  children.push({
    title: `前端创新组`,
    type: 'XZ',
    value: `${1}-${4}`,
    lev: `${2}`,
  })
  result.list.push({
    title: `北京白狐狸科技`,
    type: 'GS',
    value: `${1}`,
    lev: `${1}`,
    children,
  })
  //   }
  return result.list
}

export default [
  {
    url: '/basic-api/org/getTree',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword } = query
      console.log(keyword)
      return resultSuccess(demoTreeList(keyword))
    },
  },
] as MockMethod[]
