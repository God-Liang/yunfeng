import request from '@/utils/request'

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

// 术前确认列表
export function pageList(query) {
  return request({
    url: `/beforeOptConfirm/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 术前确认
export function saveSurgery(data) {
  return request({
    url: '/beforeOptConfirm/save',
    method: 'post',
    data: data
  })
}

// 根据预约id获取一条术前确认信息
export function read(id, query) {
  return request({
    url: '/beforeOptConfirm/read/' + id,
    method: 'get',
    params: query
  })
}

// 根据预约id获取一条术前确认信息(附加信息)
export function readWithAddOn(id, query) {
  return request({
    url: '/beforeOptConfirm/readWithAddOn/' + id,
    method: 'get',
    params: query
  })
}

// 病区
export function areaList() {
  return request({
    url: '/department/areaList',
    method: 'get',
    params: {}
  })
}

// 通过手术时间和手术日期获取所有手术间
export function findOptRoom(query) {
  return request({
    url: '/optRoom/findOptRoom',
    method: 'get',
    params: query
  })
}

// 通过医生id和手术日期获取手术排班
export function getDoctorScheduleOperation(query) {
  return request({
    url: '/doctorScheduleOperation/find',
    method: 'get',
    params: query
  })
}

// 通过医生id和手术日期获取手术排班
export function getWardList(areaId) {
  return request({
    url: '/ward/list',
    method: 'get',
    params: {
      areaId: areaId
    }
  })
}

// 获取所有病床
export function getFindOperationBed(query) {
  return request({
    url: '/bed/findOperationBed',
    method: 'get',
    params: query
  })
}

// 获取术前详情
export function getBeforeOptConfirmRel(appointId) {
  return request({
    url: '/beforeOptConfirmRel/find',
    method: 'get',
    params: {
      appointId: appointId
    }
  })
}
