import request from '@/utils/request'

// 列表
export function pageList(query) {
  return request({
    url: `/appointmentRegister/confirmPage/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 获取单条预约
export function read(id) {
  return request({
    url: `/appointmentRegister/appointment/confirm/${id}`,
    method: 'get',
    params: {}
  })
}

// 预约确认保存及修改
export function save(data) {
  return request({
    url: '/appointmentRegister/appointment/confirm',
    method: 'post',
    data
  })
}

// 平台预约列表
export function pageListPlatform(query, current, pageSize) {
  query.source = 1
  return request({
    url: '/appointment/page/' + current + '/' + pageSize,
    method: 'get',
    params: query
  })
}

// 登记预约  获取医生
export function getDoctorList() {
  return request({
    url: '/appointment/appointment/getDoctorList',
    method: 'get'
  })
}

// 根据医生拿到该医生下的手术
export function getSurgeryList(query) {
  return request({
    url: '/appointment/appointment/getSurgeryList',
    method: 'get',
    params: query
  })
}

// 预约登记
export function create(data) {
  return request({
    url: '/appointment/create',
    method: 'post',
    data: data
  })
}

// 预约确认
export function confirm(data) {
  return request({
    url: '/appointment/confirm',
    method: 'post',
    data: data
  })
}

// 退出日间
export function cancel(query) {
  return request({
    url: '/appointment/cancel',
    method: 'post',
    params: query
  })
}

// 预约处理
export function deal(params, type, id) {
  return request({
    url: '/appointment/deal/' + type + '/' + id,
    method: 'post',
    params: params
  })
}

// 根据就诊卡号获取病人信息
export function getPatientByMedicare(medicare) {
  return request({
    url: '/appointment/patientByMedicare/' + medicare,
    method: 'get'
  })
}

// 获取单条预约(预约确认用)
export function readConfirm(id) {
  return request({
    url: '/appointment/readConfirm/' + id,
    method: 'get'
  })
}

// 重定向预约登记
export function optApply(query) {
  return request({
    url: '/yiMi/optApply',
    method: 'get',
    params: query
  })
}

// 根据就诊号获取患者信息
export function getPatientBaseInfo(visitId) {
  return request({
    url: '/his/getPatientBaseInfo',
    method: 'get',
    params: {
      visitId: visitId
    }
  })
}

// 根据医生获取排班列表
export function getDoctorScheduleSelect(doctorId) {
  return request({
    url: '/doctorSchedule/select',
    method: 'get',
    params: {
      doctorId: doctorId
    }
  })
}

// 根据医生获取排班列表
export function getOptNum(query) {
  return request({
    url: '/appointmentRegister/appointment/optNum',
    method: 'get',
    params: query
  })
}
