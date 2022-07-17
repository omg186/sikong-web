export interface GetTreeParams {
  title: string
  value: string
  key: string
  type: string
  children?: GetTreeParams[]
}
