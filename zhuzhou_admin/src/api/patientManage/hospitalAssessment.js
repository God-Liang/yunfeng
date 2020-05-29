import request from '@/utils/request'

// 患者病人列表
export function pageList(query) {
  return request({
    url: `/leaveAssessment/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
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
// 获取单条评估详情
export function readDetail(id) {
  return request({
    url: `/leaveAssessment/detail/${id}`,
    method: 'get',
    params: {}
  })
}
// 麻醉评估
export function save(data) {
  return request({
    url: '/leaveAssessment/assessment',
    method: 'post',
    data: data
  })
}
