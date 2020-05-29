import request from '@/utils/request'

// 查询某一条
export function list (params) {
  const param = Object.assign({}, params)
  delete param.current
  delete param.pageSize
  delete param.patientId
  return request({
    url: `/wxFollowupRecord/getFollowupRecord/${params.current}/${params.pageSize}/${params.patientId}`,
    method: 'get',
    params: param
  })
}

// 保存结果
export function lgSave (data) {
  return request({
    url: '/patientForm/UpdatePatientForm',
    method: 'post',
    data
  })
}

// 修改已读
export function updataRead (id) {
  return request({
    url: `AppPlanNodeItem/UpdateRead/${id}`,
    method: 'get',
    params: {}
  })
}
