import request from '@/utils/request'

// 医生审核列表
export function list(query) {
  return request({
    url: `/transfer/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      startDate: query.startDate,
      endDate: query.endDate,
      patientName: query.patientName,
      status: query.status,
      selType: 'yssh',
      type: 1
    }
  })
}
// 医生审核状态
export function statusDispose(data) {
  return request({
    url: '/transfer/update',
    method: 'post',
    data
  })
}
