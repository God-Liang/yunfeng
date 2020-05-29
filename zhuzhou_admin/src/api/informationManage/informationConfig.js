import request from '@/utils/request'

// 配置列表
export function list() {
  return request({
    url: '/settings/list',
    method: 'get',
    params: {
      types: ['msg_sign', 'msg_tranfer_treatment']
    }
  })
}
// 更换
export function renewal(data) {
  return request({
    url: '/settings/changeSettings',
    method: 'post',
    data
  })
}
