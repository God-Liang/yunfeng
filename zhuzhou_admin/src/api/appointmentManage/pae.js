import request from '@/utils/request'

// 宣教列表
export function pageList(query) {
  return request({
    url: `/inHospEdu/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 根据id获取一条入院宣教信息
export function read(id) {
  return request({
    url: `/appointmentRegister/appointment/confirm/${id}`,
    method: 'get',
    params: {}
  })
}

// 根据手术id获取宣教类型及宣教内容
export function readEdu(id) {
  return request({
    url: `/operation/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 保存宣教
export function save(data) {
  return request({
    url: '/inHospEdu/update',
    method: 'post',
    data: data
  })
}

// 查询设置宣教
export function readEduDetail(id) {
  return request({
    url: `inHospEdu/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 根据预约id获取一条入院前宣教信息/宣教记录
export function eduRecord(query) {
  return request({
    url: `/eduRecord/page/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      appointId: query.appointId
    }
  })
}

