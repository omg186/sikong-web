export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T> {
  items: T[]
  total: number
}

/**
 * @description: Request list interface parameters
 */
export type DemoParams = BasicPageParams

export interface DemoListItem {
  id: string
  beginTime: string
  endTime: string
  address: string
  name: string
  no: number
  status: number
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>
