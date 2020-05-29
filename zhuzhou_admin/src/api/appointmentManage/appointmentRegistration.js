import request from '@/utils/request'

// 列表
export function pageList(query) {
  return request({
    url: `/appointmentRegister/registerPage/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 退出日间
export function cancel(query) {
  return request({
    url: '/appointment/cancel',
    method: 'post',
    params: query
  })
}

// 获取单条预约信息
export function read(id) {
  return request({
    url: `/appointmentRegister/appointment/${id}`,
    method: 'get',
    params: {}
  })
}

// 预约登记保存及修改
export function save(data) {
  return request({
    url: '/appointmentRegister/appointment/createOrUpdate',
    method: 'post',
    data
  })
}

// 重新预约
export function againRegister(data) {
  return request({
    url: '/appointmentRegister/appointment/againRegister',
    method: 'post',
    data
  })
}

// 手术室列表
export function pending(query) {
  return request({
    url: `/optRoom/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      optRoomType: query.optRoomType,
      keywords: query.keywords
    }
  })
}
