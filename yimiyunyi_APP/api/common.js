import { request } from '../utils/Request'

/*
 *公共接口
 *@param - apiName :接口名称
 *@param - data:参数集合
 *@param - id:某条id
 *@param - ids:多个删除数据的id(可传单个)
 *@param - fun:成功回调
 * import { getList, read, createOrUpdate, remove } from '@/api/common';
 */ 

// 获取数据列表
export function getList(apiName, data, fun) {
	const datas = {
		...data
	}
	delete datas.current
	delete datas.pageSize
	return request({
		url: `/${apiName}/page/${data.current}/${data.pageSize}`,
		method: 'GET',
		data: datas
	}, fun)
}

// 查询某一条数据
export function read(apiName, id, fun) {
	return request({
		url: `/${apiName}/read/${id}`,
		method: 'GET',
		data: {}
	}, fun)
}

// 新增或者修改数据
export function createOrUpdate(apiName, data, fun) {
	return request({
		url: `/${apiName}/createOrUpdate`,
		method: 'POST',
		data: data
	}, fun)
}

// 删除数据
export function remove(apiName, ids, fun) {
	return request({
		url: `/${apiName}/delete/${ids}`,
		method: 'POST',
		data: {}
	}, fun)
}