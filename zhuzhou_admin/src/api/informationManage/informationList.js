import request from '@/utils/request'

// 短信列表
export function list(query) {
  return request({
    url: `/msgRecord/mypage/${query.page}/${query.limit}`,
    method: 'get',
    params: {
      readStatus: query.readStatus
    }
  })
}
// 短信列表
export function dispose(data) {
  return request({
    url: '/msgRecord/updateIsRead',
    method: 'post',
    data
  })
}

// 未读短信列表
export function unreadList() {
  return request({
    url: '/msgRecord/mylist',
    method: 'get',
    params: {
      readStatus: 0
    }
  })
}
