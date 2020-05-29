import request from '@/utils/request'

export function info(id) {
  return request({
    url: `/adminDoctor/doctorCertified/${id}`,
    method: 'get'
  })
}
export function refuse(param) {
  return request({
    url: `/adminDoctor/reason/${param.id}/${param.reason}`,
    method: 'get',
    params: {}
  })
}
export function update(data) {
  return request({
    url: `/adminDoctor/createOrUpdate`,
    method: 'post',
    data: data
  })
}
// 设置名医
export function famousDoctor(data) {
  return request({
    url: `/adminDoctor/famousDoctor/${data.id}/${data.type}`,
    method: 'get',
    params: {}
  })
}

// 查询医生所在的团队列表
export function list(params) {
  const param = Object.assign({}, params)
  delete param.current
  delete param.pageSize
  return request({
    url: `/followupTeam/DoctorTeamPage/${params.current}/${params.pageSize}`,
    method: 'get',
    params: param
  })
}

// 获取方案详情
export function getSolutionInfo(id) {
  return request({
    url: `/followupSolution/descById/${id}`,
    method: 'get',
    params: {}
  })
}
