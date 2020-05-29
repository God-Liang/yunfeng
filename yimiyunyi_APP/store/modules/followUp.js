const state = {
	planObj: {
		ids: [],
		objIds: [],
		solutionId: '',
		solutionName: '',
		name: '',
		startTime: '',
		teamId: ''
	}
}
const mutations = {
	togglePlanObj: function(state, planObj) {
		state.planObj = planObj
	},
}
const getters = {
  planObj: state => state.planObj
}
const actions = {
	togglePlanObj({ commit }, planObj){
		commit('togglePlanObj', planObj)
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}