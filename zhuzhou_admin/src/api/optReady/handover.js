import request from '@/utils/request'

// 患者交接列表详情
export function pageList(query) {
  return request({
    url: `/patientHandOver/page/${query.page}/${query.limit}`,
    method: 'get',
    params: query
  })
}

// 患者交接保存
export function save(data) {
  return request({
    url: '/patientHandOver/save',
    method: 'post',
    data: data
  })
}

// 患者交接单附件保存
export function saveAttach(data) {
  return request({
    url: '/patientHandOver/saveAttach',
    method: 'post',
    data: data
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

// 获取患者交接单附件
export function readAttach(query) {
  return request({
    url: '/patientHandOver/readAttach',
    method: 'get',
    params: query
  })
}

// 获取上传的图片及信息
export function findAttach(appointId) {
  return request({
    url: '/patientHandOver/findAttach',
    method: 'get',
    params: {
      appointId: appointId
    }
  })
}
