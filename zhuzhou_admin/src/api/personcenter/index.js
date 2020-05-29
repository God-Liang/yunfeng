import request from '@/utils/request'

// 修改密码
export function changePass(data) {
  return request({
    url: '/changePass',
    method: 'post',
    data
  })
}

export function modifyUser(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}
