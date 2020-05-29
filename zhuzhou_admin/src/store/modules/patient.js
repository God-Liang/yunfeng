const patient = {
  state: {
    appointmentPatient: ''
  },
  mutations: {
    appointmentPatient: (state, view) => {
      state.appointmentPatient = 'aa'
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('appointmentPatient', view)
    }
  }
}

export default patient
