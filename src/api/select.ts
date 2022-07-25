import { defHttp } from '@/utils/http/axios'
import { DemoListGetResultModel, DemoParams } from './model/baseModel'
import { DemoOptionsItem, selectParams } from './model/optionsModel'
enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
  DEMO_LIST = '/table/getDemoList',
}

/**
 * @description: Get sample options value
 */
export const getOptionsListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params })

export const getDemoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  })
