// 身份证
export function checkIdCard(rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) {
    return callback(new Error('证件号码不能为空'))
  } else if (!reg.test(value)) {
    return callback(new Error('证件号码不正确'))
  } else {
    callback()
  }
}

// 整数
export function checkInteger(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  if (!value) {
    return callback(new Error('请填写整数'))
  } else if (!reg.test(value)) {
    return callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

export default {
  phone: { required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' },
  idCard: { required: true, validator: checkIdCard, trigger: 'blur' },
  integer: { required: true, validator: checkInteger, trigger: 'blur' }
}
