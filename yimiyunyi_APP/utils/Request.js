// api接口地址
const apiurl = 'http://api-test.hnasa.cn'

import Vue from 'vue'
import store from '../store'
/**
 * time: 2019-10-14
 * author: lg
 * obj {[Object]} 包含如下参数：
 * @param {[string]} method [请求方法]
 * @param {[string]} url [请求地址]
 * @param {[object]} data [请求参数]
 * @param {[string]} responseType [响应的数据类型]
 * fun {[function]} [成功回调]
 */
function request(obj, suc, err) {
	// 拦截多次跳转到网络错误页面
	if (uni.getStorageSync('errNum') && uni.getStorageSync('lg-token')) {
		uni.showToast({
			title: '请求超时，请检查网络',
			duration: 2000,
			icon: "none"
		});
		return false
	}
	const url = apiurl + obj.url
	const data = obj.data || {}
	const method = obj.method || 'GET'
	const responseType = obj.responseType || 'text'
	let header = {
		'token': ''
	}
	if (uni.getStorageSync('lg-token')) {
		header = {
			'token': uni.getStorageSync('lg-token')
		}
	}
	uni.request({
		url: url,
		data: data,
		header: header,
		method: method,
		dataType: 'json',
		timeout: 15000,
		responseType: responseType,
		success: function(res) {
			if (res.data.code === 200) {
				suc(res)
			} else if (res.data.code === 1101 || res.data.code === 1102 || res.data.code === 1103) {
				uni.removeStorageSync('myInfo')
				uni.removeStorageSync('userInfo')
				uni.removeStorageSync('lg-token')
				uni.removeStorageSync('myToken')
				uni.showToast({
					title: '登录失效，请重新登录',
					duration: 2000,
					icon: "none"
				});
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/login/index'
					});
				}, 1000)
			} else {
				uni.showToast({
					title: res.data.msg,
					duration: 2000,
					icon: "none"
				});
			}
		},
		fail: function(res) {
			uni.setStorageSync('errNum', 1)
			uni.showToast({
				title: '请求超时，请检查网络',
				duration: 2000,
				icon: "none"
			});
			if (err) {
				err(res)
			}
		}
	})
}

export {
	request
}
