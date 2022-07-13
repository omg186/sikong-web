/**
 * 验证手机号
 * @param rule
 * @param value
 * @param callback
 */
export const checkPhoneNumber = (rule, value, callback) => {
  if (value && !/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  }
  // 回调一定不要忘记了
  callback()
}
