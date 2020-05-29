import request from '@/utils/request'

// 麻醉评估列表
export function pageList(query) {
  return request({
    url: `/anaesthesiaAssessment/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 未处理
export function pending(query) {
  return request({
    url: '/appointment/anesthesia/pending',
    method: 'get',
    params: query
  })
}
// 已处理
export function done(query) {
  return request({
    url: '/appointment/anesthesia/done',
    method: 'get',
    params: query
  })
}

// 麻醉评估
export function save(data) {
  return request({
    url: '/anaesthesiaAssessment/assessment',
    method: 'post',
    data: data
  })
}

// 评估详情
export function getDetail(id) {
  return request({
    url: `/anaesthesiaAssessment/detail/${id}`,
    method: 'get',
    params: {}
  })
}

// 获取单条预约
export function read(id) {
  return request({
    url: `/appointmentRegister/appointment/confirm/${id}`,
    method: 'get',
    params: {}
  })
}

// 根据预约单id获取麻醉评估信息
// export function read(id) {
//   return request({
//     url: '/anaesthesiaAssessment/read/' + id,
//     method: 'get'
//   })
// }
