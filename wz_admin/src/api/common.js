import request from '@/utils/request'

/**
 * @param { String } port 接口名称
 * @param { Object } params 接口参数(get请求)
 * @param { Object } data 接口参数(post请求)
 * @param { Number } id 某条数据ID
 * import { list, create, remove, update, read } from '@/api/common' 快捷引入方法
 */

// 查询数据
export function list(port, params) {
  const param = {
    ...params
  }
  param['input.current_page'] = param.current
  param['input.per_page'] = param.pageSize
  delete param.current
  delete param.pageSize
  return request({
    url: `/${port}/list`,
    method: 'get',
    params: param
  })
}
// 新增数据
export function getList(port, data) {
  return request({
    url: `/${port}/list`,
    method: 'post',
    data
  })
}
// 设置客户权限
export function doSome(data) {
  return request({
    url: `/unitPower/doSome`,
    method: 'post',
    data
  })
}
// 新增数据
export function create(port, data) {
  return request({
    url: `/${port}/create`,
    method: 'post',
    data
  })
}

// 删除数据
export function remove(port, id) {
  return request({
    url: `/${port}/delete/${id}`,
    method: 'post'
  })
}

// 更新数据
export function update(port, data) {
  return request({
    url: `/${port}/update`,
    method: 'post',
    data
  })
}

// 查询某一条
export function read(port, id) {
  return request({
    url: `/${port}/read/${id}`,
    method: 'get',
    params: {}
  })
}

// 字典
export function category(category) {
  const param = {
    'input.category_type': category
  }
  return request({
    url: `/category`,
    method: 'get',
    params: param
  })
}

// 详情
export function info(port, params) {
  return request({
    url: `/${port}/info`,
    method: 'get',
    params: params
  })
}

// 订单确认
export function sure(data) {
  return request({
    url: `/order/sure`,
    method: 'post',
    data
  })
}

export function save(port, data) {
  return request({
    url: `/${port}/save`,
    method: 'post',
    data
  })
}

export function deleted(port, data) {
  return request({
    url: `/${port}/delete`,
    method: 'delete',
    data: data
  })
}

export function cancel(port, data) {
  return request({
    url: `/${port}/cancel`,
    method: 'post',
    data
  })
}
// 所有消息标记已读
export function msgReadAll() {
  return request({
    url: '/msg/readAll',
    method: 'post',
    data: {}
  })
}
// 保存授权书关系
export function saveContac(data) {
  return request({
    url: '/empower_detail/create',
    method: 'post',
    data
  })
}

// 获取图形详情
export function index(port, params) {
  return request({
    url: `/index/${port}`,
    method: 'get',
    params: params
  })
}
