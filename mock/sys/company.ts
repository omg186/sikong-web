import { resultSuccess } from '../_util'
import { MockMethod } from 'vite-plugin-mock'

const demoList = (count = 20) => {
  const result = {
    list: [] as any[],
  }
  for (let index = 0; index < count; index++) {
    result.list.push({
      name: `@first`,
      id: index + 1,
    })
  }
  return result.list
}
export default [
  {
    url: '/basic-api/getCompanyProjectList',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword, count } = query
      console.log(keyword)
      return resultSuccess(demoList(count))
    },
  },
] as MockMethod[]
