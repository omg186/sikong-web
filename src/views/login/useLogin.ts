import { LoginParams } from '@/api/model/user-model'
import { useUserStore } from '@/store/modules/user'
import { regPhone } from '@/utils/reg'
import { useIntervalFn } from '@vueuse/core'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { useRequest } from 'vue-request'
export interface SelectItem {
  id: number
  name: string
}
export const useApiLogin = (params: LoginParams) => {
  const userStore = useUserStore()
  const { data, loading, run } = useRequest(() => {
    return userStore.login(params)
  })
  return { data, loading, loginRun: run }
}

export const useDownInterval = () => {
  const time = ref(0)
  const clickCount = ref(0)
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    { immediate: false }
  )
  const start = (num: number, phoneNumber: string) => {
    if (phoneNumber && regPhone.test(phoneNumber)) {
      clickCount.value = clickCount.value + 1
      // 赋值
      time.value = num
      // 调用
      resume()
    } else {
      message.warning('请输入正确的手机号！')
    }
  }
  return { time, clickCount, start }
}
