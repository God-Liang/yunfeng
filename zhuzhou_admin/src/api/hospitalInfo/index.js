import request from '@/utils/request'

// 我的签约机构详情列表
export function details(signHosId) {
  return request({
    url: `/transferTeratment/mySignedHos/read/${signHosId}`,
    method: 'get',
    params: {}
  })
}

// 我的机构详情信息
export function myDetails() {
  return request({
    url: `/hospitalInfo/readMyHospital`,
    method: 'get',
    params: {}
  })
}

// 是否可以修改
export function ifEdit(params) {
  return request({
    url: '/user/isHospitalAdmin',
    method: 'get',
    params: params
  })
}
