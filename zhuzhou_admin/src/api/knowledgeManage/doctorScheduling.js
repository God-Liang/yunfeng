import request from '@/utils/request'

// 获取医生排班信息
export function pending(query) {
  return request({
    url: '/doctorSchedule/doctorSchedule',
    method: 'get',
    params: query
  })
}

// 新建/编辑表单提交
export function postForm(query) {
  return request({
    url: '/user/save',
    method: 'post',
    data: query
  })
}

// 增加排班信息
export function update(query) {
  return request({
    url: `/doctorSchedule/update`,
    method: 'post',
    data: query
  })
}

// 更新排班信息
export function create(query) {
  return request({
    url: `/doctorSchedule/create`,
    method: 'post',
    data: query
  })
}

// 根据时间段获取医生排班信息(术前确认使用)
export function doctorScheduleSelect(query) {
  return request({
    url: `/doctorSchedule/DoctorScheduleSelect`,
    method: 'get',
    params: query
  })
}

// 获取排班信息
export function read(id) {
  return request({
    url: `/doctorSchedule/read/${id}`,
    method: 'get'
  })
}

// 获取排班信息
export function useLastWeekSchedule(query) {
  return request({
    url: '/doctorSchedule/useLastWeekSchedule',
    method: 'get',
    params: query
  })
}
