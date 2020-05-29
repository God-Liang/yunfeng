import { request } from '../utils/Request'

// 量表列表
export function getScaleList(apiName, data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/${apiName}/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}
// 患者列表
export function getList(apiName, data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/${apiName}/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}
export function getPatientList(apiName, data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/${apiName}/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}

// 计划随访 终止
export function deletePlan(ids, fun) {
	return request({
	  url: `/AppPlan/deletePlan/${ids}`,
	  method: 'POST',
		data: {}
	}, fun)
}
// 计划详情
export function readPlanInfo(id, fun) {
	return request({
	  url: `/AppPlan/readByPatient/${id}`,
	  method: 'GET',
		data: {}
	}, fun)
}