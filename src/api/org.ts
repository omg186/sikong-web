import { defHttp } from '@/utils/http/axios'
import { GetTreeParams } from './model/org-model'

enum Api {
  getTree = '/org/getTree',
}
/**
 * @description: getOrgTree
 */
export function getOrgTreeApi(keyword?: string) {
  return defHttp.get<GetTreeParams[]>(
    { url: Api.getTree, params: { keyword } },
    { errorMessageMode: 'none' }
  )
}
