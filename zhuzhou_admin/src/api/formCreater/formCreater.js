import axios from 'axios'

// 未处理
export function getAllItem(query) {
  return axios({
    url: '/static/label.json',
    method: 'get',
    params: query
  })
}
// 已处理
export function getItemById(id) {
  return axios({
    url: `/static/label.${id}.json`,
    method: 'get'
  })
}

export function urlGetData(url) {
  return axios({
    url: url,
    method: 'post',
    params: {}
  })
}
