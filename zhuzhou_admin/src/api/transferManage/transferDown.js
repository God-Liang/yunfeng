import request from '@/utils/request'

// 下转接收列表
export function list(query) {
  return request({
    url: `/transfer/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      startDate: query.startDate,
      endDate: query.endDate,
      patientName: query.patientName,
      status: query.status,
      selType: 'xzjs',
      type: 2
    }
  })
}
// 转诊状态
export function statusDispose(data) {
  return request({
    url: '/transfer/update',
    method: 'post',
    data
  })
}
// 查看病例
export function look(query) {
  return request({
    url: '/transfer/findMedicalFile',
    method: 'get',
    params: query
  })
}
