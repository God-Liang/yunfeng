const state = {
	isnetwork: true,
	winInfo: {}
}
const mutations = {
	toggleIsnetwork: function(state, isnetwork) {
		state.isnetwork = isnetwork
	},
	toggleWinInfo: function(state, winInfo) {
		state.winInfo = winInfo
	}
}
const getters = {
  isnetwork: state => state.isnetwork,
  winInfo: state => state.winInfo
}
const actions = {
	toggleIsnetwork({ commit }, isnetwork){
		commit('toggleIsnetwork', isnetwork)
	},
	toggleWinInfo({ commit }, winInfo){
		commit('toggleWinInfo', winInfo)
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}
