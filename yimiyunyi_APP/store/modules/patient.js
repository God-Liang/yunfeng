const state = {
	patientId: ''
}
const mutations = {
	togglePatientId: function(state, patientId) {
		state.patientId = patientId
	},
}
const getters = {
  patientId: state => state.patientId
}
const actions = {
	togglePatientId({ commit }, patientId){
		commit('togglePatientId', patientId)
	}
}
export default {
	state,
	getters,
	mutations,
	actions
}