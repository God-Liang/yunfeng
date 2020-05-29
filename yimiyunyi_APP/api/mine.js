import { request } from '../utils/Request'

// 获取我的信息
export function getMyInfo(fun) {
  return request({
    url: '/myCenter/show',
    method: 'GET',
		data: {}
  }, fun)
}

// 获取用户信息
export function getUserInfo(fun) {
  return request({
    url: '/AppGetUserInfo',
    method: 'GET',
		data: {}
  }, fun)
}

// 获取医生信息
export function getDoctorInfo(fun) {
  return request({
    url: '/AppDoctor/read',
    method: 'GET',
		data: {}
  }, fun)
}


// 认证提交
export function authenticationSave(data, fun) {
  return request({
    url: '/AppDoctor/createVerifier',
    method: 'POST',
		data: data
  }, fun)
}

// 通过ID获取医生信息
export function getInfo(id,fun) {
  return request({
    url: `/myCenter/read/${id}`,
    method: 'GET',
		data: {}
  }, fun)
}
// 修改医生信息
export function updateInfo(data,fun) {
  return request({
    url: '/myCenter/update',
    method: 'POST',
		data: data
  }, fun)
}

// 获取我的主页
export function getHomeInfo(fun) {
  return request({
    url: '/myCenter/home/show',
    method: 'GET',
		data: {}
  }, fun)
}

// 获取修改我的主页
export function updateHomeInfo(data, fun) {
  return request({
    url: '/myCenter/home/update',
    method: 'POST',
		data: data
  }, fun)
}

// 修改手机号
export function changePhone(data, fun) {
  return request({
    url: '/myCenter/changePhone',
    method: 'GET',
		data: data
  }, fun)
}

// 修改密码
export function changePass(data, fun) {
  return request({
    url: '/myCenter/changePass',
    method: 'GET',
		data: data
  }, fun)
}

// 统计分析
// 今日量表统计
export function nowStatisticsScale(fun) {
  return request({
    url: '/myCenter/nowStatisticsScale',
    method: 'GET',
		data: {}
  }, fun)
}

export function statisticsPatient(dayNum, fun) {
  return request({
    url: '/myCenter/statisticsPatient',
    method: 'GET',
		data: {
			dayNum: dayNum
		}
  }, fun)
}

// 随访页面我的方案数据统计
export function statisticsData(fun) {
  return request({
    url: '/AppFollowupSolution/statistics',
    method: 'GET',
		data: {}
  }, fun)
}

// 随访页面我的患者数据统计
export function statisticsPatientNum(fun) {
  return request({
    url: '/patient/statistics',
    method: 'GET',
		data: {}
  }, fun)
}
// 随访页面我的量表数据统计
export function statisticsScale(fun) {
  return request({
    url: '/myCenter/statisticsScale',
    method: 'GET',
		data: {}
  }, fun)
}
// 关于我们
export function aboutUs(data, fun) {
  return request({
    url: '/myCenter/aboutUs',
    method: 'GET',
		data: data
  }, fun)
}
// 二维码
export function createWxQrcode(id, fun) {
  return request({
    url: `/jeewx/createWxQrcode/${id}`,
    method: 'GET',
		data: {}
  }, fun)
}