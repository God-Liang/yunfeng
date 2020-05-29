import request from '@/utils/request'

// 我的签约机构列表
export function list(query) {
  return request({
    url: `/transferTeratment/mySignedHos/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      keyword: query.keyword,
      signedStatus: query.signedStatus,
      signType: query.signType
    }
  })
}
// 解除关系
export function relieve(query) {
  return request({
    url: `/transferTeratment/cancelMySignedRel/${query.signHosId}`,
    method: 'post',
    data: query
  })
}
// 申请签约
export function apply(data) {
  return request({
    url: '/transferTeratment/applySign/',
    method: 'post',
    data
  })
}
// 医院信息列表
export function hospitalList(query) {
  return request({
    url: '/transferTeratment/signHospital',
    method: 'get',
    params: query
  })
}

