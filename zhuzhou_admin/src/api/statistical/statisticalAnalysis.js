import request from '@/utils/request'

// 费用统计
export function cost(query) {
  return request({
    url: '/statistics/cost',
    method: 'get',
    params: query
  })
}

// 患者平均住院时间统计
export function averageInHospTime(query) {
  return request({
    url: '/statistics/averageInHospTime',
    method: 'get',
    params: query
  })
}

// 按病种统计日间手术台次
export function surgeryCount(query) {
  return request({
    url: '/statistics/surgeryCount',
    method: 'get',
    params: query
  })
}

// 患者床位使用率
export function bedUseRate(query) {
  return request({
    url: '/statistics/bedUseRate',
    method: 'get',
    params: query
  })
}

// 费用统计列表
export function getPage(query) {
  return request({
    url: `/statistics/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      departmentId: query.departmentId,
      operationId: query.operationId,
      costType: query.costType,
      inHospNo: query.inHospNo,
      dateType: query.dateType,
      startTime: query.startTime,
      endTime: query.endTime
    }
  })
}

// 平均住院时长、手术台次
export function aveInHospTime(query) {
  return request({
    url: '/statistics/aveInHospTime',
    method: 'get',
    params: query
  })
}

// 详细
export function getCostDetail(query) {
  return request({
    url: '/statistics/getCostDetail',
    method: 'get',
    params: query
  })
}
