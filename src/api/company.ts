import { defHttp } from '@/utils/http/axios'
import { CompanyProjectResultModel } from './model/company-model'

enum Api {
  GetProjectList = '/getCompanyProjectList',
}

/**
 * @description: Get user menu based on id
 */

export const getCompanyProjectList = () => {
  return defHttp.get<CompanyProjectResultModel[]>({ url: Api.GetProjectList })
}
