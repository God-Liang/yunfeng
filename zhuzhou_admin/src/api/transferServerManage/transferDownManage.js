import request from '@/utils/request'

// 下转管理列表
export function list(query) {
  return request({
    url: `/transfer/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      startDate: query.startDate,
      endDate: query.endDate,
      patientName: query.patientName,
      status: query.status,
      selType: 'xzgl',
      type: 2
    }
  })
}
