/**
 * 转诊管理
 */
import request from '@/utils/request'

// 患者登记
export function register(data) {
  return request({
    url: '/transfer/create',
    method: 'post',
    data
  })
}

// 上转机构
export function mySignHospital(query) {
  return request({
    url: '/transferTeratment/mySignHospital',
    method: 'get',
    params: query
  })
}

// 编辑
export function redact(query) {
  return request({
    url: `/transfer/read/${query.id}`,
    method: 'get',
    params: {}
  })
}

// 出院评估-转诊病人
export function create(query) {
  return request({
    url: `/transfer/create`,
    method: 'post',
    data: query
  })
}

// 获取医院对应的医生
export function getDoctor(id) {
  return request({
    url: `/user/getListByHospitalId/${id}`,
    method: 'get',
    params: {}
  })
}
