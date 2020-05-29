import { request } from '../utils/Request'

// 获取oss临时权限
export function getOssPolicy(fun) {
  return request({
    url: '/oss/policy',
    method: 'GET',
		data: {}
  }, fun)
}
// 字典表  根据type获取数据
export function getAllDicByType(type, fun) {
	return request({
	  url: `/dictionary/getAllDicByType?type=${type}`,
	  method: 'GET',
			data: {}
	}, fun)
}

// 发送短信
export function send(phone, fun) {
  return request({
    url: `/validate/send/${phone}`,
    method: 'GET',
		data: {}
  }, fun)
}
// 验证码校验
export function check(data, fun) {
  return request({
    url: '/validate/check',
    method: 'GET',
		data: data
  }, fun)
}
// 短信通知
export function noticeSend(data, fun) {
  return request({
    url: '/validate/doctorInform',
    method: 'GET',
		data: data
  }, fun)
}
// 登录
export function login(data, fun) {
  return request({
    url: '/AppLogin',
    method: 'GET',
		data: data
  }, fun)
}

// 退出
export function logout(fun) {
  return request({
    url: '/AppLogout',
    method: 'GET',
		data: {}
  }, fun)
}

// 找回密码
export function forgetPass(data, fun) {
  return request({
    url: '/myCenter/forgetPass',
    method: 'GET',
		data: data
  }, fun)
}

// 注册
export function register(data, fun) {
  return request({
    url: '/APP/register',
    method: 'POST',
		data: data
  }, fun)
}


// 获取医院列表
export function getHospitalList(data, fun) {
	return request({
		url: '/hospital/hospitalList',
		method: 'GET',
		data: data
	}, fun)
}
// 获取手术列表
export function getOperationList(data, fun) {
	return request({
		url: '/operation/operationList',
		method: 'GET',
		data: data
	}, fun)
}
// 获取疾病列表
export function getDiseaseList(data, fun) {
	return request({
		url: '/icd10/icd10List',
		method: 'GET',
		data: data
	}, fun)
}

// 获取科室列表
export function getDepartmentList(fun) {
	return request({
		url: '/hospitalDepartment/All',
		method: 'GET',
		data: {}
	}, fun)
}

// 获取科室列表
export function getBinaryList(fun) {
	return request({
		url: '/hospitalDepartment/binaryTree',
		method: 'GET',
		data: {}
	}, fun)
}
