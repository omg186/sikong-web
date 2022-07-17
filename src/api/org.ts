import { defHttp } from '@/utils/http/axios'
import { GetTreeParams } from './model/org-model'

enum Api {
  getTree = '/org/getTree',
}
/**
 * @description: getOrgTree
 */
export function getOrgTreeApi() {
  return defHttp.get<GetTreeParams[]>(
    { url: Api.getTree },
    { errorMessageMode: 'none' }
  )
}
