const state = {
	groupList: [],
	teamGroupInfo: {
		jid: '',
		name: '',
		roomId: ''
	}
}
const mutations = {
	toggleGroupList: function(state, groupList) {
		state.groupList = groupList
	},
	toggleTeamGroupInfo: function(state, teamGroupInfo) {
		state.teamGroupInfo = teamGroupInfo
	}
}
const getters = {
	groupList: state => state.groupList,
  teamGroupInfo: state => state.teamGroupInfo
}
const actions = {
	toggleGroupList({ commit }, groupList){
		commit('toggleGroupList', groupList)
	},
	toggleTeamGroupInfo({ commit }, teamGroupInfo){
		commit('toggleTeamGroupInfo', teamGroupInfo)
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}
