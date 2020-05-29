import request from '@/utils/request'

export function consummate(data) {
  return request({
    url: '/AdminPatient/consummate',
    method: 'post',
    data
  })
}
