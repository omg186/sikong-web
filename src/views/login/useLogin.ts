import { LoginParams } from '@/api/model/user-model'
import { useUserStore } from '@/store/modules/user'
import { useRequest } from 'vue-request'

export const useApiLogin = (params: LoginParams) => {
  const userStore = useUserStore()
  const { data, loading, run } = useRequest(() => {
    return userStore.login(params)
  })
  return { data, loading, loginRun: run }
}
