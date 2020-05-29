import request from '@/utils/request'

// 发送验证码
export function sendCode (phone) {
  return request({
    url: `/validate/send/${phone}`,
    method: 'get',
    params: {}
  })
}

// 创建患者信息
export function myCreate (data) {
  return request({
    url: '/wxMy/create',
    method: 'post',
    data: data
  })
}
// 获取患者个人资料-通过id
export function readId (id) {
  return request({
    url: `/wxMy/read/${id}`,
    method: 'get'
  })
}

// 获取患者个人资料-通过openId
export function readOpenId (openId) {
  return request({
    url: `/wxMy/getByOpenId/${openId}`,
    method: 'get'
  })
}

// 更新患者信息
export function myUpdate (data) {
  return request({
    url: '/wxMy/update',
    method: 'post',
    data: data
  })
}

// 创建患者病历
export function myCreateMedicalRecord (data) {
  return request({
    url: '/wxMy/createMedicalRecord',
    method: 'post',
    data: data
  })
}
// 通过病历id获取病历信息
export function getMedicalRecord (id) {
  return request({
    url: `/wxMy/getMedicalRecord/${id}`,
    method: 'get'
  })
}
// 更新患者病历
export function myUpdateMedicalRecord (data) {
  return request({
    url: '/wxMy/updateMedicalRecord',
    method: 'post',
    data: data
  })
}

// 获取科室列表
export function getDepartmentList () {
  return request({
    url: '/hospitalDepartment/All',
    method: 'get'
  })
}

// 获取医院列表
export function getHospitalList (params) {
  return request({
    url: '/hospital/hospitalList',
    method: 'get',
    params: params
  })
}

export function getDepartmentLists (params) {
  return request({
    url: '/wxMy/getDepartmentList',
    method: 'get',
    params: params
  })
}

export function getCaseList (id, params) {
  return request({
    url: `/wxMy/getCaseList/${id}`,
    method: 'get',
    params: params
  })
}

// 获取微信信息
export function getUserWxInfo (params) {
  return request({
    url: `/jeewx/getUserWxInfo`,
    method: 'get',
    params: params
  })
}
