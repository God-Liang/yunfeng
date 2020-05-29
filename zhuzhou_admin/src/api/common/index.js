import request from '@/utils/request'

// 获取宣教类型  参数  id 手术id 类型
// 传入类型  报到 还是 离院
export function getPAEType(query) {
  return request({
    url: '/common/pae/getPAEType',
    method: 'get',
    data: query
  })
}
// 获取宣教内容
// 参数  id 手术id 宣教类型
export function getPAEContent(query) {
  return request({
    url: '/common/pae/getPAEContent',
    method: 'get',
    data: query
  })
}
// 发送短信
export function sendMessage(query) {
  return request({
    url: '/common/pae/sendMessage',
    method: 'post',
    data: query
  })
}
// 发送宣教
export function sendPAEContent(query) {
  return request({
    url: '/common/pae/sendPAEContent',
    method: 'get',
    data: query
  })
}
