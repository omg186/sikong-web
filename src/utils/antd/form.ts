import { regPhone } from '../reg'

/**
 * 验证手机号
 * @param rule
 * @param value
 * @param callback
 */
export const checkPhoneNumber = (rule, value) => {
  if (value && !regPhone.test(value)) {
    return Promise.reject('请输入正确的手机号')
  }
  // 回调一定不要忘记了
  return Promise.resolve()
}
