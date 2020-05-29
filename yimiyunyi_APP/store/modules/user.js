import { login, logout } from '@/api/system';
import { getMyInfo, getUserInfo } from '@/api/mine';
import { isMessage } from '@/api/message';
const state = {
	userInfo: uni.getStorageSync('userInfo') || {},
	myInfo: uni.getStorageSync('myInfo') || {doctor: {}},
	token: uni.getStorageSync('lg-token') || ''
}
const mutations = {
	toggleUserInfo: function(state, userInfo) {
		state.userInfo = userInfo
	},
	toggleMyInfo: function(state, myInfo) {
		state.myInfo = myInfo
	},
	toggleToken: function(state, token) {
		state.token = token
	}
}
const getters = {
  userInfo: state => state.userInfo,
  myInfo: state => state.myInfo,
  token: state => state.token
}
const actions = {
	login({ commit }, userData){
		return new Promise((resolve, resject) => {
			login(userData, res => {
				uni.setStorageSync('lg-username', userData.username)
				uni.setStorageSync('lg-token', res.data.token)
				commit('toggleToken', res.data.token)
				resolve(res)
			})
		})
	},
	getUserInfo({ commit }) {
		return new Promise((resolve, resject) => {
			getUserInfo(res => {
				commit('toggleUserInfo', res.data.user)
				uni.setStorageSync('userInfo', res.data.user)
				resolve(res)
			})
		}).then(() => {
			isMessage({type:1,teamId: ''},res => {
				if(res.data.info) {
					uni.showTabBarRedDot({
						index: 0
					})
				} else {
					uni.hideTabBarRedDot({
						index: 0
					})
				}
			});
		})
	},
	getMyInfo({ commit }) {
		return new Promise((resolve, resject) => {
			getMyInfo(res => {
				if (!res.data.info.doctor.doctorTeamId) {
					// 删除聊天记录
					uni.getStorageInfo({
					  success: (result) => {
							const renderedArr = []
					    result.keys.map(e => {
								if (e.indexOf('rendered') >= 0) {
									renderedArr.push(e)
								}
							})
							renderedArr.map(e => {
								if (e.length > 24 && Number(e.slice(24)) === res.data.info.id) {
									uni.removeStorageSync(e)
								}
							})
					  }
					})
				}
				commit('toggleMyInfo', res.data.info)
				uni.setStorageSync('myInfo', res.data.info)
				resolve(res)
			})
		})
	},
	logout({ commit }) {
		return new Promise((resolve, resject) => {
			logout(res => {
				commit('toggleMyInfo', {doctor: {}})
				commit('toggleUserInfo', {})
				commit('toggleToken', '')
				uni.removeStorageSync('myInfo')
				uni.removeStorageSync('userInfo')
				uni.removeStorageSync('lg-token')
				uni.removeStorageSync('myToken')
				uni.removeStorageSync('myUsername')
				resolve(res)
			})
		})
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}