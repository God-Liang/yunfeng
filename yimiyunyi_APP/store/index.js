import Vue from 'vue'
import Vuex from 'vuex'
import app from "./modules/app"
import user from "./modules/user"
import follow from "./modules/followUp"
import patient from "./modules/patient"
import team from "./modules/team"
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		user,
		follow,
		patient,
		team
	}
})

export default store